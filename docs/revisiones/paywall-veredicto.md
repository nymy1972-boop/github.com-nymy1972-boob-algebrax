# VEREDICTO revisor-visual — paywall
Fecha: 2026-08-14 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 27/40
Craft: 13/20
Copy (si vende): 17/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Entre hero y card de stack "TU PLAN"] Un botón "Quiero Premium →" semitransparente aparece flotando y SOLAPADO sobre el texto del stack de valor ("AlgebraX Premium: todos los módulos + Modo Examen ilimitado (12 meses)" y "Reporte de errores comunes $25" quedan tapados/ilegibles) → confirmar si es la StickyCtaMobile capturada a mitad de su transición de entrada/salida por el método de captura full-page (position:fixed baked-in a mitad de página) o un bug real de z-index; recapturar ocultando elementos fixed durante el stitching y validar en scroll real de dispositivo que nunca se solapa con contenido.
2. [Confiabilidad del StickyCtaMobile en todo el scroll] Fuera de ese único frame con glitch, la barra fija no se ve en ningún otro punto del screenshot pese a que el código la activa cuando hero/oferta/cta-final están fuera de viewport → grabar un scroll real a 375px y verificar que aparece/desaparece limpio en las 3 transiciones (sale del hero, entra a oferta, entra a cta-final) sin parpadeos ni solapes.
3. [Hero — sin CTA propio] El hero (título + subtítulo + 3 bullets + chip de garantía) no tiene ningún botón de acción inline; el usuario depende de scrollear hasta la oferta o del sticky bar (con el glitch del defecto 1) para poder actuar → agregar un CTA secundario visible dentro del hero, o blindar que el sticky sea 100% confiable antes de depender solo de él.
4. [Card Mensual, CTA "Quiero Premium mensual"] El link subrayado sin caja (bajada de peso correcta y buscada) tiene un área de toque visualmente menor y menos evidente como tappable que el resto de CTAs de la pantalla → mantener el estilo de link pero asegurar ≥44px de alto tocable real.
5. [Heurística 7 — Flexibilidad, código] No hay ningún default/atajo de experto verificable (p. ej. foco inicial en el CTA principal, selección explícita del plan recomendado) más allá de los estados base → no bloqueante para un paywall, pero documentar/añadir autofocus o foco inicial en el CTA del plan Anual para subir el criterio.
