-- event_log: fuente única de eventos de uso (36-ANALITICA-Y-EVENTOS). Cada fila es
-- una acción real del estudiante (diagnóstico completado, módulo practicado,
-- examen terminado). El backoffice lee de aquí — nunca se inventa un número.
create table event_log (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  event_name text not null,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index event_log_user_idx on event_log(user_id);
create index event_log_event_name_idx on event_log(event_name);
create index event_log_created_at_idx on event_log(created_at desc);

alter table event_log enable row level security;

-- Cualquier usuario autenticado puede REGISTRAR sus propios eventos (o eventos
-- anónimos con user_id null, ej. desde el onboarding antes de crear cuenta).
create policy "insert_own_events" on event_log for insert
  with check ( user_id is null or (select auth.uid()) = user_id );

-- Nadie puede LEER event_log desde el cliente — el backoffice lee con el
-- cliente admin (service_role) del servidor, nunca expuesto al navegador.
-- (sin política de select = denegado por defecto con RLS activo)

-- error_log: errores reales capturados por los Error Boundaries y catch del
-- backend — vacío hasta que algo falle de verdad, nunca con datos de ejemplo.
create table error_log (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  mensaje text not null,
  pantalla text,
  detalle jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index error_log_created_at_idx on error_log(created_at desc);
create index error_log_user_idx on error_log(user_id);

alter table error_log enable row level security;

create policy "insert_own_errors" on error_log for insert
  with check ( user_id is null or (select auth.uid()) = user_id );
