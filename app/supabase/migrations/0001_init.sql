-- AlgebraX — esquema inicial
-- Convención: RLS de alto rendimiento — (select auth.uid()) en vez de auth.uid()
-- directo (25-BASE-DE-DATOS.md), columna de cada política indexada.

-- ── profiles ── extiende auth.users con plan y datos que la app necesita
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  plan text not null default 'free' check (plan in ('free', 'premium')),
  hotmart_subscriber_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_hotmart_code_idx on profiles(hotmart_subscriber_code);

alter table profiles enable row level security;

create policy "select_own_profile" on profiles for select
  using ( (select auth.uid()) = id );

create policy "update_own_profile" on profiles for update
  using ( (select auth.uid()) = id )
  with check ( (select auth.uid()) = id and plan = (select plan from profiles where id = auth.uid()) );
  -- el usuario NO puede cambiarse el plan a sí mismo — solo el webhook (service_role) lo hace

-- ── user_progress ── racha (mismo algoritmo que el cliente en lib/progress.ts)
create table user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  current_streak integer not null default 0,
  last_active_on date,
  tz text not null default 'America/Bogota',
  updated_at timestamptz not null default now()
);

alter table user_progress enable row level security;

create policy "select_own_progress" on user_progress for select
  using ( (select auth.uid()) = user_id );

create policy "upsert_own_progress" on user_progress for all
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

-- ── module_progress ── aciertos por módulo (Ecuaciones, Despejes, Factorización...)
create table module_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  modulo_slug text not null,
  completadas integer not null default 0,
  total integer not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, modulo_slug)
);

create index module_progress_user_idx on module_progress(user_id);

alter table module_progress enable row level security;

create policy "select_own_module_progress" on module_progress for select
  using ( (select auth.uid()) = user_id );

create policy "upsert_own_module_progress" on module_progress for all
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

-- ── trigger: crear profile automáticamente cuando el webhook de Hotmart crea el usuario ──
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
