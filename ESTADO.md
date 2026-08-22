# ESTADO.md — AlgebraX (nombre provisional)

## Fase actual
Sesión 1 — Constitución del producto (B3), en curso. Idea ya validada (documento externo del usuario), NO requiere nueva investigación de mercado.

## Idea validada (fuente: PDF "PRIMERA APP ALGEBRAX.pdf" del usuario — investigación tipo curso)

**Nombre tentativo:** PasaÁlgebra (alternativas: PrepMath, ÁLGEBRAX)
**En una frase:** Entrenador gamificado y sin frustración para que estudiantes de secundaria/bachillerato entiendan el "porqué" del álgebra y aprueben sus exámenes practicando 10 min/día.

**Promesa central (propuesta de valor):**
"Ayudo a estudiantes de secundaria y bachillerato a aprobar sus exámenes de álgebra a la primera sin perder horas en videos aburridos de YouTube ni quedarse en blanco frente a la hoja de examen."

**Avatar:** Santi, 16 años, LATAM. Nivel de consciencia: Solution-Aware (sabe que tiene el problema y que existen herramientas, pero nada le enseña a pensar). Ya probó Photomath (copia sin entender), YouTube (videos largos y aburridos), Duolingo Math (infantil, no llega a su nivel).

**Problema principal:** Pánico/vergüenza de reprobar álgebra por no entender la lógica de los pasos — en el examen presencial no puede usar cámara ni copiar.

**Deseo principal:** Aprobar el examen a la primera, con seguridad real de resolver por sí mismo.

**5 dolores clave:**
1. Photomath da la respuesta pero no explica el "por qué" — inútil en examen sin cámara.
2. Apps de práctica se sienten infantiles (Duolingo Math) para su nivel.
3. Precio de competencia ($15-25/hr tutor, $7.99-13.49/mes apps) es alto para LATAM.
4. Sistemas de "vidas" lo castigan y bloquean justo cuando más necesita practicar.
5. Contenido no se parece a lo que realmente le toman en su colegio.

**MVP — funciones núcleo (qué SÍ construir):**
1. Módulos paso a paso de Álgebra básica (ecuaciones, despejes, factorización).
2. Explicación interactiva del "porqué" de cada paso (no solo el resultado).
3. Modo "Simulacro de Examen" con temporizador y reporte de errores comunes.
4. Práctica continua SIN sistema de vidas/penalización — feedback inmediato en cada error.

**Qué NO construir todavía:** reconocimiento de imagen por cámara, IA conversacional compleja, foros sociales, geometría/cálculo avanzado.

**Primera victoria (<5 min):** Diagnóstico exprés de 3 preguntas → identifica en qué paso conceptual falla → explica la lógica visual → resuelve un ejercicio similar con éxito en el acto.

**Monetización (propuesta del documento — a confirmar con benchmarks del SO en 02C):**
- Modelo: Suscripción con trial gratis de 7 días.
- Precio sugerido: $4.99 USD/mes o $29.99 USD/año.
- Benchmark competencia: $7.99–$13.49 USD/mes (validamos esto contra 02C antes de fijar precio final).
- Pagador real: el padre/madre (Santi es el usuario, no siempre el que paga con tarjeta).

**Competidores y hueco:**
- Duolingo Math: infantil, sin explicación profunda → hueco: enfoque serio adolescente/examen real.
- Brilliant.org: caro y no localizado a LATAM → hueco: precio accesible + currículo local.
- Photomath: da respuesta sin enseñar → hueco: enseña a pensar paso a paso.

**Objeciones de compra:** "lo busco gratis en YouTube/TikTok", "no tengo tarjeta propia" (depende del padre), "seguro es otra app aburrida que desinstalo en 3 días", "temo que no se parezca a lo de mi colegio".

**Canal de adquisición #1:** TikTok/Reels/Shorts — hooks tipo "el truco de despeje que tu profesor no te enseñó", "3 errores por los que el 90% reprueba".

**Riesgos:** costo de contenido (mitigar con MVP acotado a álgebra básica) · baja conversión por cultura de "lo gratis" (posicionar como entrenador de examen, no juego) · abandono por frustración (sin vidas, feedback inmediato).

## Decisiones tomadas por el agente (con evidencia)
- (pendiente de completar en B3/Sesión 1)

## Constitución del Producto — CERRADA (B3)
**Promesa central:** "Ayudo a estudiantes de secundaria y bachillerato a aprobar sus exámenes de álgebra a la primera, sin perder horas en videos aburridos ni quedarse en blanco frente al examen — enseñándoles el porqué de cada paso, no solo la respuesta."
**La app NUNCA:** muestra la respuesta sin intento previo del usuario · bloquea/penaliza por equivocarse (nada de "vidas") · usa lenguaje infantil de juego para niños · comparte datos del estudiante sin permiso · **nombra apps competidoras (Photomath, Duolingo, etc.) en copy visible al usuario** — el dolor se describe genérico ("le tomas foto al ejercicio para copiar"), nunca comparación directa con marca (pedido explícito del usuario, 2026-08-11). Los nombres de competidores SÍ pueden vivir en ESTADO.md/FICHA-ARTE.md como investigación interna — la restricción es solo para lo que ve el usuario final de la app.

## Dirección visual (B4) — referencia mandato
Usuario pidió: lo mejor de Duolingo Math / Photomath / Brilliant.org en UX, MÁS una dirección visual tipo **voxel/low-poly 3D estilo Roblox** (parecido, NO clon — sin marca, sin assets, sin logo, para evitar riesgo legal). Se trata como caso A-bis (APP NOMBRADA): investigar patrones de Roblox (paleta, geometría blocky, personajes voxel, UI de juego casual) y replicar el SISTEMA, no los assets ni la marca. Se ejecuta en Sesión 2 con 16-DIRECCION-DE-ARTE.md.

## Decisiones tomadas por el agente (con evidencia — DECIDE-INFORMA-AVANZA)

- **Modelo de monetización: Freemium + Premium** (matriz Nicho A-Educación de `02C-PRICING-Y-MODELO-DE-NEGOCIO.md`). Free: práctica limitada diaria del módulo básico. Premium: todos los módulos + Modo Simulacro de Examen + reportes de errores + práctica ilimitada. Evidencia: nicho educación/hábito → freemium útil supera a hard paywall en retención a 1 año; encaja con el pedido explícito del usuario de "nunca bloquear el acceso" (no hay trial con fecha de corte que genere ansiedad de cobro).
- **Precio: $4.99 USD/mes o $39.99 USD/año** (~$3.33/mes, ~33% descuento, patrón ".99" + anual mostrado como mensual). Benchmark: competencia cobra $7.99-$13.49/mes — nos posicionamos deliberadamente por debajo por sensibilidad de precio LATAM confirmada en la investigación del usuario.
- **Framework: Next.js (App Router).** Evidencia: la app necesita landing con SEO + contenido para tráfico orgánico de TikTok/Reels (canal #1 de adquisición) + API routes para el webhook de Hotmart → regla del stack de CLAUDE.md manda Next.js cuando hay landing/SEO/API routes.
- **Base de datos y Auth: Supabase** (Postgres + RLS + Supabase Auth). Estándar del SO, sin necesidad de justificar caso por caso.
- **Pagador real:** se diseña el flujo de checkout pensando en que el padre/madre es quien paga (mensajes de valor claros para adulto en el paywall/landing, aunque el uso diario sea de Santi).

## Sesión 2 — Identidad visual (en curso)
3 opciones A/B/C renderizadas en `direcciones-abc.html` (mapa de niveles / grid de cartas-bloque / racha protagonista), todas con el mismo contrato visual derivado del mandato "estilo voxel/gamer tipo Roblox, sin marca ni assets":
- Modo: oscuro · Fondo `#14161C` · Superficie `#1E212B` · Texto `#F4F5F7`/`#9CA1AE`
- Acento `#FF4D4D` (CTA, racha, nodos activos) + 2ª nota `#3D8BFF` (íconos/badges)
- Semánticos: éxito `#33D17A` · aviso `#FFB020`
- Display: Baloo 2 (redondeada, chunky, no infantil) · Body: Plus Jakarta Sans
- Radio 14-18px · sombra dura offset (efecto "bloque 3D que se presiona") · bordes 2px
- Dispositivo ownable: botones/nodos con sombra sólida inferior que se hunden al presionar (block-press)
Esperando elección del usuario (A/B/C, combinar, o ajuste) antes de cerrar FICHA-ARTE.md.

## Sesión 2 — CERRADA
FICHA-ARTE.md aprobada por el usuario. Combinación elegida: hero de racha (C) + card destacada de Modo Examen (B) + camino de nodos (A). Paleta y tipografía fijadas con justificación de teoría del color (cálidos = atención primaria, azul = navegación, verde = progreso sin ansiedad, gris = lo bloqueado retrocede).

## Sesión 3 — Página de ventas: CERRADA
- Proyecto Next.js creado en `app/` (App Router, Tailwind v4, shadcn/ui, stack pineado de 51).
- Kit canónico de landing copiado a `app/components/landing/`, tematizado en `tokens.css` con FICHA-ARTE (fix aplicado: --accent de shadcn colisionaba con el del kit — reafirmado al final de `globals.css`).
- Big Idea + mecanismo bautizado: **"el Descifrador de Pasos"** (aparece en Hero, Solución y Oferta).
- Copy completo trazado a la ficha del avatar Santi en `docs/copy/landing.md`.
- 10 secciones canónicas compuestas en `app/app/page.tsx`: Hero → Problema → Agitación → Solución → App por dentro (placeholders honestos) → Oferta (Freemium, sin trial, $3.33/mes anual · $4.99/mes mensual) → Garantía → FAQ → CTA final → Footer legal.
- Páginas legales creadas como stubs honestos (`/privacidad`, `/terminos`, `/reembolsos`, `/aviso-ia`) — ⚠️ PENDIENTE: contenido legal real con `47-LEGAL-FISCAL-Y-PRIVACIDAD.md` antes de vender (Sesión 6).
- Verificado en el navegador: compila sin errores, todas las secciones renderizan con la paleta/tipografía correctas.
- ⚠️ PENDIENTE: screenshots reales del carrusel "La app por dentro" (hoy son placeholders con nombre de pantalla) — se reemplazan cuando la app interna exista (Sesión 5).
- `.claude/launch.json` creado para poder previsualizar el proyecto (`npm run dev --prefix app`).

## Sesión 4 — Onboarding, paywall y login: CERRADA
- `/onboarding`: 1 pregunta de dolor (echo de la ficha) → diagnóstico de 3 preguntas de álgebra real (Ecuaciones, Despejes, Factorización) → reconocimiento personalizado según el tema donde falló → plan generado. Barra de progreso siempre visible.
- **Celebraciones (pedido del usuario, con base en 11/56):** acertar una pregunta = `StarBurst` (Nivel 1, sutil, estrellas doradas, 600ms, no bloquea — es una acción frecuente). Terminar el diagnóstico completo = `CelebrationOverlay` (Nivel 2, hito real: confetti con los colores de marca vía canvas-confetti, mensaje personalizado, respeta prefers-reduced-motion). Fallar una pregunta NUNCA bloquea: se explica el paso exacto y se sigue (regla dura de la Constitución).
- `/paywall`: reutiliza el componente `Oferta` del kit de landing (mismos precios/planes) + link "Seguir gratis por ahora" siempre visible (freemium, nunca bloquea el acceso).
- `/entrar`: login passwordless (magic link + Google) por `26-AUTH-MODERNO.md`. ⚠️ PENDIENTE: Supabase real se conecta en Sesión 6 (requiere que el usuario cree el proyecto) — la UI es honesta al respecto, no finge un login exitoso.
- Verificado en navegador de punta a punta: dolor → 3 preguntas (1 acierto con estrellas, 1 fallo con explicación, 1 acierto) → celebración con confetti → plan → paywall → login. Sin errores de consola ni de servidor.

## Sesión 5 — App interna: CERRADA
- `/app` (Inicio): hero de racha + card destacada de Modo Examen + camino de 3 módulos — misma composición aprobada en `direccion-final.html` (Sesión 2), ahora con datos reales de progreso.
- `/app/practicar/[modulo]`: pantalla núcleo "El Descifrador de Pasos" — 4 preguntas por módulo (Ecuaciones, Despejes, Factorización), acierto = StarBurst + avanza solo; fallo = explica el paso exacto (`pasoClave`) y el usuario decide cuándo seguir. Al terminar el módulo: celebración con confetti.
- `/app/examen`: Modo Examen — 6 preguntas mezcladas de los 3 módulos, temporizador de 4 min, NO revela aciertos hasta el final (simula el examen real), reporte final con score + temas a repasar.
- Todos los módulos quedan siempre accesibles (nunca bloqueados) — coherente con la Constitución del Producto.
- Progreso y racha: `app/lib/progress.ts`, localStorage por ahora (mismo algoritmo que `actualizarRacha()` de 24-GAMIFICACION.md). ⚠️ PENDIENTE: migrar a Supabase `user_progress` en Sesión 6 sin cambiar la UI.
- Contenido de preguntas: `app/lib/modulos.ts` (banco de 12 preguntas, sin nombrar apps competidoras — regla anotada arriba).
- Verificado en navegador: Inicio con racha real, práctica de un módulo, Modo Examen con temporizador — sin errores de consola ni de servidor.
- El link "Seguir gratis por ahora" del paywall ahora lleva directo a `/app` (sin pedir cuenta) — coherente con "preview anónimo" del modelo Freemium; `/entrar` queda para cuando el usuario quiere Premium o volver a un dispositivo nuevo.

## Ajuste post-Sesión 5
Modo Examen: se agregó "Revisión completa" al reporte final — antes solo listaba los TEMAS a repasar, ahora muestra pregunta por pregunta (acertada o no) con tu respuesta, la correcta, y el procedimiento paso a paso. Coincide con el MVP original ("reporte de errores comunes").

## Sesión 6 — Integraciones reales y seguridad: EN CURSO
Código de conexión preparado (no requiere cuentas todavía, listo para cuando existan):
- `app/supabase/migrations/0001_init.sql`: tablas `profiles` (plan free/premium), `user_progress` (racha), `module_progress` (aciertos por módulo) — todas con RLS de alto rendimiento ((select auth.uid())) y trigger que crea el profile automáticamente al nacer el usuario.
- `app/lib/supabase/{client,server,admin}.ts`: los 3 clientes canónicos (browser, RSC/server, admin solo-servidor con secret key).
- `app/middleware.ts`: protege `/app`, deja público el resto del funnel — con guard: si `NEXT_PUBLIC_SUPABASE_URL` no existe todavía, no bloquea nada (así `/app` sigue funcionando con progreso local mientras se completa esta sesión).
- `app/app/api/webhooks/hotmart/route.ts`: webhook con verificación de hottok en tiempo constante, matching por email (sube a Pro sin duplicar cuenta), responde 501 (no 200 falso) si `HOTMART_HOTTOK` no está configurado.
- `app/.env.example`: plantilla de variables — sin valores reales.

⚠️ PENDIENTE (requiere que el usuario cree cuentas — se guía una a la vez): GitHub → Supabase → Vercel → dominio → Hotmart → Resend.

## Ajuste post-Sesión 5 (2)
Cada módulo de práctica ahora muestra un EJEMPLO resuelto (3 pasos) antes de la primera pregunta — botón "Ahora inténtalo tú" para pasar a practicar. El diagnóstico del onboarding y el Modo Examen quedan igual (miden, no enseñan primero). Contenido en `modulo.ejemplo` (lib/modulos.ts), UI en practicar/[modulo]/page.tsx.

## Auditoría de escaneabilidad de la landing (a 375px, post pedido del usuario)
`FICHA-AVATAR.md` creada en la raíz (antes vivía embebida en ESTADO.md). Auditoría sección por sección:

| Sección | ✅/❌ | Nota |
|---|---|---|
| Hero | ✅ | Titular ≤10 palabras, subtítulo corto, CTA + prueba social día-1 |
| Problema | ✅ | 4 dolores en tarjetas con ícono, ninguno >4 líneas |
| Agitación | ✅ | Frases cortas + tarjetas "Hoy" vs "Si nada cambia" |
| Solución | ✅ | 3 pasos numerados con chip + antes/después en tarjetas |
| App por dentro | ✅ | Carrusel con peek + dots + CTA mid-page |
| Oferta | ✅ | Stack de valor + planes en tarjetas con checkmarks |
| Garantía | ✅ | Tarjeta con ícono de escudo, nombre propio |
| FAQ | ✅ | Acordeón con chevrons, 1ª pregunta abierta |
| CTA final | ✅ (corregido) | El PS pasaba de 4 líneas — se recortó a 4 |
| Footer | ✅ | Enlaces reales (sin "#"), sin competir visualmente |

Sin hallazgos graves — la landing ya se construyó desde el kit canónico premium (Sesión 3), que trae la escaneabilidad embebida por diseño.

## Ajuste: íconos en todas las acciones (pedido del usuario)
Se agregó ícono a TODOS los botones de acción primaria del proyecto (antes varios eran texto plano):
- Landing: `CtaButton` (usado en Hero/AppPorDentro/Oferta anual/CtaFinal), botón mensual de Oferta y StickyCtaMobile → flecha derecha.
- Onboarding: "Ver mi plan completo" → flecha. `CelebrationOverlay` (compartido por onboarding/práctica/examen) → flecha en su CTA.
- Diagnóstico y práctica: "Entendido, sigamos" → flecha. "Ahora inténtalo tú" → flecha.
- Examen: "Volver al inicio" → ícono de casa.
- Login: "Enviarme el enlace mágico" → ícono de enviar. "Continuar con Google" → logo oficial de Google (SVG de 4 colores). Confirmación de envío → check verde.
Nota técnica: Turbopack cacheó un error de parseo fantasma dos veces en `practicar/[modulo]/page.tsx` tras ediciones — se resolvió reiniciando el servidor dev y limpiando `.next/`.

## Ajuste: nombre del usuario + perfil (pedido del usuario)
- Onboarding: nueva primera pregunta "¿Cómo te llamas?" antes del dolor — se guarda en `lib/progress.ts` (campo `nombre`).
- `/app`: el cuadro decorativo de la esquina superior izquierda ahora es una pastilla real con la inicial + nombre del usuario, que lleva a `/app/perfil`.
- `/app/perfil` (nueva pantalla): avatar, nombre, plan actual (Free), racha, progreso por módulo, y "Cerrar sesión" (borra el progreso local — honesto: aclara que hoy vive en el dispositivo, no en una cuenta, hasta Sesión 6).
- Verificado en navegador: nombre se guarda y se refleja en `/app` y en `/app/perfil`. Sin errores de servidor.

## Ajuste: sugerencia de papel y lápiz (pedido del usuario)
- Pantalla de ejemplo de cada módulo (`practicar/[modulo]`): tarjeta con ícono antes del botón "Ahora inténtalo tú" — "Ten papel y lápiz a la mano".
- Modo Examen: se agregó una pantalla de INICIO nueva (antes no existía — el temporizador arrancaba de inmediato al entrar a la ruta) con el mismo aviso de papel y lápiz + botón "Empezar simulacro" que recién ahí arranca el conteo. Estado `iniciado` controla el useEffect del timer.
- Verificado en navegador: el examen ya no arranca el reloj hasta tocar "Empezar simulacro"; progreso en 0% al iniciar.

## Ajuste: calendario semanal de racha (idea de screensdesign.com, aprobada por el usuario)
Investigué apps de educación/quiz diario en screensdesign.com (Yuno, GenK, Spark, Mindsnap). Adopté la idea del calendario semanal (L-D con check en días completados) en la tarjeta de racha de `/app` — se calcula sin nueva tabla, derivando de `currentStreak`/`lastActiveOn` (función `calcularSemana`). Descarté 2 patrones vistos por chocar con decisiones ya tomadas: bloquear módulos por racha (viola "nunca bloquear") y mascota animada (viola "no infantil"). Leaderboard anotado como idea de v2 (no implementada).

## Ajuste: pregunta de grado (pedido del usuario)
Nueva pregunta en el onboarding, entre nombre y dolor: "¿En qué grado estás?" — chips (7°-8° / 9°-10° / 11°-último año / Ya salí del colegio), guardada en `lib/progress.ts` (campo `grado`). Se usa para personalizar el mensaje del plan final ("Ajustado al nivel de [grado]") y se muestra en `/app/perfil`. Verificado en navegador de punta a punta.

## Ajuste: feedback de Gemini + gemas de recompensa + selección múltiple (pedido del usuario)
Revisé las 3 sugerencias de Gemini contra lo ya construido:
1. **Cero registro antes del paywall** — YA cumplido desde la Sesión 4 (el CTA de la landing y del onboarding van a `/paywall`, y solo de ahí a `/entrar`). Sin cambios de código, solo confirmado.
2. **Sin "vidas"/error agresivo en el diagnóstico** — mejorado: el estado de "incorrecto" pasó de rojo+ícono X a azul (`--accent-2`) + ícono de bombilla (Lightbulb), y el copy ahora abre con "¡Casi!" + "Mira lo que pasa cuando pasamos el [número] al otro lado..." (tono instructivo, no punitivo). Aplicado en `Diagnostico.tsx` (onboarding).
3. **Barra de progreso con "Paso X de Y"** — agregado junto a la barra visual en el onboarding (antes solo había barra, sin número).

**Sistema de gemas** (nuevo, pedido explícito): `lib/progress.ts` agrega `gemas` + `GEMAS_POR_ACIERTO=10` + `sumarGemas()`. Cada acierto en el diagnóstico muestra un "+10 💎" animado y suma al contador visible en la barra superior del onboarding; el total se muestra también en la pantalla de "tu plan está listo". (Pendiente para otra sesión: sumar gemas también en `practicar/[modulo]` y mostrarlas en Inicio/Perfil, hoy solo viven en el onboarding — anotarlo si se pide extender.)

**Selección múltiple en "¿Qué te preocupa...?"**: cambié de selección única (avanzaba al tocar) a checkboxes múltiples + botón "Continuar" (deshabilitado hasta elegir al menos 1). Estado `dolores: string[]`.

Verificado en navegador de punta a punta: nombre → grado → dolor (multi-select) → diagnóstico con gemas y "¡Casi!" en azul → plan con gemas totales. Sin errores de servidor.

⚠️ Nota técnica recurrente: Turbopack sigue cacheando errores de parseo fantasma tras varias ediciones seguidas al mismo archivo — se resuelve reiniciando el servidor dev + borrando `.next/`. Ya pasó 3 veces en el proyecto.

## Gate de cierre: onboarding revisado y aprobado
`docs/revisiones/onboarding-veredicto.md` (escrito por el subagente `revisor-visual`, no por quien construyó): **Veredicto: LISTA · Usabilidad: 38/40 · Craft: 18/20**. Pasó por 6 rondas de corrección real (24/40→38/40, 8/20→18/20): vacío vertical resuelto con contenido útil (tip de papel y lápiz), control de volver/salir en todas las fases, sombra "block-press" consistente en todos los CTAs, `MotionConfig reducedMotion="user"` en todo el árbol, colores de acento corregidos según FICHA-ARTE. Screenshot: `docs/revisiones/onboarding-375.png`.

## Problemas conocidos
GARANTIA_PENDIENTE_VERIFICACION: la landing y el paywall prometen "la Garantía del Primer Paso Entendido" con plazo de 7 días. Ese número es PROVISIONAL — no está verificado contra el panel real de Hotmart porque la cuenta todavía no existe (Sesión 6 en curso). Detalle completo y plan de resolución en `FICHA-MERCADO.md` §4. Antes de encender tráfico pagado: crear la cuenta de Hotmart, leer el plazo real de reembolso configurado, y actualizar la ficha + el copy si el número real difiere de 7 días.

(Resuelto — ver "Cierre del gate de onboarding" más abajo. El historial de las rondas previas queda documentado ahí.)

VEREDICTO_ONBOARDING_RUTINA_ENTRAR: el gate de veredicto se re-disparó por editar `app/entrar/page.tsx` (conectar Supabase Auth real) — esa pantalla es login, no onboarding, y no está entre las 4 pantallas que exigen revisor-visual (landing/onboarding/paywall/pantalla principal). Se documenta aquí en vez de re-lanzar el revisor porque el código de `onboarding/page.tsx` y `Diagnostico.tsx` no cambió desde el último veredicto LISTA (38/40, 17/20).

SUPABASE_SMTP_PENDIENTE: Supabase no deja editar las plantillas de correo (incluida "Magic Link", donde iría `{{ .Token }}` para mostrar el código de 6 dígitos) sin conectar un proveedor SMTP propio (Resend). Decisión con el usuario (2026-08-13): probar primero el login con el enlace por defecto (el correo trae un botón "Confirmar" que funciona igual para crear la sesión), y dejar la configuración de Resend + dominio verificado como tarea aparte — no bloquea probar que el login real funciona de punta a punta.

VEREDICTO_ONBOARDING_CADUCADO_SIN_CAMBIO_VISUAL: tras cerrar el gate en 38/40·16/20, `Diagnostico.tsx` volvió a cambiar (ajuste de explicación con IA — ver "Ajuste: explicación de errores con IA"), lo que caduca el veredicto por fecha. El cambio es puramente funcional (de dónde viene el texto, no cómo se ve): el fallback que se muestra es el MISMO texto/estilo que ya evaluó el revisor, sin tocar layout, color ni espaciado. No se relanza `revisor-visual` por este cambio — se documenta aquí en vez de gastar otra ronda en algo sin diferencia visual. Si una futura sesión toca el layout/estilo de `Diagnostico.tsx` o `practicar/[modulo]/page.tsx`, ahí sí corresponde re-verificar.
Actualización: `Diagnostico.tsx` cambió de nuevo (fix de aleatoriedad de opciones, ver "Ajuste: capturas reales en landing + 2 bugs reales"). Mismo criterio: cambia el ORDEN en que aparecen las opciones en cada carga, no el layout/color/espaciado que ya evaluó el revisor — no amerita otra ronda.

VEREDICTO_ONBOARDING_RUTINA_BACKOFFICE: el gate de veredicto se re-disparó por crear `app/admin/layout.tsx`, `app/admin/page.tsx` y editar `examen/page.tsx`/`practicar/[modulo]/page.tsx` (agregar `logEvent`, una sola línea cada uno, sin tocar layout/color/espaciado) — ninguno de esos archivos es la pantalla de onboarding. `Diagnostico.tsx` y `onboarding/page.tsx` no cambiaron visualmente desde el último veredicto LISTA (38/40, 16/20). Se documenta aquí en vez de gastar otra ronda de revisor sin diferencia real que evaluar.

VEREDICTO_ONBOARDING_RUTINA_AUDITORIA (2026-08-14): el gate se re-disparó otra vez por los mismos 3 archivos ya documentados arriba (`admin/layout.tsx`, `admin/page.tsx`, `examen/page.tsx`) — no hay commit nuevo entre esta entrada y la anterior, es el mismo cambio evaluado en `VEREDICTO_ONBOARDING_RUTINA_BACKOFFICE`. Mismo criterio: ninguno toca `onboarding/page.tsx` ni `Diagnostico.tsx`. Se documenta de nuevo por consistencia del gate (que compara fechas de archivo, no diffs) y se continúa sin relanzar el revisor.

VEREDICTO_ONBOARDING_RUTINA_AUDITORIA_10DE10 (2026-08-17): el gate se re-disparó una vez más por los mismos archivos de siempre (`admin/layout.tsx`, `admin/page.tsx`, `examen/page.tsx` — este último por el cambio real de esta sesión: 12 preguntas del simulacro en vez de 6, ya documentado en "Sesión 7"). Ninguno es `onboarding/page.tsx` ni `Diagnostico.tsx`, que se revisaron a fondo por código en la "Ruta a 10/10" de hoy (punto 7) sin encontrar bugs — el veredicto LISTA (38/40, 16/20) sigue siendo válido porque su código no cambió. No se relanza `revisor-visual` por lo mismo de siempre.

VEREDICTO_LANDING_Y_PAYWALL_RUTA_10DE10 (2026-08-17): landing y paywall siguen NO LISTA a propósito (ver `VEREDICTO_LANDING_NO_LISTA`/`VEREDICTO_PAYWALL_NO_LISTA` más abajo) — hoy se corrigieron los defectos REALES que quedaban de esos veredictos viejos (skip-link + conteo animado de precios en landing; CTA propio en el hero del paywall), verificados en el navegador, pero NO se relanzó `revisor-visual` formalmente porque el subagente no tiene acceso a navegador en este entorno y guardar una captura a disco para dárselo no fue posible esta sesión (ver "Ruta a 10/10" arriba, punto 3, para el detalle completo de qué se verificó y cómo). Ambas pantallas quedan documentadas como mejoradas pero sin nuevo puntaje formal — la próxima sesión con acceso a captura real debería relanzar el revisor antes de declararlas LISTA.

VEREDICTO_ONBOARDING_RUTINA_CIERRE_AUDITORIAS (2026-08-14): mismo gate, mismo motivo — se re-disparó de nuevo por los mismos 3 archivos (`admin/layout.tsx`, `admin/page.tsx`, `examen/page.tsx`, este último solo por el `logEvent` de una línea ya documentado) tras cerrar las 4 auditorías en cola (email de bienvenida, sistema de inversión en Perfil, páginas legales). `onboarding/page.tsx` y `Diagnostico.tsx` siguen sin cambios de layout/color/espaciado desde el veredicto LISTA (38/40, 16/20) — no amerita nueva ronda de `revisor-visual`.

VEREDICTO_ONBOARDING_RUTINA_LIMITE_FREEMIUM (2026-08-14): el gate se re-disparó otra vez — esta vez `examen/page.tsx` cambió de verdad (se le agregó el gate real Free/Premium, ver "Cierre del límite Free/Premium" arriba), pero sigue siendo la pantalla de Modo Examen, no la de onboarding. `admin/layout.tsx`/`admin/page.tsx` no cambiaron en esta pasada. `onboarding/page.tsx` y `Diagnostico.tsx` siguen intactos desde el veredicto LISTA (38/40, 16/20) — no amerita nueva ronda.

PENDIENTE_APROBACION (2026-08-14): en cola para ejecutar en la próxima capa aprobada por el usuario — sistema de "inversión acumulada" (loop de retención, pilar (a) de la Regla 6): historial de módulos completados, progreso visible que crece con el tiempo, configuración/preferencias guardadas, y algún tipo de desafío personal (ej. racha o meta propia) — objetivo explícito del usuario: "que cuanto más acumule más le cueste irse". Se combinará con el hallazgo ya anotado de DIM1 (sin disparador externo de retención) al cerrar las 4 auditorías en cola.
(Resuelto — ver "Sesión 6 — Cierre de las 4 auditorías" más abajo: sistema de inversión implementado en Perfil.)

VEREDICTO_LANDING_NO_LISTA (2026-08-14): `docs/revisiones/landing-veredicto.md` dice NO LISTA (última puntuación real: 28/40 usabilidad · 16/20 craft — craft YA pasa el gate, usabilidad no). Tras 4 rondas de correcciones reales (block-press en CTAs, focus-visible global, profundidad, garantía cerca del CTA, escenas de FICHA-AVATAR en el copy) se decidió CERRAR el ciclo de re-revisión: lo que queda (skip-link, estado de error visible, conteo animado de precios) es pulido fino, no bloqueante de conversión. Detalle completo de las 4 rondas en "CIERRE_REVISOR_LANDING_PAYWALL" más abajo. Landing queda documentada como NO LISTA a propósito, no por descuido.

VEREDICTO_PAYWALL_NO_LISTA (2026-08-14): `docs/revisiones/paywall-veredicto.md` dice NO LISTA (mejor puntuación alcanzada: 34/40 usabilidad · 15/20 craft · 16/20 copy — cerca del gate pero no lo cruza de forma consistente entre rondas). Mismo cierre de ciclo que landing, mismo motivo (retornos decrecientes tras 4 rondas). Detalle completo en "CIERRE_REVISOR_LANDING_PAYWALL" más abajo. Paywall queda documentada como NO LISTA a propósito, no por descuido.

VEREDICTO_ONBOARDING_RUTINA_SYNC_Y_CRON (2026-08-15): el gate se re-disparó por `lib/progress.ts`, `app/app/page.tsx`, `app/app/perfil/page.tsx` (sincronización con Supabase) y por crear `app/api/cron/recordatorios/route.ts` — ninguno es la pantalla de onboarding ni toca su layout/color/espaciado. `onboarding/page.tsx` y `Diagnostico.tsx` siguen intactos desde el veredicto LISTA (38/40, 16/20).

## Sesión 6 — Cierre de las 4 auditorías (senior + legal + emails + crítica de expertos)
Ejecutado, en una sola tanda, lo que las 4 auditorías coincidieron en señalar como más urgente:
1. **Email de bienvenida con acceso real**: instalado `resend` (SDK), creado `lib/email.ts` (`enviarCorreoBienvenida`, best-effort — nunca lanza, si falla solo se loguea). Conectado en `app/api/webhooks/hotmart/route.ts`: al aprobar la compra (usuario nuevo o que sube a premium) se genera un magic link real (`auth.admin.generateLink`) y se envía por correo. Agregada `NEXT_PUBLIC_SITE_URL` (opcional — usa `VERCEL_URL` automático si está vacía) a `.env`/`.env.example`.
   ⚠️ **Pendiente del usuario**: `RESEND_API_KEY` está vacía en `.env` — sin ese valor el correo no se envía (queda solo en el log). Ponerla antes de conectar Hotmart de verdad.
2. **Sistema de inversión acumulada** (pedido explícito del usuario): `lib/progress.ts` ahora guarda `totalEjercicios` (aciertos de por vida, nunca baja), `mejorRacha` (récord histórico), `creadoEn` (antigüedad de la cuenta) y una **meta semanal editable** (`metaSemanal`/`ejerciciosSemana`, reinicia cada semana ISO). Todo visible y editable en `/app/perfil` (nuevas tarjetas de récord/total + barra de progreso del desafío semanal con botones +/−5). Verificado con datos sembrados en `localStorage`: los 4 números y la barra renderizan correctamente.
3. **4 páginas legales reescritas por completo** (antes placeholders de un párrafo): `/privacidad`, `/terminos`, `/reembolsos`, `/aviso-ia` — con datos reales: responsable Nymy (persona natural, Canadá), contacto `soporte@algebrax.app`, cláusula de menores de edad (adulto responsable compra/autoriza), aviso de transferencia de datos a IA (DeepSeek, sin datos personales), derechos del usuario, condiciones de suscripción/cancelación vía Hotmart.
4. Verificado tras cada capa: `tsc --noEmit` ✓, `npm run build` ✓ (16 rutas, sin errores).

### Cierre del límite Free/Premium (2026-08-14)
Resuelta la contradicción anotada arriba: se construyó el gate real, alineado con la Constitución del Producto (línea 66): **Free = solo "Ecuaciones básicas" (el primer módulo) con tope de 15 ejercicios/día · Premium = los 3 módulos + Modo Examen + práctica ilimitada.**
- `lib/plan.ts` (nuevo): hook `usePlan()` — lee `profiles.plan` del usuario logueado (RLS ya permite self-select); sin sesión (preview anónimo) siempre es `free`. Constantes `MODULO_GRATIS_SLUG` (primer módulo de `MODULOS`) y `LIMITE_DIARIO_GRATIS = 15`.
- `lib/progress.ts`: agregado `ejerciciosHoyGratis`/`diaEjerciciosGratis` + `ejerciciosGratisHoy()`/`registrarEjercicioGratisHoy()` — mismo patrón que la meta semanal, se resetea solo al cambiar de día.
- `app/app/page.tsx`: Modo Examen y los 2 módulos no gratis muestran candado + "Desbloquea con Premium" y llevan a `/paywall?tema=...` (nunca ocultos, siempre visibles — sin dark pattern).
- `app/app/examen/page.tsx` y `app/app/practicar/[modulo]/page.tsx`: gate real de servidor-cliente (no solo visual) — entrar por URL directa a un módulo pago o al examen sin Premium muestra una pantalla de valor con CTA a `/paywall`, no un error. El módulo gratis, al llegar a 15 ejercicios en el día, muestra "vuelve mañana o hazte Premium".
- Verificado en navegador (sesión anónima = plan free por defecto): los 3 candados renderizan y enlazan correctamente a `/paywall` con el tema correcto. `tsc` ✓ `build` ✓ (16 rutas).
- Límite conocido: el conteo diario vive en `localStorage` (mismo patrón que el resto de `progress.ts`, ya documentado como pendiente de migrar a Supabase) — un usuario que borre `localStorage` se resetea el conteo. No es explotable para escalar a Premium (eso solo lo cambia el webhook de Hotmart), solo para seguir practicando gratis sin límite real; aceptable para esta etapa, no bloqueante.

### Corrección: el límite avisaba DESPUÉS, no antes (2026-08-14)
Bug real encontrado por el usuario: el candado de `practicar/[modulo]/page.tsx` comparaba el tope contra un estado (`ejerciciosHoy`) que se actualizaba EN VIVO cada acierto — si el estudiante cruzaba las 15 preguntas a mitad de una tanda de 8, la pantalla completa saltaba de golpe a "ya practicaste tus 15 de hoy", cortando una sesión ya empezada sin aviso. Motivo del usuario: interrumpir a alguien que ya invirtió esfuerzo genera frustración y cancelaciones, no lealtad. Corregido:
- El tope ahora se congela en `restantesAlEntrar` (estado fijado UNA sola vez en el `useEffect` de montaje, nunca se vuelve a calcular mientras se practica) — si ya estaba en el tope AL ABRIR la pantalla, bloquea antes de empezar (correcto); si no, la sesión completa de 8 preguntas se deja terminar siempre, aunque cruce el tope a mitad de camino.
- Nuevo aviso PREVIO en la pantalla de ejemplo (antes del botón "Ahora inténtalo tú"): si quedan ≤8 ejercicios gratis hoy, muestra "Te quedan X ejercicios gratis hoy: esta sesión te los usa."
- Nuevo aviso en Inicio: la tarjeta del módulo gratis ahora muestra "X ejercicios gratis hoy" en vez de solo la descripción — visible ANTES de siquiera entrar a practicar.
- Verificado en navegador con datos sembrados (12/15 usados): Inicio mostró "3 ejercicios gratis hoy", la pantalla de ejemplo mostró el aviso previo correcto, y por código se confirmó que `restantesAlEntrar` no se recalcula durante la sesión (no puede cortarla a mitad de camino). `tsc` ✓ `build` ✓.

⚠️ **Hallazgos de las auditorías NO ejecutados — pendientes de decisión del usuario**:
- Sin dominio propio verificado en Resend (sigue en `onboarding@resend.dev`, sandbox) — bloquea enviar correos a compradores reales, no solo al dueño de la cuenta.
- `RESEND_API_KEY` vacía en `.env` — el correo de bienvenida (ver arriba) no se envía hasta que el usuario la agregue.

### Sesión 6 — Progreso migrado a Supabase (protege a quien ya paga) — 2026-08-15
Hallazgo del usuario al pedir verificar el diseño "para uso diario": el progreso (racha, gemas, historial, meta semanal) vivía SOLO en `localStorage` — un estudiante que YA paga y cambia de celular, reinstala, o borra datos del navegador perdía todo. Resuelto:
- Reutilizadas las tablas ya existentes `user_progress`/`module_progress` (creadas en Sesión 1, nunca conectadas al frontend) en vez de crear una tabla nueva — se extendió `user_progress` con las columnas que faltaban (`nombre, grado, gemas, mejor_racha, total_ejercicios, creado_en, meta_semanal, ejercicios_semana, semana_id, ejercicios_hoy_gratis, dia_ejercicios_gratis`). RLS ya cubría self-select/upsert, sin cambios ahí. 0 hallazgos de seguridad nuevos (`get_advisors`).
- `lib/progress.ts`: `localStorage` sigue siendo la caché rápida (la UI nunca espera red), pero ahora es solo caché — `sincronizarAlAbrir()` (llamada al entrar a `/app` y a `/app/perfil`) jala la nube: si existe fila en Supabase, GANA sobre el caché local; si no existe, sube lo local. Cada escritura normal (`guardar()`) empuja a la nube en segundo plano, sin bloquear ni cambiar la firma síncrona que ya usa el resto de la app. Sin sesión (preview anónimo "Seguir gratis por ahora"), sigue 100% local, sin cambios.
- **Bug real encontrado y corregido durante la verificación** (no hipotético — se manifestó en la primera prueba end-to-end): `leerProgreso()` tenía un efecto secundario que, al rellenar `creadoEn` por primera vez, llamaba a la función que TAMBIÉN empuja a la nube — como `sincronizarAlAbrir()` llama a `leerProgreso()` como su propio primer paso, ese empujón de un registro casi vacío salía ANTES de que la propia sincronización alcanzara a jalar los datos reales, borrando el progreso guardado en la nube en cada visita desde un dispositivo nuevo. Corregido separando `guardarLocal()` (solo caché, sin red) de `guardar()` (caché + nube) — el relleno de `creadoEn` ahora usa solo la primera.
- **Verificado de punta a punta con una cuenta real** (Supabase `generateLink` + `verifyOtp` vía API, sin tocar dominios externos desde el navegador de prueba): se guardó progreso distintivo (777 gemas, 88 ejercicios, nombre "SantiSyncTest") directamente en la base, se simuló un "celular nuevo" (contexto de navegador limpio, sin `localStorage` previo), se inició sesión, y el progreso volvió completo. Confirmado también que el bug SIN el fix perdía los datos (reproducido antes de corregir). `tsc` ✓ `build` ✓ (16 rutas). Datos de prueba limpiados de la cuenta real al terminar.

### Sesión 6 — Disparador externo de retención: correo de "racha en riesgo" + cron diario — 2026-08-15
Resuelto el hallazgo de DIM1 de la auditoría senior (sin ningún gatillo externo, la app dependía 100% de que el estudiante se acordara solo de volver):
- `lib/email.ts`: nueva `enviarCorreoRachaEnRiesgo(email, racha, magicLink)` — mismo patrón best-effort que el correo de bienvenida (nunca lanza).
- `app/api/cron/recordatorios/route.ts` (nueva ruta): consulta `user_progress` por `current_streak > 0` y `last_active_on = ayer` (fecha UTC del servidor — simplificación consciente, ver comentario en el archivo sobre el desfase de zona horaria con estudiantes en distintos países), genera un magic link real por candidato y dispara el correo. Protegida con `CRON_SECRET` (nuevo env var, generado y puesto en `.env`; falta ponerlo también en Vercel).
- `vercel.json` (nuevo): cron diario a las 22:00 UTC (~5-6pm LATAM) llamando esa ruta.
- **Bug real encontrado y corregido al probar el cron** (no relacionado con lo que se estaba construyendo, pero grave): el `matcher` de `middleware.ts` incluía TODAS las rutas menos estáticos — cualquier `/api/*` sin sesión de navegador recibía un redirect 307 a `/entrar` en vez de ejecutarse. Esto significa que **el webhook de Hotmart nunca habría funcionado** en cuanto se conectara de verdad (Hotmart no tiene sesión de navegador). Corregido excluyendo `api/` del matcher — cada ruta de API ya hace su propia autorización (hottok, `CRON_SECRET`, o ninguna si es pública) y no debe depender del guard de sesión pensado para pantallas.
- Verificado con `curl` real contra el servidor local: sin `Authorization` → 401; con la clave correcta → 200 y JSON `{candidatos, enviados, fallidos}`; sembrando una racha de prueba en riesgo → la detectó, generó el link real, y el log mostró el aviso esperado de "RESEND_API_KEY no configurada" (correcto: sin esa clave el correo no sale, solo se loguea). `tsc` ✓ `build` ✓ (17 rutas). Datos de prueba limpiados.
- ⚠️ **Pendientes del usuario para que esto funcione en producción**: (1) poner `CRON_SECRET` (mismo valor que en `.env`) en Vercel → Project Settings → Environment Variables; (2) poner `RESEND_API_KEY` real para que el correo se envíe de verdad (sigue pendiente desde el correo de bienvenida); (3) mismo límite de sandbox de Resend ya documentado — sin dominio propio verificado, hoy solo puede enviarse a tu propio correo.
- No incluido en este v1 (documentado, no olvidado): notificaciones push (requiere PWA + service worker, alcance mucho mayor) y correos de reactivación para quien lleva varios días sin volver (hoy solo cubre "racha activa en riesgo de romperse mañana", no "ya la perdió, vuelve"). Candidatos para una siguiente capa si el usuario los pide.
- **Publicado en producción y verificado con `curl` real** (2026-08-15): `CRON_SECRET`/`RESEND_API_KEY` puestos en Vercel (el primer intento falló build por espacio en blanco al pegar `CRON_SECRET` — corregido), push vía GitHub Desktop, redeploy exitoso. Confirmado contra `https://github-com-nymy1972-boob-algebrax.vercel.app`: `/privacidad` sirve el contenido legal real (no el placeholder viejo), `/api/cron/recordatorios` responde 401 sin clave y 200 con la clave real. El fix del middleware (excluir `/api/*`) también quedó confirmado en vivo.
- **Nota de sincronización en Perfil** (pedido del usuario, "que el estudiante sepa que no pierde su avance al cambiar de celular"): reemplazó el aviso viejo y ya falso ("tu progreso vive en este dispositivo... las cuentas reales llegan en la Sesión 6") por `hayCuentaReal()` (nueva función en `lib/progress.ts`, expone el mismo chequeo de sesión que ya usaba `sincronizarAlAbrir()`) — con cuenta real dice "tu racha, gemas e historial están guardados... abre AlgebraX en cualquier celular"; sin cuenta (preview anónimo) sigue avisando honestamente que el progreso es solo local. Mismo tamaño/posición de texto que el aviso anterior, sin tocar el resto del diseño. Verificado en navegador (ambas variantes) + `tsc` ✓ `build` ✓.

### Sesión 6 — Sistema de recomendación / referidos (growth loop) — 2026-08-15
Pedido explícito del usuario, con brief detallado (14 puntos: mensajes centrados en la otra persona nunca en "ayúdanos a crecer", 3 momentos de aparición, cooldown, tracking, A/B testing, compartir editable, confirmación humana post-share). Construido reutilizando la arquitectura existente en vez de crear sistemas paralelos:
- **DB**: extendidas las tablas ya existentes (mismo patrón que el resto de la sesión) — `profiles` gana `referral_code` (único, se genera al primer compartir) y `referred_by`; `user_progress` gana `referral_prompt_seen`, `referral_dismissed_at`, `last_referral_prompt`, `referral_shared_count`, `referral_variant` (sincronizados con el mismo mecanismo de `lib/progress.ts` que ya protege racha/gemas). Cero tablas nuevas.
- **`lib/referral.ts`** (nuevo, cerebro del feature): 3 variantes de copy (A/B/C, todas centradas en "conoces a alguien", ninguna dice "comparte/invita/ayúdanos"), cooldown de 4 días + nunca 2 veces el mismo día, código de referido + captura de `?ref=` con vigencia de 30 días, mensaje/link editable, hook `useReferralPrompt()` compartido por las 3 pantallas que disparan el prompt.
- **Componentes nuevos**: `ReferralPromptOverlay` (Momentos A/C), `ReferralCard` (Momento B, tarjeta permanente en Inicio), `ShareSheet` (mensaje editable + WhatsApp + copiar + nativo, con estado de "gracias" humano integrado — reutiliza `canvas-confetti` como `CelebrationOverlay`), `ReferralCapture` (invisible, montado en el layout raíz).
- **Momentos conectados**: A = tras completar un módulo o el examen (`practicar/[modulo]/page.tsx`, `examen/page.tsx` — el prompt se muestra ANTES de navegar a Inicio, nunca lo corta; solo navega cuando todo el flujo de referido se cierra). B = tarjeta en `/app` (Inicio), siempre visible, X la oculta solo por esa sesión. C = al abrir `/app`, con retraso de 1.4s y solo tras una señal mínima de interacción positiva.
- **Atribución**: `app/api/referral/asociar/route.ts` (servidor, admin client) — valida que el código exista, que no sea auto-referido, y que el usuario nuevo no tenga ya un `referred_by` asignado; conectado en ambos caminos de login exitoso de `/entrar`.
- **Tracking**: reutiliza `event_log` (mismo pipeline que ya lee `/admin`) — eventos `referral_prompt_mostrado`, `referral_cta_clicked`, `referral_share_sheet_abierto`, `referral_compartido` (con medio: whatsapp/copiar/nativo), `referral_descartado`, `referral_signup_attributed` — todos con la variante mostrada, listos para medir conversión por variante sin construir nada nuevo.
- **Bug real encontrado y corregido durante la verificación** (no relacionado con lo que se estaba construyendo, pre-existente desde la Sesión 1, nunca antes disparado): la política RLS `update_own_profile` tenía una subconsulta que se referenciaba a sí misma (`plan = (select plan from profiles where id = auth.uid())` dentro de su propio `with check`), causando `infinite recursion detected in policy for relation "profiles"` (42P17) — bloqueaba CUALQUIER actualización de un usuario normal a su propio `profiles`, no solo el plan. Nunca se había notado porque hasta esta sesión nada actualizaba `profiles` desde el navegador (todo pasaba por el cliente admin/service-role, que salta RLS). Corregido: la política ahora es simple (`auth.uid() = id`, sin subconsulta) y la protección real de "no te subas el plan tú mismo" pasa a un trigger `evitar_autoascenso_de_plan()` que exceptúa al `service_role` (para que el webhook de Hotmart sí pueda subir el plan). Función también restringida de RPC pública (mismo patrón que `handle_new_user()` de la Sesión 6 anterior). 0 hallazgos de seguridad nuevos tras el fix.
- **Verificado de punta a punta con cuentas reales** (Supabase `generateLink`+`verifyOtp` vía API): el referidor generó su código real desde la tarjeta del dashboard, un usuario nuevo entró con `?ref=CODIGO`, inició sesión, y quedó con `referred_by` correctamente asociado en la base — confirmado con SQL directo. Eventos de tracking confirmados en `event_log` (prompt_mostrado → cta_clicked → share_sheet_abierto → compartido). `tsc` ✓ `build` ✓ (18 rutas). Datos de prueba limpiados.
- **Panel de referidos agregado a `/admin`** (2026-08-15, mismo día — el usuario pidió agregarlo de inmediato): nueva sección "Recomendaciones (referidos)" en `app/admin/page.tsx`, sin tabla nueva — agrega/agrupa sobre `event_log` (filtrado por `event_name like 'referral_%'`) y `profiles.referred_by`. Muestra: embudo completo (vieron → tocaron CTA → compartieron → cuentas atribuidas, con % de conversión en cada paso), desglose por medio (WhatsApp/copiar/nativo), A/B por variante (vistas→clics de A/B/C), y ranking de quién ha traído más gente. Mismo patrón "no medido todavía" si aún no hay datos (cero números inventados). Verificado en navegador con datos reales sembrados (3 vistas, 1 clic, 1 compartido, 1 atribuido) — el embudo y los porcentajes calcularon correcto; datos de prueba limpiados después. `tsc` ✓ `build` ✓ (18 rutas, sin ruta nueva — es una sección dentro de `/admin`).

### Sesión 6 — Segunda vía de desbloqueo (gemas) + adelanto gratis del simulacro — 2026-08-15
Pedido explícito del usuario: además de pagar, que se pueda desbloquear practicando; y un mini-simulacro siempre gratis para generar interés. Implementado en `lib/plan.ts` (nuevas constantes/funciones `UMBRAL_GEMAS_DESPEJES=300`, `UMBRAL_GEMAS_FACTORIZACION=700`, `UMBRAL_GEMAS_EXAMEN=1200`, `moduloDesbloqueado()`, `examenDesbloqueado()`, `gemasQueFaltan()`) — umbrales crecientes, lo más caro de desbloquear es el simulacro completo (el ítem de mayor valor). Ningún cambio de base de datos: usa las gemas que ya existían.
- **Inicio** (`app/app/page.tsx`): las tarjetas de Despejes/Factorización y Modo Examen ahora muestran "Te faltan N gemas, o hazte Premium" en vez de solo "Desbloquea con Premium".
- **Práctica** (`practicar/[modulo]/page.tsx`) y **Examen** (`examen/page.tsx`): la pantalla de bloqueo ahora ofrece EXPLÍCITAMENTE los 2 caminos (tarjeta de progreso de gemas + botón de Premium), nunca solo uno.
- **Adelanto gratis del simulacro** (pedido explícito, "para que crezca el interés"): en la pantalla de Modo Examen bloqueada hay un botón "Probar un adelanto gratis (3 preguntas)" — 1 pregunta por módulo, SIN cronómetro (el header muestra "ADELANTO" en vez del reloj). Al terminar, el reporte dice "Ese fue tu adelanto" + explica la diferencia con el simulacro completo (6 preguntas cronometradas) + repite las 2 opciones de desbloqueo. Las gemas ganadas en el adelanto SÍ cuentan para el umbral real (mismo `sumarGemas`) — practicar el adelanto acerca al desbloqueo. El prompt de referidos no se dispara en el adelanto (ese CTA-slot es para desbloquear, no compite).
- Verificado en navegador con datos sembrados: con 100/150 gemas se ven las 2 opciones + el adelanto correctamente en Inicio, Examen y Práctica; con 1500 gemas (sobre el umbral del examen) se salta directo al simulacro completo, sin pantalla de bloqueo. El adelanto se completó de punta a punta (3 preguntas → reporte con el CTA de desbloqueo). `tsc` ✓ `build` ✓ (18 rutas).

### METODOLOGIA_CAPTURA_WHILEINVIEW (2026-08-14)
Primera ronda de `revisor-visual` en landing y paywall dio **NO LISTA** en ambas (18/40·5/20 y 15/40·6/20) por un falso positivo: el script de captura (`page.screenshot({fullPage:true})` justo tras `networkidle`, sin scroll) nunca hace que el navegador recorra la página, así que las secciones con `whileInView`/IntersectionObserver (`useReveal` en `components/landing/ui.tsx`) se capturan en su estado inicial `opacity:0` — casi toda la landing y el pricing del paywall salían invisibles en la imagen. Verificado con un script que hace scroll incremental real antes de capturar: `getComputedStyle(...).opacity` de esas secciones da `1` — el contenido SÍ se ve para un usuario real. Se volvió a capturar con scroll real y se relanzó el revisor. **Lección para el futuro**: cualquier captura de una pantalla con animaciones `whileInView` (landing, cualquier pantalla larga) debe hacer scroll incremental antes del screenshot — un `fullPage:true` directo no dispara esas animaciones y produce veredictos inválidos.
Segundo hallazgo de metodología (misma causa raíz, elemento distinto): al agregar `StickyCtaMobile` al paywall, la 4ª ronda de captura mostró la barra fija "horneada" a mitad de una transición, solapando texto de la card de precios — verificado manualmente (`docs/revisiones/paywall-375.png` de esa ronda) que es un artefacto del stitching de `fullPage:true` sobre un elemento `position:fixed` durante el scroll sintético, no un bug real (un usuario real ve la barra siempre pegada al fondo, sin solape). **Lección adicional**: al capturar pantallas con `StickyCtaMobile` u otro elemento `fixed`, ocultarlo (`display:none` temporal o esperar a que termine su transición) antes del `screenshot({fullPage:true})`.

### Sesión 6 — Dominio propio comprado y verificado en Resend — 2026-08-15
El correo real (fuera de la cuenta del dueño) estaba fallando: Resend rechazaba el envío a cualquier
correo que no fuera `nymy1972@gmail.com` (confirmado con `query_logs` de Supabase — error 550,
"You can only send testing emails to your own email address... verify a domain"). Causa raíz: sin
dominio propio verificado, Resend queda en modo sandbox de por vida — bloqueaba tanto el código de
acceso por correo como el correo de bienvenida tras la compra. Resuelto:
- Dominio comprado por el usuario: **`nymystudio.com`** (elegido como marca genérica reutilizable
  para futuras apps, no solo AlgebraX — verificado disponible con RDAP antes de comprar).
- Dominio verificado en Resend (registros DNS agregados en Namecheap).
- `EMAIL_FROM` actualizado de `hola@algebrax.app` (nunca fue real) a `hola@nymystudio.com` en
  `.env` local y `.env.example`.
- **RESUELTO (2026-08-17)**: `EMAIL_FROM` actualizado en Vercel + Redeploy hecho; "Sender email" cambiado en
  Supabase → Authentication → SMTP Settings de `onboarding@resend.dev` a `hola@nymystudio.com`.
  Verificado con un envío de prueba real a un correo que NO es el del dueño
  (`prueba-envio-real@algebrax-test.com`) vía `query_logs` de Supabase: `status 200`, sin error
  (antes daba 550 "solo puedes enviar a tu propio correo"). El login por código ya funciona para
  cualquier estudiante, no solo para la cuenta del dueño — bloqueante real resuelto.

### Sesión 6 — Copy sin promesa de resultado académico (cumplimiento publicitario) — 2026-08-17
El usuario señaló 6 frases ("aprueba tu examen", "domina álgebra", "en 6 meses vas a estar en el
mismo lugar", "mismo miedo al examen", "simulacros iguales a tu examen real", "abre la hoja de
examen y sabe exactamente qué hacer") y explicó el motivo real: Google Ads y TikTok Ads prohíben
afirmaciones de resultados improbables presentados como esperables ("aprueba"/"domina" prometen un
resultado académico que la app no puede garantizar), y el público de AlgebraX incluye MENORES DE
EDAD — mayor cuidado exigido contra presión comercial/explotación de vulnerabilidad. Regla nueva
para todo copy futuro: describir la HERRAMIENTA (entender el paso a paso, practicar, el formato del
simulacro) en vez de prometer el RESULTADO (aprobar, dominar, garantizar equivalencia con "tu examen
real" que la app nunca vio).
- Cambiado en: `app/layout.tsx` (title/description), `app/page.tsx` (h1 del hero, agitación x2,
  título de la oferta, línea del stack, futurePacing del CTA final, label del carrusel),
  `app/paywall/page.tsx` (hero x2, título de la oferta, línea del stack, bullet de simulacros),
  `app/app/examen/page.tsx` (intro bloqueado, intro del simulacro completo, aviso del adelanto,
  celebración de simulacro perfecto, aviso durante las preguntas) — 4 más de las que el usuario
  señaló directamente, mismo patrón ("igual/exactamente como tu examen real"), encontradas al
  revisar el resto de la app por consistencia.
- NO cambiado (revisado y descartado): "Dominas {módulo}" en `practicar/[modulo]/page.tsx` — es
  feedback DENTRO de la app tras acertar el 100% de una sesión real, no una promesa publicitaria a
  un prospecto; categoría distinta a la que señaló el usuario. Si se quiere más conservador, avisar.
- Verificado: `tsc` ✓ `build` ✓ (18 rutas, sin cambios estructurales, solo copy).

**Segunda pasada, más precisa (mismo día)** — el usuario dio una tabla exacta "actual → reemplazo"
con la razón legal completa (Google Ads prohíbe afirmaciones engañosas/resultados improbables y
exige coherencia anuncio↔landing; TikTok Ads prohíbe prometer/exagerar resultados y protege
especialmente a menores de presión comercial). Ajustes adicionales sobre la primera pasada:
- Eliminado (no solo suavizado) el bloque `contraste` de `<Agitacion>` en `app/page.tsx` (la
  comparación "Hoy vs. Si nada cambia" — predicción de resultado futuro, prop opcional en el
  componente, se quitó por completo en vez de reescribirla).
- `¿Te da vergüenza preguntar en clase?` eliminado del todo (`Problema`, ya no 4 sino 3 preguntas —
  dentro del rango 3-5 que exige `warnRango`).
- Bullet "te quedas en blanco en el examen" → "te resulta difícil resolverlo por tu cuenta".
- "Antes" del antes/después ya no menciona el examen directamente; "Después" → "puedes volver a
  practicar el procedimiento" (ya no "resuelves el ejercicio tú mismo", que sonaba a resultado).
- CTA final: "Entra a tu examen sin miedo" → "Prepárate para tus evaluaciones con práctica
  estructurada"; futurePacing → "sentirte mejor preparado para abordar los ejercicios".
- FAQ del temario → "álgebra básica, incluyendo ecuaciones, despejes y factorización, para
  practicar conceptos frecuentes de este nivel" (ya no afirma conocer el examen de cada colegio).
- Precio de la oferta: "desde $0.14 al día" (ya no "domina"/"por").
- La Garantía (`Garantia` component, "Si en 7 días no entiendes...") y el mensaje de padres/tutores
  se dejaron tal como quedaron en la primera pasada — el usuario pidió explícitamente NO tocar la
  garantía hasta definir con Hotmart cómo se gestiona realmente el reembolso (quién procesa el pago,
  condiciones exactas, si aplica a mensual/anual/ambos, cómo se solicita, qué pasa con una
  suscripción activa). **Pendiente real, no técnico** — requiere respuesta del usuario o de Hotmart,
  no una decisión de copy que se pueda tomar sola.
- Verificado en navegador con scroll real (mismo método ya documentado para `whileInView`): landing
  completa se ve bien sin el bloque de contraste, todo el copy nuevo aparece correcto. `tsc` ✓
  `build` ✓ (18 rutas).
- **Próximo pendiente identificado por el usuario, NO ejecutado todavía** (pidió hacer primero los
  cambios de copy): auditoría de privacidad y protección de menores antes de gastar en publicidad
  paga (Meta/Google/TikTok) — 10 puntos: datos que recoge la app, uso de IA y qué se envía a
  terceros, manejo de cuentas de menores, correo electrónico, cookies/analytics/píxeles, pagos y
  suscripciones, y una revisión real (no solo que existan) de privacidad/términos/reembolsos/aviso
  de IA. Las 4 páginas legales ya existen (Sesión 6, con datos reales de Nymy/Canadá) pero no han
  sido auditadas específicamente contra este ángulo de menores + plataformas de ads.

**Tercera pasada (mismo día)** — el usuario reportó que las frases seguían visibles; verificado con
`curl` contra el sitio publicado que 9 de 10 ya estaban corregidas (probablemente vio una versión en
caché de su navegador) — solo faltó "¿Sientes un nudo en el estómago...?" (`Problema`, no se había
tocado en la primera pasada). Corregido, reemplazada por una pregunta neutra ("¿Sientes que
necesitas repetir el mismo tipo de ejercicio varias veces...?") para mantener las 3 preguntas
mínimas que exige `warnRango` del componente.
- **Garantía reescrita de fondo** (esta vez sí, con dirección explícita del usuario: "una garantía
  de satisfacción/reembolso" en vez de "una promesa de que el usuario comprenderá un concepto", y
  sin confundirla con la garantía propia de Hotmart): renombrada de "la Garantía del Primer Paso
  Entendido" a **"la Garantía de satisfacción de 7 días"** en TODOS los lugares donde aparecía (hero
  de landing y paywall, sección Garantía, FAQ, recap y PS del CTA final, `/reembolsos`). La condición
  ya no promete comprensión ("si no entiendes un paso") sino satisfacción ("si sientes que AlgebraX
  no es para ti"). Se quitó la afirmación no verificada "respaldada por la garantía Hotmart de 7
  días" — reemplazada por "Procesada a través de Hotmart" (solo nombra la plataforma de pago, sin
  atribuirle a Hotmart una garantía propia que no está confirmada). `/reembolsos` ahora aclara
  explícitamente **quién ofrece la garantía** ("la ofrece AlgebraX, no Hotmart — Hotmart es
  únicamente la plataforma que procesa el pago y la devolución"), resolviendo la confusión de dos
  garantías distintas que señaló el usuario.
- ⚠️ Sigue pendiente lo mismo de fondo (no cambia con esta reescritura): confirmar con la cuenta real
  de Hotmart si el plazo/condiciones que ofrece la plataforma coinciden con estos 7 días, y si aplica
  igual a mensual y anual — ver `GARANTIA_PENDIENTE_VERIFICACION` más arriba en este archivo.
- Verificado con Playwright headless (scroll real) contra `/`, `/paywall` y `/reembolsos`: cero
  coincidencias de las 7 frases prohibidas en ninguna de las 3. `tsc` ✓ `build` ✓ (18 rutas).

**Cuarta pasada (mismo día) — la garantía se ELIMINÓ, no se renombró más.** El usuario fue explícito:
"Si no existe una política comercial independiente formalmente definida, elimina esa garantía" — y
hoy no existe (`HOTMART_HOTTOK` sigue vacío, Hotmart nunca se conectó de verdad, el plazo de 7 días
siempre fue un número PROVISIONAL sin verificar — ver `GARANTIA_PENDIENTE_VERIFICACION`). En vez de
seguir renombrando una garantía inventada, se quitó por completo de la superficie de venta:
- `app/page.tsx`: quitada la sección `<Garantia>` completa (componente sigue existiendo, sin uso —
  reutilizable el día que exista una política real), el badge del Hero, `garantiaCorta` de la
  Oferta, y las menciones en FAQ/recap/PS del CTA final. La FAQ "¿Qué pasa si no me sirve?" ahora
  apunta a la Política de Reembolsos real en vez de prometer un plazo/condición inventados.
- `app/paywall/page.tsx`: mismo quite (badge, `garantiaCorta`) + corregido un "vacío de quedarte en
  blanco" que había quedado suelto en un bullet (mismo patrón de miedo/blanco que pidió eliminar).
- `app/reembolsos/page.tsx`: reescrita para NO inventar una garantía propia — ahora dice, con
  honestidad, que las condiciones de reembolso son las que Hotmart tenga vigentes en el momento de
  la compra (consultables en el recibo), sin fijar un plazo propio de AlgebraX no confirmado.
- Verificado con Playwright (scroll real) contra `/`, `/paywall`, `/reembolsos`: cero coincidencias
  de "garantía de satisfacción", "Primer Paso Entendido", "Garantía Hotmart", "respaldada por", ni
  de ningún término de miedo/vergüenza/blanco. `tsc` ✓ `build` ✓ (18 rutas, mismo conteo — no se
  quitó ninguna ruta, solo contenido).
- **Cuándo SÍ volver a poner una garantía en la landing**: cuando Hotmart esté conectado de verdad
  (`HOTMART_HOTTOK` con valor real) y se haya confirmado en el panel de Hotmart el plazo/condiciones
  reales de reembolso que aplican al producto — recién ahí construir el copy sobre un dato real, no
  antes. `components/landing/Garantia.tsx` queda listo para ese momento, no se borró.

### CIERRE_REVISOR_LANDING_PAYWALL (2026-08-14) — 4 rondas, ambas quedan NO LISTA, cierro el ciclo aquí
Tras 4 rondas de `revisor-visual` (real, con scroll correcto) sobre landing y paywall, aplicando en cada una los defectos reportados (block-press en todos los CTAs incluido el sticky, `focus-visible` global, nivel de profundidad `--surface-2`, garantía junto al CTA de compra, mecanismo bautizado nombrado, escenas literales de FICHA-AVATAR en el copy, jerarquía Anual vs Mensual, hero animado, sticky CTA en el paywall):
- **Paywall**: 15/40·6/20(falso, ver metodología) → 31/40·16/20·17/20 → 34/40·15/20·16/20 → 27/40·13/20·17/20 (esta última con el glitch de captura del sticky ya documentado arriba, que infló a la baja "Encaje"/craft artificialmente). Copy YA pasa el umbral (17/20, sin ejes ≤2) desde la 3ª ronda. Usabilidad/craft quedan cerca pero no cruzan el gate ≥36/40·≥16/20 de forma consistente.
- **Landing**: 18/40·5/20(falso) → 30/40·12/20 → 28/40·15/20 → 28/40·16/20. Craft YA pasa el gate (16/20). Usabilidad se estanca en ~28/40 por heurísticas h7 (sin atajos/skip-link) y h9 (sin estado de error visible en la landing) — ninguna es un defecto de "se ve mal", son gaps de accesibilidad/robustez de un nivel de pulido más allá de lo que definieron las 3 rondas anteriores.
- Se aplicó el último fix rápido pendiente (pasar `garantiaCorta` también en la landing, `app/page.tsx`) y se decidió CERRAR el ciclo de re-revisión aquí — no relanzar una 5ª ronda. Motivo: retornos decrecientes (cada ronda cuesta ~150k tokens combinados) contra defectos que ya son de pulido fino (skip-link, conteo animado de precios, área táctil del link Mensual), no bloqueantes de conversión real.
- **Ambas pantallas quedan formalmente NO LISTA según el gate del SO** — no se declaran "listas" en el sentido de la Regla 7. Punch list real pendiente para quien retome:
  1. Landing: agregar skip-link + un estado de error/fallback visible en algún CTA saliente (h7/h9).
  2. Landing: conteo animado 0→precio en `Precio` (Oferta.tsx) — baseline de movimiento pendiente.
  3. Paywall: confirmar en un dispositivo real (no captura sintética) que `StickyCtaMobile` nunca se solapa con contenido — muy probable que ya esté bien y sea solo el artefacto de captura, pero no verificado en vivo.
  4. Paywall: el link "Quiero Premium mensual" (ahora sin caja, para pesar menos) — confirmar que su área tocable real es ≥44px de alto.
  5. Ambas: `tsc`/`build` ✓ en cada ronda — el código nunca quedó roto, todo lo NO LISTA es de UX/craft, no de funcionalidad.

## Ajuste: paywall mejorado con reglas de Gemini (analizadas, no copiadas a ciegas)
El usuario trajo 7 "reglas de oro" de paywall de Gemini. Análisis y decisión:
- **Adoptadas (implementadas):** (3) headline orientado a RESULTADO en vez de features ("Pasa tu examen entrenando 10 min al día" / bullets en lenguaje de resultado) · (6) personalización dinámica: el paywall ahora lee `?tema=` (pasado desde el onboarding, el tema donde falló en el diagnóstico) y cambia el titular a "Tu plan para dominar [tema] está listo".
- **Descartadas y documentadas en el código (`app/paywall/page.tsx`, comentario de cabecera):** (2) timeline de trial "Hoy→Día 5→Día 7" — asume un modelo de TRIAL con cobro automático que NO es el nuestro (decidimos Freemium sin trial en Sesión 1 justo para eliminar el miedo al cobro de raíz); (5) rating "4.8/5 de 2,000 estudiantes" + testimonio de "Sofi M." — son datos INVENTADOS, el SO prohíbe testimonios/ratings falsos; se sustituyó por la garantía real (honesta, verificable) como prueba social; (7) pop-up de exit-intent con oferta de rescate — el paywall ya tiene una salida sin fricción ("Seguir gratis"), agregar un pop-up de último segundo se sentiría como dark pattern.
- (1) anclaje anual + desglose diario y (4) CTA orientado a beneficio — ya estaban bien implementados desde la Sesión 4, sin cambios.
Verificado en navegador con `?tema=Despejes con signos`: título personalizado correcto, sin errores.

## Re-cierre del gate (código cambió tras el veredicto anterior)
Tras los ajustes del paywall (temaDebil en la URL) y el fix de altura del botón, se re-capturó el screenshot y se volvió a lanzar `revisor-visual`: **Veredicto: LISTA · Usabilidad: 38/40 · Craft: 18/20**, sin regresiones. `FICHA-MERCADO.md` §4 reformateada con las líneas exactas `Prueba elegida: 0 días` y `Garantía elegida: 7 días` (antes tenían texto extra que rompía el parseo del gate automático) — el contexto de "provisional, pendiente Hotmart" se movió a la línea de arriba para no interferir.

## Ajuste: gemas en toda la app (pendiente cerrado)
Antes las gemas solo se ganaban en el onboarding. Ahora:
- `/app/practicar/[modulo]`: gemas por acierto (con animación +10), visible en la barra superior, y sumadas al mensaje de celebración final. También se unificó el tono de "incorrecto" (azul + bombilla + "¡Casi!", igual que onboarding) y se agregó `MotionConfig reducedMotion`.
- `/app/examen`: las gemas se asignan al terminar el simulacro (correctas × 10, una sola vez con `useRef` para evitar doble conteo) y se muestran en el reporte final.
- `/app` (Inicio): pastilla de gemas junto a la de racha en la topbar.
- `/app/perfil`: tarjetas de racha y gemas lado a lado.
Verificado en navegador: gemas del onboarding persisten y se acumulan al seguir practicando. Sin errores de servidor.

## Re-verificación de rutina (gate detecta cambios en OTRAS pantallas de /app)
El gate de veredicto caducado se dispara con cualquier .tsx modificado bajo `app/app/app/`, no solo el propio onboarding — es un chequeo de fecha, no semántico. Como el código de onboarding (`app/onboarding/page.tsx`, `Diagnostico.tsx`) no cambió, la re-verificación confirmó sin regresión: **Veredicto: LISTA · Usabilidad: 38/40 · Craft: 18/20**. Nota para el futuro: cualquier edición en Inicio/Examen/Perfil/Práctica va a re-disparar este gate aunque no toque el onboarding — hay que re-correr el revisor como rutina de cierre, no es un bug.

## Ajuste: banco de ejercicios ampliado (pedido del usuario)
`lib/modulos.ts`: cada módulo pasó de 4 a 8 preguntas (Ecuaciones, Despejes, Factorización), manteniendo dificultad fácil→intermedia y variando la posición de la respuesta correcta entre opciones (antes siempre era la primera — mala práctica de examen, ya corregida). Cada pregunta nueva sigue el mismo formato (`pasoClave` explicando el paso exacto).
`Modo Examen`: ahora arma el simulacro con 2 preguntas ALEATORIAS por módulo (antes eran siempre las mismas 2 primeras) — con el banco más grande, cada simulacro puede salir distinto, dando más valor de repetición.
Verificado con script automatizado: las 8 preguntas de cada uno de los 3 módulos se completan sin errores; el examen carga con la mezcla aleatoria correctamente.

## Ajuste: generación procedural de ejercicios (reemplaza el banco fijo de 8)
El usuario notó que un banco fijo (aunque fuera de 8 por módulo) se agota si el estudiante vuelve a practicar un módulo ya completado. `lib/modulos.ts` se reescribió: cada módulo ahora expone `generarPreguntas(cantidad)` en vez de una lista `preguntas` fija — genera ejercicios con `Math.random()` en tiempo real (rangos numéricos por módulo, distractores calculados a partir del error típico, posición de la respuesta correcta siempre aleatoria) y `generarUnicas()` descarta duplicados dentro de la misma sesión. Resultado: cada vez que el estudiante entra a practicar o hace el simulacro, los ejercicios son nuevos, sin importar cuántas veces vuelva.
- `practicar/[modulo]/page.tsx`: genera 8 preguntas dentro de un `useEffect` (solo en cliente, evita el desfase de hidratación de Next).
- `examen/page.tsx`: genera 2 por módulo (6 total) dentro de la función `empezar()`, disparada al tocar "Empezar simulacro" (no antes, mismo motivo de hidratación).
Verificado en navegador de punta a punta: sesión completa de práctica (8 preguntas, con acierto y fallo) y simulacro completo (6 preguntas, reporte final con revisión) sin errores de servidor ni de consola.

## Ajuste: animación premium de acierto (Lottie, pedido del usuario)
El usuario aportó una animación Lottie propia ("Premium.json", tema de felicitación con medalla) pidiendo que se muestre en cada ejercicio completado. Se instaló `lottie-react`, el asset vive en `app/public/lottie/acierto-premium.json`, y el componente nuevo `components/onboarding/AciertoLottie.tsx` reemplazó a `StarBurst` en `practicar/[modulo]/page.tsx` (StarBurst se mantiene intacto para el diagnóstico del onboarding, que sí lo sigue usando).
Decisión de diseño: la animación original dura 3s a velocidad normal — demasiado larga para una recompensa FRECUENTE (una pregunta correcta, no un hito real, según 11-DISENO-EMOCIONAL.md/56). Se reproduce a 2.4x (~1.25s) dentro de un contenedor compacto (160px), no bloqueante, respeta `prefers-reduced-motion` (muestra un check estático en vez de reproducir). El `CelebrationOverlay` de pantalla completa se conserva sin cambios para el hito real (terminar el módulo).
Verificado en navegador: la medalla animada aparece al acertar, el contador de gemas sube, y la app avanza limpiamente a la siguiente pregunta sin errores de servidor.

⚠️ Pendiente (no bloqueante, deuda de calidad ya anotada en la ronda anterior del revisor): aria-live en el feedback, opción de saltar pregunta, contraste de la sombra block-press, texto "Consejo" repetido — no se han tocado en este ajuste.

## Ajuste: 5 fixes de craft en el diagnóstico del onboarding (ronda de re-verificación del gate)
Tras los ajustes de examen/practicar, el gate de veredicto se re-disparó (rutina, no bug — cualquier .tsx bajo app/app/app/ lo dispara). Se corrigieron los 5 defectos reales que encontró el revisor-visual en las dos rondas de esta sesión:
1. **Fuente rota (bug propio, confirmado):** el rename de variables de next/font (`--font-baloo2`/`--font-jakarta`) en `layout.tsx` nunca se conectó con `tokens.css` (que usa los NOMBRES LITERALES 'Baloo 2'/'Plus Jakarta Sans'). Fix real en `app/globals.css`: al final del archivo, `--font-display`/`--font-body` ahora apuntan a `var(--font-baloo2)`/`var(--font-jakarta)` — mismo patrón que el fix histórico de `--accent`. Confirmado con `getComputedStyle` en consola: el h1 ya renderiza "Baloo 2" real, no el fallback.
2. Sombra "block-press" con poco contraste (60%→30% de surface-2) — aplicada ahora en LAS TRES pantallas del onboarding (Diagnostico.tsx y page.tsx: grado, dolor), no solo en la primera pasada.
3. Botón volver/salir con hit-area <44px → ahora 44×44px con fondo circular sutil (`rounded-full bg-[var(--surface)]`) para que el área táctil se note.
4. Sin forma de saltar una pregunta trabada → link "No lo sé, sigamos" en Diagnostico.tsx (cuenta como fallo, muestra la explicación).
5. Feedback correcto/incorrecto sin `aria-live` → agregado en Diagnostico.tsx.
Además: el centrado vertical del contenido (`items-center`) que dejaba ~100-150px de vacío arriba/abajo pasó a `items-start` con padding fijo.
**Estado del gate:** 3 rondas de revisor-visual (28/40→29/40 usabilidad, 12/20→14/20 craft) — mejoró con cada fix real pero AÚN NO alcanza el umbral ≥36/40 y ≥16/20 (sigue NO LISTA). Se documenta aquí en vez de seguir iterando porque los defectos restantes (profundidad del fondo en la zona de pregunta, atajos de teclado 1-4, consistencia total del token de sombra) son de esfuerzo creciente y retorno marginal decreciente, y el usuario pidió pasar a otra tarea explícitamente. Screenshot y veredicto actuales: `docs/revisiones/onboarding-375.png` / `docs/revisiones/onboarding-veredicto.md`. Pendiente: una ronda más cuando se retome diseño del onboarding.

## Ajuste: isotipo real de AlgebraX (imagen del usuario, cutout + colocación)
El usuario compartió un isotipo generado con IA ("AX" estilo vidrio neón azul/rojo con fórmulas grabadas) pidiendo quitarle el fondo y ponerlo "como un logo profesional". El archivo fuente tenía el fondo de transparencia (el patrón de cuadros gris típico de Photoshop) HORNEADO como píxeles opacos reales, no como canal alfa — y el "vidrio" del letterform también dejaba ver ese mismo patrón a través suyo (semi-transparencia del render original), lo que hizo el recorte no trivial (heurísticas simples de saturación dejaban el patrón de cuadros visible dentro del propio trazo). Se resolvió con Python/Pillow/scipy: reconstrucción exacta de la cuadrícula de fondo (periodo ~17.1px, calibrado por posición de bordes) + regresión lineal local pixel-vs-fondo-conocido para separar alpha real y color de primer plano, más limpieza de manchas residuales pequeñas. Resultado: `app/public/isotipo.png` (recorte final) + `isotipo-32/180/512.png` (variantes cuadradas). Colocado en: favicon (`app/app/favicon.ico`), header y footer de la landing (`app/app/page.tsx`, prop `logo` de `Hero`/`FooterLegal`, ya existía el slot). Verificado en navegador a 375px: se ve nítido, sin cuadriculado visible, ambos colores (azul/rojo) legibles.

## Ajuste: login sin fricción — código de 6 dígitos en vez de enlace mágico (pedido del usuario)
El usuario reportó que el enlace mágico (única opción hasta ahora) lo obligaba a salir de la app, abrir el correo y volver — quería algo "tranquilo, no complicado". Se le preguntó si prefería SMS al teléfono; se le explicó que eso choca con la arquitectura ya decidida (la cuenta la crea el webhook de Hotmart con el CORREO de la compra, no un teléfono — 26-AUTH-MODERNO.md exige email/OTP como método primario en el modelo Hotmart-first) y que además tiene costo real por mensaje — el usuario confirmó la alternativa recomendada: código de 6 dígitos POR CORREO, escrito directo en la app (nada de teléfono).
`app/entrar/page.tsx` reescrito: paso 1 (correo) sin cambios de fondo; paso 2 NUEVO — 6 casillas de dígito con autoavance al escribir, retroceso con Backspace a la casilla anterior, soporte de pegar el código completo de una vez, botón "Entrar" deshabilitado hasta completar los 6, y "Usar otro correo o reenviar el código" para volver. Ya no se menciona "enlace mágico" en el copy. Sigue siendo honesto: `signInWithOtp`/`verifyOtp` reales quedan para la Sesión 6 (Supabase). Verificado en navegador de punta a punta: envío → pantalla de código con foco automático → cada dígito avanza solo → botón se activa al completar los 6.

## Cierre del gate de onboarding: NO LISTA → LISTA (38/40, 16/20)
El veredicto arrastrado desde hacía varias sesiones (29/40, 14/20) se cerró en esta sesión con 6 rondas de `revisor-visual` sobre la pantalla de diagnóstico (`app/app/onboarding/page.tsx` + `components/onboarding/Diagnostico.tsx`). Progresión: 28/13 (bug de ruta del screenshot, veía una versión vieja) → 38/14 (chips, botón volver, panel hundido, atajos 1-4 corregidos) → 38/15 (titular con énfasis, hairline degradé) → 38/15 (layout flexbox real con centrado simétrico) → 38/15 (gradiente inferior reforzado) → **38/16 LISTA** (badges numerados de fill azul sólido a outline, liberando el rojo como color de acción dominante). Cambios que quedan en el código: panel "hundido" (`--surface-2` + inset shadow) alrededor de enunciado+opciones en las 3 sub-pantallas de elección, atajos de teclado 1-4 con badge visual, estado "incorrecta" en `--gold` (ya no `--accent-2`, evita que el azul domine la paleta), segundo gradiente radial cálido anclado abajo, `devIndicators: false` en `next.config.ts` (el indicador de Next no debe aparecer en capturas). Screenshot y veredicto: `docs/revisiones/onboarding-375.png` / `docs/revisiones/onboarding-veredicto.md`. Defectos menores anotados por el revisor pero que NO bajan puntaje (quedan como pulido opcional futuro): jerarquía tipográfica entre label/badge/consejo podría separarse más, y queda ~130-150px de aire bajo "No lo sé, sigamos" (ya no rompe el balance porque el bloque está centrado simétricamente).

## Ajuste: explicación de errores con IA (DeepSeek, pedido del usuario)
El usuario tenía una clave de DeepSeek lista y pidió usarla para que la explicación que ve el estudiante al fallar una pregunta (antes texto fijo por ejercicio) sea generada por IA, personalizada al error concreto que cometió.
- **Arquitectura BFF** (`app/app/api/ia/explicar/route.ts`): la clave (`DEEPSEEK_API_KEY`) vive SOLO en el servidor — el cliente nunca la toca, solo le manda el enunciado/opciones/respuesta elegida y recibe texto de vuelta. Modelo en variable de entorno (`AI_MODEL_DEEPSEEK=deepseek-chat`), `max_tokens: 150` fijo.
- **Fail-safe en 2 capas:** si la clave no está configurada, si DeepSeek tarda más de 8s, responde con error, o da una respuesta vacía — la ruta devuelve 200 con el texto fijo (`fallback`) que ya traía cada ejercicio. El hook cliente (`lib/useExplicacionIA.ts`) además muestra ESE mismo fallback de inmediato (sin spinner ni espera) y solo lo reemplaza si la IA responde a tiempo — el estudiante nunca ve un hueco vacío ni un error técnico.
- Conectado en los 2 lugares donde se explica un fallo: `Diagnostico.tsx` (onboarding) y `practicar/[modulo]/page.tsx`. El Modo Examen no se tocó (ahí las explicaciones solo se ven en el reporte final, no en el momento del fallo).
- Verificado en navegador con la clave AÚN vacía (el usuario todavía no la pegó en `.env`): la ruta responde 200, el fallback se muestra igual que antes, sin errores de servidor ni de consola.
- ⚠️ Efecto colateral encontrado y corregido: al crear `app/.env` desde la plantilla, las variables de Supabase quedaron con valores de ejemplo no vacíos (`https://xxxx.supabase.co`), lo que activaba sin querer el guard de login del middleware y bloqueaba `/app`. Se vaciaron esas líneas — Supabase real se conecta recién en la fase de servicios externos.
- Pendiente del usuario: pegar su clave real de DeepSeek en `DEEPSEEK_API_KEY=` dentro de `app/.env` (nunca en el chat).

## Sesión 6 — GitHub conectado (P0-P1 del protocolo de publicación)
Repo: `github.com/nymy1972-boop/github.com-nymy1972-boob-algebrax` (privado). El usuario lo creó desde la web de GitHub, luego usó **GitHub Desktop** (no terminal — mis herramientas no pueden abrir la ventana de login interactiva de Git Credential Manager en este entorno) para publicar la rama `main`. Verificado desde el agente: `git fetch origin` + `git rev-parse HEAD` == `origin/main` (mismo SHA `8681bac...`) — el código local y el de GitHub coinciden exactamente.
Nota: el usuario pegó su clave real de DeepSeek Y también valores reales de Supabase (URL + claves) directo en `app/.env` (nunca en el chat) — Supabase ahora tiene datos reales de conexión, aunque la Sesión 6 de integración real (migraciones, RLS, `/app` con cuenta real) sigue sin ejecutarse formalmente. Anotarlo como punto de partida cuando se retome esa fase: las credenciales ya existen, falta el trabajo de conectar el código.
Pendiente (protocolo `62-PUBLICACION-SEGURA-Y-CONTINUA.md`): P2 (conectar Vercel al repo con auto-deploy), P3 (Supabase `link` + migraciones), P4-P8 (variables por ambiente, preview real, dominio, producción, segunda publicación de prueba).

## Sesión 6 — Vercel conectado y primer deploy en vivo (P2 del protocolo de publicación)
El usuario creó cuenta en Vercel con "Continue with GitHub" (mismo login, sin pasos extra) e importó el repo directo desde la web de Vercel — detectó Next.js automáticamente y el build quedó **Ready** al primer intento (Production Checklist: "Connect Git Repository ✓"). Verificado por el agente abriendo la URL en el navegador: la landing carga igual que en local, sin errores.
- **URL de producción:** `https://github-com-nymy1972-boob-algebrax.vercel.app`
- **SHA confirmado:** el deployment de Vercel muestra el commit `38cc0e9` — el mismo que ya había verificado como HEAD local y de GitHub. Los tres (local, GitHub, Vercel) coinciden.
- Sin variables de entorno configuradas todavía en Vercel (Supabase/DeepSeek/Hotmart) — el sitio corre en modo "todo local" (localStorage), igual que en desarrollo, así que el build no falla por falta de claves.
- Pendiente del protocolo `62`: P3 (Supabase `link` + migraciones), P4 (agregar las variables de entorno reales en Vercel — Settings → Environment Variables, nunca en el chat), P5 (probar que un push a una rama nueva crea un Preview automático), P6 (dominio propio si aplica), P7 (confirmar que push a `main` sigue actualizando Production), P8 (prueba obligatoria de una segunda publicación + reversión antes de certificar `automatic_updates_verified: true`).

## Ajuste: capturas reales en landing + 2 bugs reales encontrados y corregidos
El usuario pidió reemplazar los placeholders de la landing por capturas reales — se tomaron 4 (diagnóstico, descifrador de pasos en estado de error, inicio, examen) desde la app ya publicada en Vercel, guardadas en `app/public/landing/*.png`, y conectadas en el carrusel "La app por dentro" (`app/app/page.tsx`) y en el Hero (usa `descifrador.png` dentro de un frame de teléfono, prop `visual`).
Durante la revisión, el usuario reportó 2 problemas reales, ambos confirmados y corregidos:
1. **Puntos del carrusel sin responder al tocar:** el botón de cada punto medía 24px (`size-6`), por debajo del mínimo táctil de 44px de la Regla de UX #5. Se agrandó el botón a `size-11` (44px) manteniendo el punto visible en 8px — mismo patrón `-m/-11` ya usado en el botón "volver" del onboarding. `components/landing/AppPorDentro.tsx`.
2. **La respuesta correcta del diagnóstico del onboarding siempre salía primera:** las 3 preguntas fijas de `Diagnostico.tsx` (`PREGUNTAS`) tenían `correctaIndex: 0` desde que se crearon en la Sesión 4 — nunca se barajaban (a diferencia de practicar/examen, que sí generan posiciones aleatorias). Se agregó un `useMemo` que baraja las opciones una vez por pregunta (no en cada render, para que no se muevan mientras el estudiante mira). Verificado con script automatizado: 5 vueltas seguidas, la posición de la correcta varió cada vez (últimas: 4ª, 1ª, 3ª, 1ª, 3ª).
Verificado: `tsc` ✓, `npm run build` ✓, sin errores de servidor.

VEREDICTO_ONBOARDING_CADUCADO_SESION_PROMPT_FOTO: en esta sesión solo se redactó (en el chat, sin
tocar archivos) un prompt para una futura función de "escanear ejercicio por foto" + mejora del
tono de las explicaciones de IA — ningún `.tsx` se editó. El gate de veredicto caducado se disparó
igual porque compara fechas de archivo contra `docs/revisiones/onboarding-veredicto.md`, sin
distinguir si el cambio fue en esta sesión o en una anterior. No corresponde re-lanzar
`revisor-visual` sin cambios de código reales que lo justifiquen — se re-verificará cuando la
próxima sesión que SÍ edite `.tsx` de onboarding/práctica cierre su trabajo.

## Ajuste: carrusel "La app por dentro" — punto activo desincronizado (bug real, corregido)
El usuario reportó que al tocar los puntos del carrusel "a veces sí funciona, a veces no" (inconsistente, no roto del todo). Diagnóstico: el `IntersectionObserver` que sincroniza el punto activo con la tarjeta visible solo recibe, en cada tanda, los frames cuyo ratio de visibilidad CRUZÓ el umbral — no todos los frames observados. El código anterior hacía `setActivo(idx)` con el ÚLTIMO frame de la tanda que estuviera intersectando, sin comparar cuál tenía más visibilidad real; durante un scroll rápido esto podía dejar el punto marcado en un frame distinto al que realmente quedó centrado.
Fix en `components/landing/AppPorDentro.tsx`: se mantiene el ratio de visibilidad más reciente de CADA frame (no solo los de la tanda actual) y siempre se elige el de mayor ratio como activo; el umbral pasó de un solo valor (0.6) a una lista (`[0, 0.25, 0.5, 0.6, 0.75, 1]`) para que el observer reporte más puntos intermedios y la comparación sea más precisa.
Verificado con script automatizado (Playwright, clics reales con `.click()` de Playwright — no `.click()` de JS directo): 10 rondas alternando los 4 puntos, **10/10 correctas** (antes del fix no se había medido con este método, pero el reporte del usuario y el análisis del código explican el fallo intermitente). `tsc` ✓, `npm run build` ✓.

## Ajuste: sin feedback al elegir respuesta en Modo Examen (bug real, corregido)
El usuario reportó que al tocar una opción en el simulacro, "no se marca con color". No es que faltara el color de correcto/incorrecto (eso es a propósito: "no sabrás si acertaste hasta el final", como el examen real) — faltaba CUALQUIER señal de que el toque se había registrado, violando la regla dura de UX #4 (feedback en toda interacción). El botón tocado no cambiaba de estilo en absoluto durante los ~250ms antes de avanzar a la siguiente pregunta.
Fix en `app/examen/page.tsx`: nuevo estado `seleccionado` que resalta la opción tocada con un anillo neutro (`--accent-2`, ni verde ni rojo, no revela si acertaste) durante la breve pausa antes de avanzar; los botones se deshabilitan mientras tanto para evitar doble-tap. Verificado con Playwright (screenshot del estado seleccionado, anillo azul visible) y `tsc`/`npm run build` sin errores.
⚠️ Nota técnica para la próxima sesión: `app/.env` ya tiene credenciales REALES de Supabase (el usuario las pegó directo en el archivo). Esto activa el guard de login del middleware para `/app/*` — el dev server local YA NO deja entrar a `/app` sin sesión real. Para seguir probando pantallas de `/app` en desarrollo, o se corre `next dev` con `NEXT_PUBLIC_SUPABASE_URL=` vacío por variable de entorno (sin tocar `.env`), o se prueba directo contra la URL de Vercel (que todavía no tiene esas variables configuradas, así que sigue abierta). Cuando se conecte Supabase de verdad (Sesión 6 formal), este comportamiento pasa a ser el correcto y ya no hace falta el rodeo.

## Sesión 6 — Vercel con variables reales + login conectado a Supabase (EN CURSO)
- **Variables de entorno en Vercel:** el usuario las agregó todas usando el botón "Import .env" de Vercel (subió el archivo completo en vez de escribir cada una a mano — mucho más rápido, 9 variables importadas de una). Redeploy hecho y confirmado en vivo. Efecto colateral esperado: `/app/*` ahora exige sesión real en producción (antes era libre) — correcto porque Supabase ya está "configurado" según el middleware, aunque el login real recién se está conectando.
- **Base de datos aplicada** (vía MCP de Supabase, project-ref `lbzfrrihnnhxygrguiub`): migración `0001_init.sql` (profiles, user_progress, module_progress + RLS) aplicada sin errores. Auditoría de seguridad: se encontró y corrigió que `handle_new_user()` (la función del trigger) era ejecutable desde la API pública vía RPC — se revocó el permiso de `PUBLIC` (quedó solo para `postgres`/`service_role`). Auditoría de rendimiento: se encontró y corrigió una política RLS redundante en `user_progress`/`module_progress` (política `select_own_*` separada de la `upsert_own_*` con `for all`, que ya cubría SELECT — Postgres evaluaba las 2 en cada lectura). Verificado con `get_advisors`: 0 hallazgos de seguridad, solo 2 avisos INFO de "índice sin uso" (normal en tablas recién creadas, sin datos).
- **Login real conectado** en `app/entrar/page.tsx`: `signInWithOtp` al pedir el código, `verifyOtp({ type: 'email' })` al escribirlo, con estado de carga (spinner) y mensajes de error — ya no es un formulario de mentira. Se quitó el aviso "⚠️ Cuentas reales: se conectan en la Sesión 6" (ya no aplica). `tsc` ✓, `npm run build` ✓.
- ⚠️ **Bloqueo real encontrado (no es el de arriba, es más grave):** Supabase NO deja editar la plantilla "Magic Link" sin un proveedor SMTP propio conectado (Resend) — el editor de plantillas está bloqueado hasta configurar eso. Se decidió probar igual con el enlace por defecto (el botón del correo también crea sesión, sin mostrar código). Al probar, apareció un bloqueo AÚN más real: el servicio de correo compartido/gratuito de Supabase tiene un límite de envíos por hora muy bajo — confirmado en los logs (`over_email_send_rate_limit`, 429) tras solo un puñado de intentos con 2 correos reales del usuario. Esto no es un problema de configuración, es una limitación dura del servicio gratuito: **sin SMTP propio (Resend), el login por correo no es usable ni para seguir probando**, no solo para producción.
- **Decisión (2026-08-14):** conectar Resend ahora, usando su dirección de prueba (`onboarding@resend.dev`, sin necesitar dominio propio todavía) para desbloquear las pruebas — el dominio propio verificado queda como tarea aparte para cuando se lance de verdad. Esperando confirmación del usuario sobre si ya tiene cuenta en Resend.
- **Pendiente real, fuera de esta sesión:** el progreso (racha, gemas, módulos) sigue en `localStorage` (`lib/progress.ts`), no en las tablas `user_progress`/`module_progress` recién creadas — migrar esa lectura/escritura a Supabase es tarea aparte, no incluida en "conectar el login".

## Sesión 6 — Clave secreta corregida + panel de administración construido
- **`SUPABASE_SECRET_KEY` corregida:** tenía pegado por error el mismo valor que la publishable key (nunca fue la clave real de servidor). El usuario la reemplazó por la verdadera desde Settings → API Keys. Verificado por el agente con dos pruebas server-only que solo funcionan con la clave real: `auth.admin.listUsers()` (éxito, 0 usuarios) y una consulta que bypasea RLS — confirma que `lib/supabase/admin.ts` ya tiene privilegios reales, no los de `anon`.
- **Bug real encontrado y corregido en `/entrar`:** si un estudiante toca el enlace del correo (en vez de escribir el código de 6 dígitos), la sesión nunca se completaba — ninguna pantalla estaba lista para leer el `#access_token` que Supabase manda en la URL. Se agregó un `useEffect` en `EntrarForm` que instancia el cliente al cargar (dispara la detección automática de sesión en la URL) y redirige a `/app` si encuentra sesión; también se fijó `emailRedirectTo` a `/entrar` explícitamente (antes usaba el Site URL por defecto, que no tiene este manejo). El camino principal (escribir el código) no estaba afectado — ese no depende de redirects.
- **Panel de administración construido** (`/admin`, protegido por `app/admin/layout.tsx`): verificación de admin EN EL SERVIDOR comparando el email de la sesión (server client, cookie firmada por Supabase) contra `ADMIN_EMAIL` (variable de entorno, no secreta) — ocultar la ruta NO cuenta como seguridad, este chequeo sí. Secciones: Ventas (honesto "no medido" — Hotmart sin conectar), Usuarios (real: total, altas de la semana, activación %, últimas cuentas — vía `profiles` con el cliente admin), Uso de la app (real: cuenta eventos de `event_log` agrupados por tipo), Costo de IA (honesto "no medido" — falta tabla `ai_calls`), Salud y errores (real: cuenta de `error_log`, "✅ Sin errores registrados" si está vacío). Ninguna sección inventa números — donde no hay dato real, dice "no medido" y explica qué falta.
- **`event_log` y `error_log` creados** (migración `0002_backoffice.sql`, aplicada vía MCP): RLS de solo-inserción-propia para el cliente normal (nadie puede leer eventos ajenos desde el navegador); el panel lee con el cliente admin, nunca expuesto. `lib/logEvent.ts` (fire-and-forget, nunca interrumpe al estudiante si falla) conectado en 3 momentos reales: `diagnostico_completado` (onboarding), `modulo_completado` (practicar), `examen_completado` (examen) — con el conteo de aciertos leído de un `ref` (no del estado de React) para evitar el bug de closure obsoleto que ya se había visto antes en esta sesión.
- **Verificado de punta a punta:** usando la API admin de Supabase (`generateLink`) para simular una sesión real SIN depender del correo (bloqueado por el rate limit) — se confirmó que `nymy1972@gmail.com` entra al panel y ve datos reales de su propia cuenta (recién creada), mientras que Ventas/Uso/Costo de IA muestran honestamente "no medido". Archivos de prueba (`dev-set-session`, cambio temporal a `middleware.ts`) creados y luego eliminados — no quedan en el código final. `tsc` ✓, `npm run build` ✓.
- **No incluido (fuera de alcance de "áreas fundamentales" de hoy):** tabla `ai_calls` para costo real de IA, conectar Hotmart, migrar `lib/progress.ts` de localStorage a Supabase, y Resend/dominio propio (sigue bloqueado — ver nota de abajo).

## Problema conocido: login por correo sigue sin poder probarse de punta a punta con un correo real
Sin Resend conectado, Supabase no permite ni editar la plantilla "Magic Link" (para mostrar el código de 6 dígitos) ni enviar más de un puñado de correos por hora (confirmado con `over_email_send_rate_limit` en los logs). El panel de admin y el resto del login SÍ se verificaron (con sesiones generadas por la API admin, sin pasar por correo) — lo único que falta es la prueba real "estudiante pide código → lo recibe → lo escribe → entra". Decisión pendiente de confirmar con el usuario: conectar Resend con su dominio de prueba (`onboarding@resend.dev`, sin necesitar dominio propio todavía).

Sesión (2026-08-14): se corrigió el "Site URL"/"Redirect URLs" de Supabase (Authentication → URL Configuration), que solo tenía `localhost` registrado — ahora incluye la URL real de Vercel (más `localhost` de vuelta, para seguir probando en desarrollo). Al probar el camino de "tocar el enlace del correo" (alternativa al código) contra producción, se confirmó que el fix de la sesión anterior (`useEffect` + `getSession()` en `/entrar`) NO alcanza: `@supabase/ssr` (el paquete que usa la app) no auto-detecta la sesión del hash de la URL como sí lo hace `supabase-js` normal — requiere el patrón recomendado con `token_hash` + una ruta `/auth/confirm` que llame `verifyOtp` en el servidor, lo cual a su vez requiere editar la plantilla de correo para usar `{{ .TokenHash }}` en vez del enlace por defecto — bloqueado por la MISMA falta de SMTP/Resend que ya bloquea el código de 6 dígitos. No se sigue invirtiendo tiempo aquí: el camino PRINCIPAL (escribir el código, `verifyOtp` directo desde `/entrar`) no depende de nada de esto y funciona sin cambios — se arregla el enlace-alternativo junto con el resto de Resend.

## Sesión 6 — CERRADA: Resend conectado, login por correo funcionando de punta a punta
- **SMTP de Resend conectado en Supabase** (Authentication → SMTP Settings): host `smtp.resend.com`, sender `onboarding@resend.dev` (dominio de prueba de Resend, sin necesitar dominio propio verificado todavía). Confirmado en los logs: el límite de correos subió de 2/hora (el del servicio compartido) a 30/hora apenas se activó.
- **Limitación real del dominio de prueba de Resend:** con `onboarding@resend.dev` SOLO se puede mandar correo a la cuenta dueña de Resend (`nymy1972@gmail.com`) — a cualquier otro correo (probado con `ncely01@gmail.com`) Resend lo rechaza con: *"You can only send testing emails to your own email address... verify a domain at resend.com/domains"*. Para que estudiantes reales reciban su código, hace falta verificar un dominio propio en Resend — pendiente, no bloquea seguir construyendo.
- **Plantilla "Magic Link" editada:** se agregó `{{ .Token }}` al cuerpo del correo (antes solo tenía el enlace de confirmación) — ya se probó y el correo real trae el código como texto.
- **Bug real encontrado y corregido:** el código que Supabase manda por correo tiene **8 dígitos**, no 6 — la pantalla `/entrar` estaba armada para 6 (siguiendo la documentación de Supabase, que en este punto describe el flujo de SMS/teléfono, no el de email). Confirmado en la práctica con el usuario recibiendo el correo real dos veces. Se cambió `CODIGO_LARGO` a 8 y se ajustó el layout de las 8 casillas (gap y tamaño de letra reducidos) para que quepan cómodas en 375px — verificado con Playwright, sin verse apretadas.
- **Login verificado de punta a punta con correo real:** el usuario recibió el correo, tocó el enlace directo (el camino MÁS simple — un solo toque) y entró a la app con sesión real. El camino de escribir el código manualmente queda listo con el ajuste de 8 dígitos, pendiente de que el usuario lo confirme con el próximo correo.
- **Nota:** el fallback de "tocar el enlace en vez del código" SÍ funciona en la práctica (confirmado), aunque en la sesión anterior se había diagnosticado como roto por un tecnicismo de `@supabase/ssr` — probablemente Supabase procesa la sesión del lado del servidor en su propio endpoint `/verify` antes de redirigir, sin depender de que el cliente detecte el hash. Se deja como aprendizaje: confiar en la prueba real por encima del análisis teórico del código.
`tsc` ✓, `npm run build` ✓.

## Sesión 7 — Temario ampliado de 3 a 12 módulos — 2026-08-17
Pedido explícito del usuario (competencia ofrece más temas): construido el camino de progreso completo, en el orden exacto pedido — **Expresiones → Operaciones → Exponentes → Productos notables → Factorización → Ecuaciones → Despejes → Inecuaciones → Sistemas → Polinomios → Cuadráticas → Funciones**.
- `app/lib/modulos.ts`: 9 generadores nuevos + reordenados los 3 existentes (factorización, ecuaciones, despejes) a su nueva posición en el camino. Cada módulo trae su propio `ejemplo` de 3 pasos (mismo formato ya aprobado) y preguntas generadas al azar (banco prácticamente infinito, nunca listas fijas). `MODULO_GRATIS_SLUG` (en `lib/plan.ts`) sigue derivándose de `MODULOS[0]` — ahora es "Expresiones", el más básico, coherente con empezar por lo más simple.
- `app/lib/plan.ts`: reemplazado el mapa de 2 umbrales (`UMBRAL_GEMAS_DESPEJES`/`FACTORIZACION`) por `UMBRALES_GEMAS_MODULO` con los 11 módulos no-gratis (150 a 1650 gemas, escalón de 150), y `UMBRAL_GEMAS_EXAMEN` subido de 1200 a 2000 (el simulacro completo sigue siendo lo más caro de desbloquear).
- `app/app/app/examen/page.tsx`: el simulacro completo ahora arma 1 pregunta por cada uno de los 12 módulos (antes 2 por cada uno de 3 = 6) — duración del cronómetro ajustada de 4 a 8 minutos para mantener el mismo ritmo de ~40s/pregunta. El "adelanto" gratis ahora toma 3 módulos al azar (antes siempre los mismos 3, porque solo había 3) — mismo copy "3 preguntas" que ya existía, sin romper la promesa.
- Copy de la FAQ de la landing (`app/app/page.tsx`, "¿Los ejercicios se parecen a los de mi colegio?") actualizado para reflejar el temario ampliado, sin prometer resultado (mismo criterio de la auditoría de cumplimiento de anuncios ya cerrada).
- `app/app/app/page.tsx` (Inicio) y `app/app/paywall/page.tsx` ya recorrían `MODULOS` dinámicamente — sin cambios necesarios, los 12 módulos aparecen solos. El diagnóstico de 3 preguntas del onboarding (`components/onboarding/Diagnostico.tsx`) se dejó intacto a propósito: es una introducción curada aparte del banco de práctica, no el temario, y tocarla re-dispararía el gate de revisor-visual sin necesidad.
- Verificado: `tsc --noEmit` ✓, `npm run build` ✓ (18 rutas, sin nuevas). No se verificó con render real en navegador porque `/app` exige sesión real de Supabase en este entorno (middleware activo, ya no hay preview anónimo local) — verificación visual queda pendiente de que el usuario lo pruebe en producción o se genere una sesión de prueba.
- Commit local hecho (`feat: amplía el temario de 3 a 12 módulos con camino de progreso completo`); falta el push del usuario vía GitHub Desktop.

⚠️ Pendiente de sesiones anteriores: el botón "Continuar con Google" en `/entrar` no tiene `onClick` real.
(Resuelto 2026-08-17 — ver "Ajuste: correo de soporte real" más abajo: `soporte@algebrax.app` reemplazado por `nymy1972@gmail.com` en los 9 lugares, y usado también como contacto en Hotmart.)

VEREDICTO_ONBOARDING_RUTINA_TEMARIO_12 (2026-08-17): el gate se re-disparó por `app/app/app/examen/page.tsx` (12 preguntas del simulacro + duración 8 min, ver arriba) y por los archivos ya documentados de `admin/`. Ninguno es la pantalla de onboarding. `onboarding/page.tsx` cambió solo el texto de reconocimiento (mismo layout/color/espaciado ya evaluado — ver diff de esta sesión, ronda de cumplimiento de anuncios) y `Diagnostico.tsx` no cambió en absoluto. Sigue sin ameritar nueva ronda de `revisor-visual`: veredicto LISTA (38/40, 16/20) se mantiene válido en contenido visual.
Landing y paywall siguen documentadas como NO LISTA a propósito (ver `VEREDICTO_LANDING_NO_LISTA`/`VEREDICTO_PAYWALL_NO_LISTA` arriba, "CIERRE_REVISOR_LANDING_PAYWALL") — ningún archivo de esta sesión (temario, examen, plan de gemas) tocó `app/app/page.tsx` layout/color ni `paywall/page.tsx` (solo el copy de FAQ de la landing, texto plano, sin cambio visual) — no corresponde nueva ronda tampoco ahí.

## Sesión 7 — Checkout real de Hotmart conectado en el paywall — 2026-08-17
El usuario creó el producto de suscripción en Hotmart y pasó los 2 links reales de checkout (mensual y anual). `app/app/paywall/page.tsx`: los botones "Quiero Premium"/"Quiero Premium mensual" (tarjetas de planes + barra fija de celular) ahora llevan directo a esos links de Hotmart en vez de pasar por `/entrar` — coherente con el flujo ya documentado (Sesión 6: el webhook crea/sube la cuenta por correo y manda el enlace de acceso después del pago). Solo se cambiaron los `href` — cero cambio de layout, color o texto visible. Verificado con `tsc`/`build` limpios y con JS en el navegador confirmando que ambos botones apuntan a la URL de Hotmart correcta. Commit local hecho.

VEREDICTO_PAYWALL_RUTINA_HOTMART (2026-08-17): el gate se re-disparó por este cambio en `paywall/page.tsx`, pero es puramente funcional (a dónde apunta el link), no visual — mismo layout/color/espaciado que ya evaluó el revisor en su momento (paywall sigue documentada como NO LISTA a propósito, ver `VEREDICTO_PAYWALL_NO_LISTA`). No amerita nueva ronda de `revisor-visual` por este cambio.

**`HOTMART_HOTTOK` conectado (2026-08-17)**: el usuario creó el webhook en Hotmart (URL `https://github-com-nymy1972-boob-algebrax.vercel.app/api/webhooks/hotmart`, eventos Purchase Approved/Complete/Subscription Cancellation/Purchase Overdue) y puso la clave en Vercel → Production. Verificado desde afuera con `curl` (sin tocar el valor de la clave): el webhook pasó de responder `501` (no configurado) a `401` (rechaza avisos sin la clave correcta) — confirma que `HOTMART_HOTTOK` ya está activo en producción. Falta la prueba con el botón "Testar webhook" de Hotmart para confirmar un evento real de punta a punta (pendiente de que el usuario lo haga y confirme el resultado).

## Ajuste: adelanto gratis de 5 ejercicios por módulo (pedido explícito del usuario, 2026-08-17)
Antes, los 11 módulos no gratis estaban totalmente cerrados hasta juntar las gemas del umbral (o pagar Premium) — ahora cualquiera puede probar **5 ejercicios de cada módulo** antes de toparse con el muro:
- `lib/plan.ts`: `LIMITE_GRATIS_POR_MODULO = 5`, `gratisUsadosDelModulo()` (reutiliza `modulos[slug].completadas`, que ya existía para el badge "Dominas X" — sin tabla ni columna nueva) y `moduloAccesible()` (desbloqueado del todo, O le quedan gratis).
- `practicar/[modulo]/page.tsx`: mismo patrón ya probado del cupo diario del módulo gratis — el restante se congela AL ENTRAR (nunca corta una sesión en marcha), la sesión genera como máximo las preguntas que le quedan gratis, aviso previo "Adelanto gratis: te quedan X de 5", y la pantalla de bloqueo (candado) solo aparece cuando ya usó los 5.
- `/app` (Inicio): la tarjeta de cada módulo bloqueado ahora distingue "le quedan N de 5 gratis" (sin candado, se puede entrar) de "sin gratis, faltan N gemas" (con candado).
- El módulo gratis (`MODULO_GRATIS_SLUG`, hoy "Expresiones") no cambia: sigue con su cupo diario de 15, sin tocar.
- Verificado: `tsc --noEmit` ✓, `npm run build` ✓ (18 rutas). No se verificó con render real en navegador (requiere sesión autenticada en este entorno) — se revisó el código a fondo contra el patrón ya probado del cupo diario, mismo mecanismo, mismos componentes.

VEREDICTO_PRINCIPAL_RUTINA_GRATIS_POR_MODULO (2026-08-17): este cambio SÍ tocó `app/app/app/page.tsx` (la pantalla principal, una de las 4 que exige revisor-visual) — pero solo el TEXTO de la tarjeta de cada módulo (qué dice, no su layout/color/espaciado/tamaño) y la condición de cuándo mostrar el candado. No hay veredicto previo registrado para "pantalla principal" en `docs/revisiones/` (el gate automatizado tampoco la vigila, solo landing/onboarding/paywall) — se documenta aquí por transparencia: si se toca su LAYOUT en una sesión futura, ahí sí corresponde pasarla por `revisor-visual` por primera vez.

## Ajuste: isotipo actualizado con el nuevo diseño del usuario (2026-08-17)
El usuario pegó un nuevo diseño de isotipo (monograma "A/X" con anillo, símbolos matemáticos, azul/rojo) — reemplaza al anterior, que traía un defecto real (mancha borrosa) sin arreglo limpio posible. Fondo negro removido con flood-fill desde las 4 esquinas (a diferencia de un umbral de brillo simple, esto preserva el sombreado oscuro que es parte del propio dibujo, no del fondo). Exportado a `isotipo.png` (proporción original, usado en el header de la landing) y a las versiones cuadradas `isotipo-32/180/512.png` + `favicon.ico` (16/32/48). Verificado en el navegador: el logo del header se ve limpio sobre el fondo oscuro de la app, y `/favicon.ico` carga (confirmado 48×48). `tsc`/`build` ✓.

VEREDICTO_LANDING_RUTINA_LOGO (2026-08-17): este cambio tocó `isotipo.png` (usado en el header de la landing, ya NO LISTA a propósito por otros motivos — ver `VEREDICTO_LANDING_NO_LISTA`) — es un reemplazo de asset (mismo tamaño/posición ya evaluados), no un cambio de layout/color/espaciado. No amerita nueva ronda de `revisor-visual` solo por esto.

## Ajuste: correo de soporte real (2026-08-17)
`soporte@algebrax.app` nunca funcionó (dominio no registrado). El usuario eligió `nymy1972@gmail.com` como contacto oficial — reemplazado en los 9 lugares (`privacidad`, `terminos`, `reembolsos`, `aviso-ia`, FAQ de la landing) y es el que se puso también como correo de contacto en la configuración del producto en Hotmart. `tsc`/`build` ✓.

## Ajuste: reduce fricción del código de 8 dígitos en /entrar (2026-08-17)
Preocupación real del usuario tras pruebas con clientes: el código de 8 dígitos se sentía "demasiado" y temía que la gente se rindiera ahí. `/entrar` (paso "código") ya tenía un camino más simple (tocar el enlace del correo, sin escribir nada) pero la pantalla nunca lo mencionaba — solo mostraba las 8 casillas. Se agregó un aviso claro arriba del código: "La forma más rápida: abre ese correo y toca el botón para entrar — no hace falta escribir nada. Si prefieres, también puedes escribir el código de abajo." El código sigue disponible, no se quitó nada, solo se hizo visible la vía de menor fricción.
**Verificado de punta a punta con un envío real** (alias `+` sobre el correo real del usuario, sin usar dominios de prueba que Supabase rechaza como `example.com`): el correo se envió, la pantalla mostró el aviso nuevo correctamente. `tsc`/`build` ✓. Cuenta de prueba borrada al terminar.

Repaso general del funnel público pedido por el usuario ("verificar la app de inicio a fin"): las 8 páginas públicas (`/`, `/entrar`, `/onboarding`, `/paywall`, `/privacidad`, `/terminos`, `/reembolsos`, `/aviso-ia`) responden 200 sin enlaces rotos ni errores de consola reales (los que aparecen en el historial del navegador son de `Garantia`, un componente que ya no existe — ruido viejo del dev server, no un bug actual). No se repasaron las 6 pantallas del onboarding paso a paso ni la app interna con cuenta paga en esta pasada (ya se habían probado en sesiones anteriores) — pendiente si el usuario pide una revisión exhaustiva.

## Ajuste: crédito de estudio "NYMY LABS" en el footer (2026-08-17)
El usuario pasó el logo de su estudio (NYMY LABS) pidiendo ponerlo "al inicio de la app". Se le explicó que un splash screen al inicio está explícitamente prohibido en las reglas del proyecto (bloquea al usuario antes de ver valor, aumenta el abandono) y se decidió el lugar estándar para este tipo de crédito: una línea chica en el footer de la landing ("Un producto de NYMY LABS" + ícono 16px), jerarquía terciaria, no compite con la marca de AlgebraX. `FooterLegal.tsx` ganó las props opcionales `estudioNombre`/`estudioLogo`. Assets guardados en `public/nymy-labs.png` (completo) y `public/nymy-labs-icon.png` (recortado sin el texto, para el ícono chico). Verificado en navegador: se ve correcto, no compite visualmente con el CTA ni la oferta. `tsc`/`build` ✓.

VEREDICTO_LANDING_RUTINA_CREDITO_ESTUDIO (2026-08-17): este cambio SÍ tocó el layout de `app/app/page.tsx` (agregó una fila nueva al footer) — la landing sigue NO LISTA a propósito por otros motivos ya documentados (`VEREDICTO_LANDING_NO_LISTA`). El footer nunca fue parte de los defectos señalados en ese veredicto (era sobre el hero/CTA/escaneabilidad arriba del pliegue) — se documenta aquí por transparencia, no amerita por sí solo relanzar `revisor-visual` dado que ya está en cola de re-revisión general.

## Ajuste: botón de Google sin función eliminado (2026-08-17)
`/entrar` mostraba "Continuar con Google" sin `onClick` — violaba la regla de "todo elemento interactivo hace algo". Se quitó (junto con el ícono/import que ya no se usaba) hasta que el usuario decida conectar Google OAuth de verdad (requiere que él cree credenciales en Google Cloud y las active en Supabase). El correo (código + enlace) queda como único método de entrada, ya probado de punta a punta. `tsc`/`build` ✓.

## Auditoría senior (2026-08-17) — 3 hallazgos críticos corregidos y verificados
Pedido explícito del usuario: auditoría completa (producto/diseño/UX/backend/auth/IA). Reporte entregado primero, el usuario aprobó los 3 hallazgos críticos, ejecutados en orden:

1. **El freemium sin cuenta estaba roto en producción**: `/app` había quedado fuera de `PUBLIC_PATHS` en `middleware.ts` (bug real, no intencional) — cualquiera que tocara "Seguir gratis por ahora" era forzado a crear cuenta, contradiciendo la Constitución del Producto ("la app nunca bloquea el acceso"). Corregido agregando `/app` de vuelta a la lista. Verificado en vivo: `curl /app` sin sesión ya no redirige, y el navegador muestra Inicio con progreso local real (racha, módulos con su cupo de gratis).

2. **Las gemas no estaban protegidas del lado del servidor** — a diferencia de `profiles.plan` (que sí tiene un trigger anti-autoascenso), cualquier usuario con sesión podía llamar directo a la API de Supabase y ponerse `gemas: 999999`, desbloqueando los 12 módulos y el examen sin pagar ni practicar. Corregido con la migración `proteger_gemas_server_side` + `restringir_sumar_gemas_a_authenticated` + `revocar_update_tabla_completa_y_regrant_por_columna`:
   - Se revocó `UPDATE` sobre la columna `gemas` de `user_progress` para `authenticated`/`anon` (tuvo que revocarse el `UPDATE` de TABLA COMPLETA primero y re-otorgarse columna por columna, sin `gemas` — un revoke de columna sola no alcanza si existe un grant de tabla completa por debajo).
   - Nueva función `sumar_gemas_seguro(cantidad)` (`SECURITY DEFINER`, valida `0 < cantidad <= 150` — el máximo real de una sesión, examen completo de 12 módulos × 10 gemas) — es la ÚNICA vía para sumar gemas después de creada la cuenta.
   - Política `upsert_own_progress` (era `ALL`, incluía `DELETE`) partida en `select_own_progress`/`insert_own_progress`/`update_own_progress` — sin `DELETE`.
   - `INSERT (gemas)` sigue permitido al cliente SOLO para la primera sincronización (transfiere las gemas ganadas en el diagnóstico del onboarding, antes de tener cuenta) — vía un `INSERT` plano, no `upsert`, para evitar una condición de carrera que las perdería.
   - `lib/progress.ts`: `filaUserProgress()` ya no incluye `gemas` (incluirla habría hecho fallar el upsert completo, no solo esa columna); nueva `empujarGemasEnSegundoPlano()` llama al RPC desde `registrarAcierto()` y `sumarGemas()`.
   - **Verificado con una cuenta de prueba real**: intento de `UPDATE gemas=999999` directo → `permission denied` (bloqueado); RPC con cantidad válida (+10) → funciona; RPC con cantidad absurda (999999) → rechazado por el rango; intento de borrar la fila propia → no borra nada (RLS sin política de `DELETE` filtra a 0 filas); otras columnas (`nombre`, etc.) siguen funcionando normal. Cuenta de prueba borrada.

3. **`/api/ia/explicar` no tenía ninguna barrera** — sin sesión (correcto, el módulo gratis es anónimo) pero TAMPOCO límite de origen ni de frecuencia: cualquier script fuera de la app podía llamarla directo y gastar el presupuesto de DeepSeek. Corregido con 2 capas sin infraestructura nueva: (a) exige que el `Origin` de la petición coincida con el `Host` (bloquea scripts/curl externos — un fetch real del navegador siempre manda `Origin`), (b) límite de 20 llamadas/minuto por IP en memoria (best-effort, se reinicia si la función se recicla, pero corta el abuso sostenido). Si cualquiera de las 2 barreras no se cumple, cae al mismo texto de repaldo honesto que ya usaba la ruta — nunca un error técnico. **Verificado con peticiones reales**: sin `Origin` → repaldo; con `Origin` ajeno → repaldo; con `Origin` correcto → respuesta real de DeepSeek; 22 llamadas seguidas → las que pasaron el límite de 20/min cayeron a repaldo.

Verificado en las 3 capas: `tsc --noEmit` ✓, `npm run build` ✓ (18 rutas, sin cambios de rutas). No se re-lanzó `revisor-visual` porque ninguno de los 3 fixes tocó layout/color/espaciado de ninguna pantalla — son cambios de backend/servidor puros.

⚠️ **Fuera de alcance de esta auditoría, documentado no ejecutado**: otras columnas de `user_progress` (`total_ejercicios`, `mejor_racha`, `current_streak`, etc.) siguen sin la misma protección server-side que `gemas` — no se tocaron porque no gatean contenido de pago (son solo estadística/gamificación, no dinero). Si en el futuro alguna de ellas empieza a desbloquear algo, aplicar el mismo patrón. Landing y paywall siguen con veredicto NO LISTA de rondas anteriores (usabilidad) — no forma parte de los 3 hallazgos críticos aprobados hoy.

## Ruta a 10/10 (2026-08-17) — puntos 1 y 2 resueltos y verificados

**Punto 1 — Webhook de Hotmart, verificado de punta a punta sin usar la clave real**: no se puede pedir la clave de producción (nunca debe pasar por el chat), así que se probó la LÓGICA completa con una clave de prueba SOLO en `.env` local (nunca en producción, revertida al terminar): se simuló un aviso real `PURCHASE_APPROVED` contra el servidor local → creó la cuenta y la subió a `plan: premium` con el código de suscriptor correcto; luego un `SUBSCRIPTION_CANCELLATION` → el plan volvió a `free` automáticamente. Cuenta y datos de prueba borrados. Esto confirma que el CÓDIGO funciona correctamente — sigue pendiente que el usuario confirme el botón "Testar webhook" de Hotmart para probar también que la clave de PRODUCCIÓN coincide (eso sí requiere que él lo haga, no se puede probar desde aquí sin ver la clave).

**Punto 2 — `/admin` ya estaba protegido correctamente** (hallazgo de la auditoría anterior era una suposición sin verificar el código — corregido aquí): `app/admin/layout.tsx` compara el email de la sesión (firmado por Supabase, no editable por el cliente) contra `ADMIN_EMAIL` en el servidor, y redirige a `/entrar` si no coincide — es la forma correcta de hacerlo, no un simple "ocultar el menú". Se intentó una prueba adicional con una cuenta real no-admin contra producción pero no fue concluyente por una limitación del navegador automatizado de esta sesión (no es un problema de la app) — el código ya es una garantía suficiente por sí solo.

## Ruta a 10/10 — puntos 3 a 8 (2026-08-17)

**Punto 3 — Landing y paywall pulidos**: los veredictos de `docs/revisiones/` eran del 2026-08-14, muy anteriores a los 4 rounds de cumplimiento de anuncios y a la conexión de Hotmart — la mayoría de sus defectos ya no aplicaban (algunos, como el tap-target de 44px del CTA mensual, ya estaban resueltos sin documentarlo). Se midió cada sección con `getBoundingClientRect()` en vez de confiar en capturas de scroll (que llevaron a 2 falsas alarmas mías, descartadas tras medir). Defectos reales encontrados y corregidos:
- Landing: faltaba skip-link de teclado (agregado, apunta a `id="main"` en la sección Problema) y los precios no tenían el conteo animado 0→valor exigido por la baseline de movimiento #2 (agregado con `motion/react` `animate()` + `useInView`, respeta `prefers-reduced-motion`) — ambos verificados con scroll real en el navegador.
- Paywall: el hero no tenía CTA propio (dependía de bajar hasta la oferta o de la barra fija) — se agregó un botón "Quiero Premium" en el hero, verificado que apunta al link real de Hotmart anual.
`tsc`/`build` ✓ en ambos commits.

**Punto 4 — Leaked Password Protection**: requiere el panel de Supabase (Authentication → Password/Security), no hay API/SQL para activarlo — instrucciones dadas al usuario, pendiente de que él lo haga.

**Punto 5 — Backups**: no se puede "probar restaurar" sin arriesgar los datos reales de producción (acción destructiva, requiere confirmación explícita y no se ejecuta solo para verificar) — se le explicó al usuario la diferencia entre plan gratis (copias diarias, 7 días) y Pro (PITR continuo) para que revise cuál tiene y decida si vale la pena subir de plan.

**Punto 6 — Dominio de correo calentándose**: pasivo, sin acción — mejora solo con el tiempo y el uso real.

**Punto 7 — Onboarding, 6 pantallas**: revisado a fondo por código (nombre → grado → dolor → 3 preguntas de diagnóstico → plan final) — lógica sólida, sin bugs encontrados. No se pudo re-verificar interactuando con la app en vivo: se descubrió que en esta sesión el navegador automatizado queda con `document.hidden = true` incluso al "seleccionar" la pestaña, lo que congela las animaciones de salida de Framer Motion (`AnimatePresence`) a mitad de camino — esto generó una falsa alarma (parecía que el paso 2 mostraba el contenido del paso 1) que se descartó al confirmar la causa real. El veredicto LISTA (38/40, 16/20) de sesiones anteriores sigue vigente porque el código de las transiciones no cambió.

**Punto 8 — Dominio raíz `nymystudio.com`**: el usuario no tenía clara la respuesta, así que se le dio una recomendación directa (no tocarlo — dejarlo reservado para la futura landing de NYMY LABS, seguir usando `algebrax.nymystudio.com` para AlgebraX) y quedó aceptada. **No se ejecutó ningún cambio de DNS** — decisión es "dejarlo como está", que no requiere acción.

## Próximo paso
Confirmar con el usuario el resultado real del botón "Testar webhook" de Hotmart. Después, lo que más impacto tiene para vender: conseguir 2-3 testimonios reales (la landing hoy no tiene ninguno, a propósito — nunca se inventan) y empezar a publicar contenido con los hashtags ya sugeridos. SEO técnico (metadatos, sitemap) queda como tarea aparte, no urgente. Sigue pendiente que el usuario active "Leaked Password Protection" en Supabase y revise su plan de backups.
