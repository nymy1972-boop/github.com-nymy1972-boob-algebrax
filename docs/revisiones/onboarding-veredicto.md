# VEREDICTO revisor-visual — onboarding (Diagnóstico)
Fecha: 2026-08-11 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 38/40
Craft: 18/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA
Top defectos: 1. [Consejo de práctica, caja azul] mensaje genérico e idéntico en las 3 preguntas del diagnóstico ("resuélvelo en una hoja...") → variarlo por tema para que enseñe algo específico de esa pregunta. 2. [Todo el flujo] cero atajos de teclado para seleccionar opción (solo tap/click) → agregar binding 1-4 sin quitar el tap. 3. [Headline "Resuelve: x + 8 = 15"] no se puede confirmar con certeza a 375px que esté cargando Baloo 2 (rounded/chunky) vs. fallback sans genérico → verificar next/font en producción, no solo en dev. 4. [Botón "Entendido, sigamos"] no visible en este screenshot (solo aparece en la rama de respuesta incorrecta) → capturar también ese estado en la próxima revisión para verificar contraste/tap en pantalla real, no solo en código. 5. [Barra de progreso superior] el relleno se ve con un leve efecto de degradado hacia negro en vez de fill sólido `var(--accent)` como indica la ficha → confirmar que no sea artefacto de renderizado del navegador de captura.
