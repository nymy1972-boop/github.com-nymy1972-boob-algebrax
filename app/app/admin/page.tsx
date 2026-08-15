import { Activity, AlertTriangle, CircleDollarSign, HeartHandshake, Sparkles, Users } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

interface Stat {
  label: string;
  value: string;
  nota?: string;
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--surface-2)] bg-[var(--surface)] p-5">
      {children}
    </div>
  );
}

function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {stats.map((s) => (
        <Card key={s.label}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[var(--text-secondary)]">
            {s.label}
          </p>
          <p className="mt-1 text-[28px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
            {s.value}
          </p>
          {s.nota && <p className="mt-1 text-[12px] text-[var(--text-secondary)]">{s.nota}</p>}
        </Card>
      ))}
    </div>
  );
}

function SinMedir({ titulo, motivo }: { titulo: string; motivo: string }) {
  return (
    <Card>
      <p className="text-[13px] font-semibold text-[var(--text-primary)]">{titulo}: no medido todavía</p>
      <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">{motivo}</p>
    </Card>
  );
}

function Seccion({ icono, titulo, children }: { icono: React.ReactNode; titulo: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-[16px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
        {icono}
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export default async function AdminPage() {
  const supabase = createAdminClient();

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, email, plan, created_at')
    .order('created_at', { ascending: false });

  const totalUsuarios = profiles?.length ?? 0;
  const hoy = new Date();
  const hace7dias = new Date(hoy.getTime() - 7 * 86400000);
  const nuevosSemana = (profiles ?? []).filter((p) => new Date(p.created_at) >= hace7dias).length;

  const { data: eventos } = await supabase
    .from('event_log')
    .select('event_name, user_id, created_at')
    .order('created_at', { ascending: false })
    .limit(500);

  const totalEventos = eventos?.length ?? 0;
  const usuariosConEvento = new Set((eventos ?? []).map((e) => e.user_id).filter(Boolean)).size;
  const activacion = totalUsuarios > 0 ? Math.round((usuariosConEvento / totalUsuarios) * 100) : 0;

  const conteoPorEvento = new Map<string, number>();
  for (const e of eventos ?? []) {
    conteoPorEvento.set(e.event_name, (conteoPorEvento.get(e.event_name) ?? 0) + 1);
  }
  const eventosOrdenados = Array.from(conteoPorEvento.entries()).sort((a, b) => b[1] - a[1]);

  const { count: totalErrores } = await supabase.from('error_log').select('id', { count: 'exact', head: true });
  const { data: erroresRecientes } = await supabase
    .from('error_log')
    .select('mensaje, pantalla, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  const hotmartConectado = Boolean(process.env.HOTMART_HOTTOK);

  // ── Recomendaciones (referidos) — mismo event_log, sin tabla nueva ──────
  const { data: eventosReferido } = await supabase
    .from('event_log')
    .select('event_name, user_id, properties, created_at')
    .like('event_name', 'referral_%')
    .order('created_at', { ascending: false })
    .limit(2000);

  const contar = (nombre: string) => (eventosReferido ?? []).filter((e) => e.event_name === nombre).length;
  const mostrados = contar('referral_prompt_mostrado');
  const clics = contar('referral_cta_clicked');
  const shareAbierto = contar('referral_share_sheet_abierto');
  const compartidos = contar('referral_compartido');
  const conversiones = contar('referral_signup_attributed');

  const porMedio = new Map<string, number>();
  for (const e of eventosReferido ?? []) {
    if (e.event_name !== 'referral_compartido') continue;
    const medio = (e.properties as Record<string, unknown> | null)?.medio;
    const clave = typeof medio === 'string' ? medio : 'sin especificar';
    porMedio.set(clave, (porMedio.get(clave) ?? 0) + 1);
  }

  const porVariante = new Map<string, { mostrado: number; clic: number }>();
  for (const e of eventosReferido ?? []) {
    if (e.event_name !== 'referral_prompt_mostrado' && e.event_name !== 'referral_cta_clicked') continue;
    const variante = (e.properties as Record<string, unknown> | null)?.variante;
    const clave = typeof variante === 'string' ? variante : 'sin variante';
    const actual = porVariante.get(clave) ?? { mostrado: 0, clic: 0 };
    if (e.event_name === 'referral_prompt_mostrado') actual.mostrado += 1;
    else actual.clic += 1;
    porVariante.set(clave, actual);
  }

  const { data: referidores } = await supabase
    .from('profiles')
    .select('referred_by')
    .not('referred_by', 'is', null);
  const conteoPorReferidor = new Map<string, number>();
  for (const r of referidores ?? []) {
    if (!r.referred_by) continue;
    conteoPorReferidor.set(r.referred_by, (conteoPorReferidor.get(r.referred_by) ?? 0) + 1);
  }
  const topReferidores = Array.from(conteoPorReferidor.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[900px] flex-col gap-8 px-5 py-8 text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div>
        <h1 className="text-[26px] font-bold [font-family:var(--font-display)]">Panel de AlgebraX</h1>
        <p className="mt-1 text-[14px] text-[var(--text-secondary)]">Solo tú puedes ver esta página.</p>
      </div>

      <Seccion icono={<CircleDollarSign size={18} className="text-[var(--accent)]" />} titulo="Ventas y ganancia real">
        {hotmartConectado ? (
          <SinMedir titulo="Ventas" motivo="Hotmart está configurado pero todavía no hay ventas registradas." />
        ) : (
          <SinMedir
            titulo="Ventas"
            motivo="Hotmart todavía no está conectado (falta configurar HOTMART_HOTTOK) — cuando conectes tu cuenta, aquí aparecerán ingresos, suscriptores activos y cancelaciones reales."
          />
        )}
      </Seccion>

      <Seccion icono={<Users size={18} className="text-[var(--accent-2)]" />} titulo="Usuarios">
        <StatRow
          stats={[
            { label: 'Total de cuentas', value: String(totalUsuarios) },
            { label: 'Nuevas esta semana', value: String(nuevosSemana) },
            { label: 'Activación', value: `${activacion}%`, nota: 'hicieron al menos 1 acción' },
          ]}
        />
        {profiles && profiles.length > 0 && (
          <Card>
            <p className="mb-2 text-[13px] font-semibold text-[var(--text-secondary)]">Últimas cuentas creadas</p>
            <div className="flex flex-col gap-2">
              {profiles.slice(0, 8).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-[13px]">
                  <span className="text-[var(--text-primary)]">{p.email}</span>
                  <span className="text-[var(--text-secondary)]">
                    {p.plan} · {new Date(p.created_at).toLocaleDateString('es-CO')}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </Seccion>

      <Seccion icono={<Activity size={18} className="text-[var(--success)]" />} titulo="Uso de la app">
        {totalEventos === 0 ? (
          <SinMedir titulo="Uso" motivo="Todavía no se registró ningún evento — aparecerán aquí en cuanto un estudiante complete el diagnóstico, un módulo, o un simulacro." />
        ) : (
          <Card>
            <p className="mb-2 text-[13px] font-semibold text-[var(--text-secondary)]">
              Eventos de los últimos {totalEventos} registros
            </p>
            <div className="flex flex-col gap-2">
              {eventosOrdenados.map(([nombre, n]) => (
                <div key={nombre} className="flex items-center justify-between text-[13px]">
                  <span className="text-[var(--text-primary)]">{nombre}</span>
                  <span className="font-semibold text-[var(--text-secondary)]">{n}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </Seccion>

      <Seccion icono={<Sparkles size={18} className="text-[var(--gold)]" />} titulo="Costo de IA (DeepSeek)">
        <SinMedir
          titulo="Costo de IA"
          motivo="Falta una tabla ai_calls que registre cada llamada a DeepSeek con su costo — se agrega cuando el volumen de uso lo justifique (31-EVALS-OBSERVABILIDAD)."
        />
      </Seccion>

      <Seccion icono={<HeartHandshake size={18} className="text-[var(--accent-2)]" />} titulo="Recomendaciones (referidos)">
        {mostrados === 0 ? (
          <SinMedir titulo="Referidos" motivo="Todavía no se registró ninguna vista del mensaje de recomendación — aparecerá aquí en cuanto un estudiante lo vea por primera vez." />
        ) : (
          <>
            <StatRow
              stats={[
                { label: 'Vieron el mensaje', value: String(mostrados) },
                { label: 'Tocaron el CTA', value: String(clics), nota: mostrados > 0 ? `${Math.round((clics / mostrados) * 100)}% de los que lo vieron` : undefined },
                { label: 'Compartieron de verdad', value: String(compartidos), nota: shareAbierto > 0 ? `${Math.round((compartidos / shareAbierto) * 100)}% de los que abrieron compartir` : undefined },
                { label: 'Cuentas nuevas atribuidas', value: String(conversiones), nota: compartidos > 0 ? `${Math.round((conversiones / compartidos) * 100)}% de lo compartido` : undefined },
              ]}
            />
            <Card>
              <p className="mb-2 text-[13px] font-semibold text-[var(--text-secondary)]">Por dónde compartieron</p>
              <div className="flex flex-col gap-2">
                {Array.from(porMedio.entries()).map(([medio, n]) => (
                  <div key={medio} className="flex items-center justify-between text-[13px]">
                    <span className="text-[var(--text-primary)]">{medio}</span>
                    <span className="font-semibold text-[var(--text-secondary)]">{n}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <p className="mb-2 text-[13px] font-semibold text-[var(--text-secondary)]">A/B por variante (vistas → clics)</p>
              <div className="flex flex-col gap-2">
                {Array.from(porVariante.entries()).map(([variante, n]) => (
                  <div key={variante} className="flex items-center justify-between text-[13px]">
                    <span className="text-[var(--text-primary)]">Variante {variante}</span>
                    <span className="font-semibold text-[var(--text-secondary)]">
                      {n.mostrado} → {n.clic} {n.mostrado > 0 ? `(${Math.round((n.clic / n.mostrado) * 100)}%)` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            {topReferidores.length > 0 && (
              <Card>
                <p className="mb-2 text-[13px] font-semibold text-[var(--text-secondary)]">Quién más ha traído gente</p>
                <div className="flex flex-col gap-2">
                  {topReferidores.map(([codigo, n]) => (
                    <div key={codigo} className="flex items-center justify-between text-[13px]">
                      <span className="text-[var(--text-primary)]">{codigo}</span>
                      <span className="font-semibold text-[var(--text-secondary)]">{n} {n === 1 ? 'persona' : 'personas'}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        )}
      </Seccion>

      <Seccion icono={<AlertTriangle size={18} className="text-[var(--gold)]" />} titulo="Salud y errores">
        {!totalErrores ? (
          <Card>
            <p className="text-[13px] font-semibold text-[var(--success)]">✅ Sin errores registrados</p>
          </Card>
        ) : (
          <Card>
            <p className="mb-2 text-[13px] font-semibold text-[var(--text-secondary)]">
              {totalErrores} error(es) registrados — los más recientes:
            </p>
            <div className="flex flex-col gap-2">
              {(erroresRecientes ?? []).map((e, i) => (
                <div key={i} className="text-[13px]">
                  <span className="font-semibold text-[var(--text-primary)]">{e.pantalla ?? 'sin pantalla'}</span>
                  <span className="text-[var(--text-secondary)]"> — {e.mensaje}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </Seccion>
    </div>
  );
}
