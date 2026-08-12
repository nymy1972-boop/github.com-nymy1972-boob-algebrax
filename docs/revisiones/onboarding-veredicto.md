# VEREDICTO revisor-visual — onboarding (diagnóstico)
Fecha: 2026-08-12 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 38/40
Craft: 16/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA
Top defectos:
1. [Card de pregunta, badges 1-4 + label "ECUACIONES BÁSICAS" + "Consejo"] Tres bloques de texto en 12-13px conviven muy cerca en peso visual (label, número de badge, cuerpo del consejo) → si se afina más, subir el label del tema a 14px o bajar el peso del texto del consejo para separar mejor los niveles 3 y 4 de jerarquía.
2. [Zona bajo "No lo sé, sigamos"] Queda ~130-150px de aire antes del borde inferior del viewport; no rompe el balance (el flex centra el bloque y hay aire equivalente arriba) pero un ojo entrenado lo nota — mover el link "No lo sé" más abajo o añadir un elemento de apoyo (ej. contador "Pregunta 1 de 3" dentro de la card) llenaría ese resto sin forzar el layout.
3. [Botón "Entendido, sigamos" dentro del bloque de explicación] Es el único botón sólido rojo visible en el flujo normal (solo aparece si falla) — correcto por diseño, pero al ser un elemento condicional, un usuario que siempre acierta nunca ve un CTA sólido en esta pantalla; no es un defecto de craft, es una nota de flujo, no baja puntaje.

Nota sobre el fix de esta ronda: el cambio de los 4 badges de fill azul sólido a outline (borde 40%, fondo transparente, texto azul) SÍ corrige el desbalance cromático señalado en la ronda anterior — ahora el rojo (--accent) domina como color de acción/dato clave ("15", barra de progreso) y el azul (--accent-2) queda relegado a identidad/navegación (label de tema, hairline, ícono de Consejo), tal como exige la "Justificación de teoría del color" de FICHA-ARTE.md. Esto sube el eje de Identidad Ownable de craft de 2 a 4 (cumple el kit sin desviación, dispositivo block-press visible y consistente, pasa el test anti-clon), cruzando el umbral de 16/20.
