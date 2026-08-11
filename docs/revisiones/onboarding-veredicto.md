# VEREDICTO revisor-visual — onboarding (diagnóstico)
Fecha: 2026-08-11 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 36/40
Craft: 17/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): FIEL
Veredicto: LISTA

Detalle usabilidad: h1:3 h2:4 h3:3 h4:4 h5:4 h6:4 h7:3 h8:3 h9:4 h10:4
Detalle craft: jerarquía:4 profundidad:3 identidad:3 movimiento:4 encaje:3

Notas de re-verificación (rutina, sin cambios de código en esta pantalla):
- Diagnostico.tsx y app/onboarding/page.tsx confirmados sin diffs relevantes a esta pantalla.
- Paleta coincide con FICHA-ARTE.md (fondo #14161C, acento-2 azul #3D8BFF en label/consejo, radios 14-20px, sombra dura offset "block-press").
- Grep confirma CERO aria-live/aria-label en Diagnostico.tsx: el cambio de estado correcto/incorrecto no se anuncia a lectores de pantalla (baja h1 vs. veredicto anterior).
- Control y libertad verificado en código: botón volver (ArrowLeft) presente en fase diagnóstico (page.tsx L118-121); pero DENTRO de una pregunta no hay forma de saltarla si el estudiante se traba, solo responder (baja h3).
- Revisión de tipografía: layout.tsx nombra las variables de next/font como --font-geist-sans/--font-geist-mono (boilerplate de Geist sin renombrar) mientras tokens.css declara --font-display: 'Baloo 2' por nombre literal, no por var(). Funcionalmente plausible (el @font-face se inyecta igual vía className en <html>), pero en el screenshot el titular "Resuelve: x + 8 = 15" no muestra con claridad el carácter bubbly/chunky distintivo de Baloo 2 — no se pudo confirmar al 100% que el peso 700 esté renderizando la fuente correcta y no un fallback. Se anota como riesgo de identidad (baja eje 3), no como fallo confirmado.
- La sombra "block-press" (dispositivo ownable de la ficha) es casi imperceptible sobre el fondo casi-negro (#14161C surface vs #0A0B0E shadow, ambos muy oscuros): un usuario normal no la nota sin acercarse (baja eje 3 y eje 2 de profundidad).
- Repetición: el tip "Consejo: resuélvelo en una hoja..." es idéntico en las 3 preguntas del diagnóstico, sin variación (baja h8 — elemento que no se gana del todo su lugar la 2ª/3ª vez).
- Gate de carga cognitiva: 0 fallas (4 opciones, 1 acción primaria, sin campos que recordar, texto en 2-3 líneas). No aplica como defecto crítico.
- CTA héroe vivo (botones de opción + "Entendido, sigamos"): contraste ok, whileTap definido, nunca disabled por defecto, área ≥48px — pasa las 4 anclas.
- Sigue pasando el gate doble (≥36/40 y ≥16/20), pero al límite en usabilidad: no hay margen para más regresiones sin caer de NO LISTA.

TOP DEFECTOS:
1. [Diagnostico.tsx, todo el componente] Sin aria-live en el resultado correcto/incorrecto → agregar aria-live="polite" al contenedor de feedback para que lectores de pantalla anuncien el resultado.
2. [Diagnostico.tsx, dentro de una pregunta] No existe forma de saltar/pasar una pregunta si el estudiante se traba, solo responder → agregar un link discreto "No lo sé, sigamos" que cuente como fallo y muestre la explicación, igual que una respuesta incorrecta.
3. [tarjetas de opciones, screenshot] La sombra "block-press" (dispositivo ownable de FICHA-ARTE) es casi invisible sobre el fondo #14161C → subir el contraste de la sombra ~10-15% o agregar un borde inferior más claro para que el detalle firma se note sin zoom.
4. [titular "Resuelve: x + 8 = 15"] No se puede confirmar con certeza en el screenshot que Baloo 2 esté cargando (layout.tsx usa nombres de variable heredados de Geist boilerplate, --font-geist-sans/--font-geist-mono, en vez de --font-display/--font-body) → renombrar las variables de next/font a --font-display/--font-body y confirmar con DevTools > Computed que el font-family real aplicado es "Baloo 2", no el fallback 'Segoe UI'.
5. [card "Consejo"] Texto idéntico repetido en las 3 preguntas del diagnóstico sin variación → rotar el copy o mostrarlo solo en la primera pregunta para que no pierda valor por repetición.
