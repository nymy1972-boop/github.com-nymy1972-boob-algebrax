# VEREDICTO revisor-visual — onboarding (diagnóstico)
Fecha: 2026-08-11 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 38/40
Craft: 18/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): FIEL
Veredicto: LISTA

Detalle usabilidad: h1:4 h2:4 h3:4 h4:4 h5:4 h6:4 h7:3 h8:4 h9:4 h10:3
Detalle craft: jerarquía:4 profundidad:4 identidad:4 movimiento:3 encaje:3

Notas de re-verificación (rutina, sin cambios de código en esta pantalla):
- Diagnostico.tsx y app/onboarding/page.tsx confirmados sin diffs relevantes a esta pantalla.
- Paleta y tipografía del screenshot coinciden con FICHA-ARTE.md (fondo #14161C, acento-2 azul en label/consejo, Baloo 2 vía next/font en layout.tsx, radios de botón consistentes ~14-20px).
- Control y libertad verificado en código: botón "volver" (ArrowLeft) presente en fase diagnóstico (page.tsx línea 118-121), nunca bloqueado.
- Sin regresión detectada respecto al veredicto anterior (38/40, 18/20).

TOP DEFECTOS (menores, no bloqueantes):
1. [tarjeta de opciones] El estado "seleccionado pero incorrecto" solo diferencia por icono Lightbulb + borde acento-2 (azul), no hay tachado ni disabled visual fuerte de las demás opciones → fix: atenuar (opacity ~60%) las opciones no elegidas al responder mal para reforzar foco en la explicación.
2. [progreso superior] El contador de gemas (0) no aparece hasta el primer acierto, lo cual es correcto, pero el layout del header podría saltar de ancho al aparecer → fix: reservar espacio fijo con w-min o transición de ancho suave.
3. [card de consejo] Icono NotebookPen y texto "Consejo" quedan en azul sobre azul tenue — buen contraste, pero es el mismo tono que el label del tema arriba, reduce diferenciación jerárquica entre metadatos y ayuda contextual → fix: usar texto-secundario neutro para el cuerpo del consejo, dejar el acento solo en la palabra "Consejo".
