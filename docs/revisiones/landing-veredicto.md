# VEREDICTO revisor-visual — landing
Fecha: 2026-08-14 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 28/40
Craft: 16/20
Copy (si vende): 18/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. [Sección "LA OFERTA" (#oferta), ambas cards de precio] La garantía no aparece junto al CTA de compra — `Oferta` en app/page.tsx no pasa la prop `garantiaCorta`, así que el sub-check binario "garantía nombrada cerca del CTA de compra" falla; solo se ve en el Hero y en la sección Garantía, lejos del momento de decisión → pasar `garantiaCorta="Garantía del Primer Paso Entendido — 7 días"` al `<Oferta>` en page.tsx.
2. [Sección OFERTA, componente `Precio` en Oferta.tsx] Los precios ($3.33 / $4.99) se renderizan estáticos, sin conteo animado de 0 al valor final al entrar en viewport — falta la baseline de movimiento #2 (conteo animado de números héroe) → envolver el span de `plan.precioMes` en un `motion` count-up disparado por `whileInView`, respetando `useReducedMotion`.
3. [Global, heurística 9] Ningún estado de error está implementado ni demostrado en la landing (p. ej. si `/onboarding` no carga desde un CTA roto no hay fallback visible) → definir un patrón de error mínimo reutilizable (toast o mensaje inline) para cuando un enlace de salida falla, aunque sea a nivel de documentación de contrato para /onboarding.
4. [Global, heurística 7] Sin mecanismos de eficiencia para el usuario que repite la visita (sin skip-link para teclado, sin anclas visibles en header más allá del logo) → agregar un skip-link "Saltar al contenido" y verificar orden de tabulación con foco visible en todos los CTAs repetidos.
5. [Sección "LA APP POR DENTRO", carrusel de frames] Scroll horizontal con snap sigue siendo la única forma de recorrer los 4 frames en mobile — decisión ya conocida y no bloqueante, se mantiene documentada como pendiente de validación con datos de uso reales, no como hallazgo nuevo.
