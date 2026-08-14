# VEREDICTO revisor-visual — onboarding (Diagnóstico)
Fecha: 2026-08-13 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 38/40
Craft: 17/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: LISTA
Top defectos:
1. [Options list, badges numerados 1-4] El color azul (--accent-2) del borde/número sobre superficie oscura ronda el mínimo AA (~4.5:1) en texto pequeño → medir contraste real y subir 1-2% de luminancia si falla en herramienta automática.
2. [Card de pregunta] El titular resalta la constante "15" en vez de la incógnita "x" (split por última palabra) → funciona semánticamente pero no es el dato que el estudiante busca; considerar resaltar "x" cuando el enunciado termine en el resultado dado, no en la incógnita.
3. [Footer / consejo] El bloque "Consejo" y el bloque de error comparten casi el mismo tratamiento visual (misma superficie, mismo radio) → un ojo entrenado los confunde a primera vista entre "tip preventivo" y "feedback post-error"; diferenciar con un tinte de fondo más distintivo en el consejo.
4. [Movimiento] En esta pantalla no hay conteo animado de número héroe (no aplica al contenido) ni anillo/barra que se dibuje más allá de la barra de progreso superior → aceptable porque el contenido no lo requiere, pero deja el eje de movimiento en 3/4 en vez de 4/4.
5. [Botones numerados 1-4] El radio del badge cuadrado (8px) es visiblemente menor al radio de las cards/botones (var(--radius-button/card), 14-20px) → familia de radios consistente pero con dos escalas distintas conviviendo; verificar que sea intencional (jerarquía) y no un desvío accidental.
