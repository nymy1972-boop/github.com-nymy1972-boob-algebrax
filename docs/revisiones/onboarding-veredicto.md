# VEREDICTO revisor-visual — onboarding (Diagnóstico)
Fecha: 2026-08-11 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 29/40
Craft: 13/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Botones de opción, toda la pantalla] La sombra "block-press" quedó en dos profundidades distintas dentro del mismo flujo: Diagnostico.tsx bajó a 30% de opacidad pero los botones de grado/dolor en page.tsx siguen en 60% — mismo componente, dos pesos visuales → unificar en un token compartido (--shadow-block) y usarlo en las 3 pantallas.
2. [Bloque de pregunta, centrado vertical] El contenido queda flotando con ~100px vacíos arriba (bajo la barra de progreso) y ~150px vacíos abajo del link "No lo sé, sigamos" — se lee como descentrado, no como anclado → cambiar `items-center` por anclaje superior fijo tras el progreso (justify-start + padding-top constante).
3. [Fondo completo bajo el header] El radial-gradient sutil del header no llega a la zona donde vive la pregunta; todo el área visible es un mismo plano oscuro sin superficie hundida — solo 2 niveles de profundidad (base/card), falta el tercero → extender el degradé o agregar un plano hundido detrás de las cards.
4. [Flujo de diagnóstico completo] Cero atajos de teclado para el usuario avanzado (sin 1-4 para elegir opción, sin Enter para avanzar tras acierto) — heurística 7 verificada en código, solo hay foco/tab nativo de `<button>` → agregar listener opcional de teclado sin romper el flujo táctil.
5. [Botón atrás, esquina superior izquierda] El ícono ArrowLeft de 20px flota solo dentro de un hitbox invisible de 44px sin fondo ni contorno — a simple vista se ve como ícono suelto de 20px, no como control táctil de 44px → agregar fondo circular sutil (surface-2 8-10%) que visualice el área táctil real.
