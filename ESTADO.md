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
**La app NUNCA:** muestra la respuesta sin intento previo del usuario · bloquea/penaliza por equivocarse (nada de "vidas") · usa lenguaje infantil de juego para niños · comparte datos del estudiante sin permiso.

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

## Próximo paso
Sesión 2 en curso: cerrar dirección visual → FICHA-ARTE.md → tokens CSS → Sesión 3 (página de ventas).
