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

## Ajuste: paywall mejorado con reglas de Gemini (analizadas, no copiadas a ciegas)
El usuario trajo 7 "reglas de oro" de paywall de Gemini. Análisis y decisión:
- **Adoptadas (implementadas):** (3) headline orientado a RESULTADO en vez de features ("Pasa tu examen entrenando 10 min al día" / bullets en lenguaje de resultado) · (6) personalización dinámica: el paywall ahora lee `?tema=` (pasado desde el onboarding, el tema donde falló en el diagnóstico) y cambia el titular a "Tu plan para dominar [tema] está listo".
- **Descartadas y documentadas en el código (`app/paywall/page.tsx`, comentario de cabecera):** (2) timeline de trial "Hoy→Día 5→Día 7" — asume un modelo de TRIAL con cobro automático que NO es el nuestro (decidimos Freemium sin trial en Sesión 1 justo para eliminar el miedo al cobro de raíz); (5) rating "4.8/5 de 2,000 estudiantes" + testimonio de "Sofi M." — son datos INVENTADOS, el SO prohíbe testimonios/ratings falsos; se sustituyó por la garantía real (honesta, verificable) como prueba social; (7) pop-up de exit-intent con oferta de rescate — el paywall ya tiene una salida sin fricción ("Seguir gratis"), agregar un pop-up de último segundo se sentiría como dark pattern.
- (1) anclaje anual + desglose diario y (4) CTA orientado a beneficio — ya estaban bien implementados desde la Sesión 4, sin cambios.
Verificado en navegador con `?tema=Despejes con signos`: título personalizado correcto, sin errores.

## Próximo paso
Pedir al usuario la primera cuenta: GitHub (para poder desplegar a Vercel).
