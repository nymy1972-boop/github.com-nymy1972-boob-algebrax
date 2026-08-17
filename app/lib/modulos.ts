// Banco de contenido — camino de progreso pedido por el usuario (2026-08-17):
// Expresiones → Operaciones → Exponentes → Productos notables → Factorización
// → Ecuaciones → Despejes → Inecuaciones → Sistemas → Polinomios → Cuadráticas
// → Funciones. Cada pregunta se GENERA (no es una lista fija): así el
// estudiante nunca se topa con el mismo ejercicio dos veces seguidas, aunque
// complete el módulo y vuelva a practicar. Cada pregunta trae el paso exacto
// en el que se equivocan los estudiantes que fallan — eso es lo que el
// Descifrador de Pasos les muestra (nunca solo "mal").

export interface PreguntaModulo {
  enunciado: string;
  opciones: string[];
  correctaIndex: number;
  pasoClave: string; // el paso que separa el acierto del error — se muestra SIEMPRE, acierte o no
}

export interface PasoEjemplo {
  titulo: string;
  detalle: string;
}

export interface EjemploModulo {
  enunciado: string;
  pasos: PasoEjemplo[]; // exactamente 3 — el mismo formato que "El método" de la landing
}

export interface Modulo {
  slug: string;
  nombre: string;
  descripcion: string;
  ejemplo: EjemploModulo; // se muestra ANTES de la primera pregunta — enseña, luego practica
  generarPreguntas: (cantidad: number) => PreguntaModulo[];
}

// ── utilidades compartidas de generación ──────────────────────────────────

function entero(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function enteroNoCero(min: number, max: number): number {
  let n = entero(min, max);
  while (n === 0) n = entero(min, max);
  return n;
}

function barajar<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function fmt(n: number): string {
  return n < 0 ? `-${Math.abs(n)}` : `${n}`;
}

const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
function sup(n: number): string {
  return String(n).split('').map((c) => SUP[c] ?? c).join('');
}
/** "x", "x²", "x⁵"... — mismo estilo unicode que ya usa Factorización. */
function xp(exp: number): string {
  if (exp === 0) return '1';
  if (exp === 1) return 'x';
  return `x${sup(exp)}`;
}

function factorTexto(p: number): string {
  return p < 0 ? `(x-${Math.abs(p)})` : `(x+${p})`;
}

/** p≠q, ninguno 0 — para que el trinomio no sea un caso degenerado (binomio al cuadrado disfrazado, o x²+bx). */
function generarParFactores(): { p: number; q: number } {
  let p = 0;
  let q = 0;
  while (p === 0 || q === 0 || p === q) {
    p = entero(-9, 9);
    q = entero(-9, 9);
  }
  return { p, q };
}

/** Arma las 4 opciones (correcta + 3 distractores únicos) en posición aleatoria. */
function armarOpciones(correcta: string, distractoresPosibles: string[]): { opciones: string[]; correctaIndex: number } {
  const unicos = Array.from(new Set(distractoresPosibles.filter((d) => d !== correcta)));
  const distractores = barajar(unicos).slice(0, 3);
  // relleno de emergencia si por coincidencia numérica quedaron <3 distractores únicos
  let relleno = 1;
  while (distractores.length < 3) {
    const candidato = `x = ${relleno}`;
    if (candidato !== correcta && !distractores.includes(candidato)) distractores.push(candidato);
    relleno++;
  }
  const opciones = barajar([correcta, ...distractores]);
  return { opciones, correctaIndex: opciones.indexOf(correcta) };
}

function generarUnicas(generador: () => PreguntaModulo, cantidad: number): PreguntaModulo[] {
  const vistas = new Set<string>();
  const resultado: PreguntaModulo[] = [];
  let intentos = 0;
  while (resultado.length < cantidad && intentos < cantidad * 20) {
    intentos++;
    const p = generador();
    if (vistas.has(p.enunciado)) continue;
    vistas.add(p.enunciado);
    resultado.push(p);
  }
  return resultado;
}

// ── 1. Expresiones — evaluar una expresión algebraica dado el valor de x ───

function generarExpresion(): PreguntaModulo {
  const a = entero(2, 9);
  const b = entero(-10, 10);
  const xVal = entero(-6, 8);
  const resultado = a * xVal + b;
  const enunciado = `Si x = ${xVal}, evalúa: ${a}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)}`;
  const correcta = fmt(resultado);
  const pasoClave = `Sustituyes x por ${xVal}: ${a}(${xVal}) ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${fmt(a * xVal)} ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${fmt(resultado)}.`;
  const distractores = [fmt(a * xVal - b), fmt(a + xVal + b), fmt(resultado + a), fmt(-resultado)];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 2. Operaciones — sumar/restar términos semejantes ──────────────────────

function generarOperacion(): PreguntaModulo {
  const a = entero(3, 14);
  let b = entero(1, 10);
  while (b === a) b = entero(1, 10);
  const suma = Math.random() < 0.5;
  const resultado = suma ? a + b : a - b;
  const enunciado = `Simplifica: ${a}x ${suma ? '+' : '−'} ${b}x`;
  const correcta = `${fmt(resultado)}x`;
  const pasoClave = suma
    ? `Sumas los coeficientes (el número que acompaña a x): ${a} + ${b} = ${resultado}.`
    : `Restas los coeficientes: ${a} − ${b} = ${resultado}.`;
  const distractores = [`${fmt(a * b)}x`, `${fmt(suma ? a - b : a + b)}x`, `${fmt(resultado)}x²`, `${fmt(resultado + 1)}x`];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 3. Exponentes — leyes de potencias (producto, cociente, potencia de potencia) ──

function generarExponente(): PreguntaModulo {
  const tipo = entero(1, 3);
  if (tipo === 1) {
    const m = entero(2, 6);
    const n = entero(2, 6);
    const enunciado = `Simplifica: ${xp(m)} · ${xp(n)}`;
    const correcta = xp(m + n);
    const pasoClave = `Al multiplicar potencias de la misma base, sumas los exponentes: ${m} + ${n} = ${m + n}.`;
    const distractores = [xp(m * n), xp(m + n + 1), xp(Math.abs(m - n) || 1), xp(m + n - 1 || 1)];
    const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
    return { enunciado, opciones, correctaIndex, pasoClave };
  }
  if (tipo === 2) {
    const n = entero(2, 5);
    const diff = entero(1, 4);
    const m = n + diff;
    const enunciado = `Simplifica: ${xp(m)} ÷ ${xp(n)}`;
    const correcta = xp(diff);
    const pasoClave = `Al dividir potencias de la misma base, restas los exponentes: ${m} − ${n} = ${diff}.`;
    const distractores = [xp(m + n), xp(diff + 1), xp(Math.max(1, diff - 1)), xp(m)];
    const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
    return { enunciado, opciones, correctaIndex, pasoClave };
  }
  const m = entero(2, 5);
  const n = entero(2, 4);
  const enunciado = `Simplifica: (${xp(m)})${sup(n)}`;
  const correcta = xp(m * n);
  const pasoClave = `Al elevar una potencia a otra potencia, multiplicas los exponentes: ${m} × ${n} = ${m * n}.`;
  const distractores = [xp(m + n), xp(m * n + 1), xp(m), xp(n)];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 4. Productos notables — cuadrado de un binomio / diferencia de cuadrados ──

function generarProductoNotable(): PreguntaModulo {
  const a = entero(2, 9);
  if (Math.random() < 0.5) {
    const suma = Math.random() < 0.5;
    const enunciado = `Desarrolla: (x ${suma ? '+' : '−'} ${a})²`;
    const correcta = `x² ${suma ? '+' : '−'} ${2 * a}x + ${a * a}`;
    const pasoClave = `El cuadrado de un binomio: x² ${suma ? '+' : '−'} 2(${a})x + ${a}² = x² ${suma ? '+' : '−'} ${2 * a}x + ${a * a}.`;
    const distractores = [
      `x² + ${a * a}`,
      `x² ${suma ? '+' : '−'} ${a}x + ${a * a}`,
      `x² ${suma ? '−' : '+'} ${2 * a}x + ${a * a}`,
      `x² ${suma ? '+' : '−'} ${2 * a}x − ${a * a}`,
    ];
    const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
    return { enunciado, opciones, correctaIndex, pasoClave };
  }
  const enunciado = `Desarrolla: (x + ${a})(x − ${a})`;
  const correcta = `x² − ${a * a}`;
  const pasoClave = `Es una diferencia de cuadrados: (x+${a})(x−${a}) = x² − ${a}² = x² − ${a * a}.`;
  const distractores = [`x² + ${a * a}`, `x² − ${a}x − ${a * a}`, `x² + ${2 * a}x − ${a * a}`, `x² − ${2 * a}x + ${a * a}`];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 5. Factorización (x² + (p+q)x + pq = (x+p)(x+q)) ───────────────────────

function generarFactorizacion(): PreguntaModulo {
  const { p, q } = generarParFactores();
  const b = p + q;
  const c = p * q;
  const enunciado = `Factoriza: x² ${b >= 0 ? '+' : '−'} ${Math.abs(b)}x ${c >= 0 ? '+' : '−'} ${Math.abs(c)}`;
  const correcta = `${factorTexto(p)}${factorTexto(q)}`;
  const pasoClave = `Buscas 2 números que multiplicados den ${c} y sumados den ${b}: son ${p} y ${q}.`;
  const distractores = [
    `${factorTexto(-p)}${factorTexto(q)}`,
    `${factorTexto(p)}${factorTexto(-q)}`,
    `${factorTexto(p + 1)}${factorTexto(q - 1)}`,
    `${factorTexto(-p)}${factorTexto(-q)}`,
  ];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 6. Ecuaciones básicas (x ± a = b) ───────────────────────────────────────

function generarEcuacion(): PreguntaModulo {
  const x = entero(-15, 25);
  const a = entero(2, 20);
  const suma = Math.random() < 0.5;
  const b = suma ? x + a : x - a;
  const enunciado = suma ? `Resuelve: x + ${a} = ${b}` : `Resuelve: x − ${a} = ${b}`;
  const correcta = `x = ${fmt(x)}`;
  const pasoClave = suma
    ? `El ${a} pasa restando al otro lado: x = ${b} − ${a} = ${x}.`
    : `El ${a} pasa sumando al otro lado: x = ${b} + ${a} = ${x}.`;
  const distractores = [`x = ${fmt(-x)}`, `x = ${fmt(suma ? b + a : b - a)}`, `x = ${fmt(a)}`, `x = ${fmt(x + 1)}`];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 7. Despejes con signos (a·x ± b = c) ────────────────────────────────────

function generarDespeje(): PreguntaModulo {
  const a = entero(2, 6);
  const x = entero(-10, 12);
  const b = entero(1, 15);
  const suma = Math.random() < 0.5;
  const c = suma ? a * x + b : a * x - b;
  const enunciado = suma ? `Despeja x: ${a}x + ${b} = ${c}` : `Despeja x: ${a}x − ${b} = ${c}`;
  const correcta = `x = ${fmt(x)}`;
  const pasoClave = suma
    ? `Restas ${b} en ambos lados (${a}x = ${c - b}), luego divides entre ${a}.`
    : `Sumas ${b} en ambos lados (${a}x = ${c + b}), luego divides entre ${a}.`;
  const distractores = [`x = ${fmt(Math.round(c / a))}`, `x = ${fmt(-x)}`, `x = ${fmt(x + a)}`, `x = ${fmt(suma ? x - 1 : x + 1)}`];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 8. Inecuaciones lineales (el signo se voltea al dividir por negativo) ──

function generarInecuacion(): PreguntaModulo {
  const a = enteroNoCero(-6, 6);
  const xLimite = entero(-10, 10);
  const b = entero(1, 12);
  const c = a * xLimite + b;
  const compOriginal = Math.random() < 0.5 ? '>' : '<';
  const compFinal = a < 0 ? (compOriginal === '>' ? '<' : '>') : compOriginal;
  const enunciado = `Resuelve: ${a}x + ${b} ${compOriginal} ${c}`;
  const correcta = `x ${compFinal} ${fmt(xLimite)}`;
  const pasoClave =
    a < 0
      ? `Despejas: ${a}x ${compOriginal} ${c - b} → al dividir entre ${a} (negativo), el signo se voltea: x ${compFinal} ${xLimite}.`
      : `Despejas: ${a}x ${compOriginal} ${c - b} → divides entre ${a}: x ${compFinal} ${xLimite}.`;
  const distractores = [
    `x ${compOriginal} ${fmt(xLimite)}`,
    `x ${compFinal} ${fmt(-xLimite)}`,
    `x ${compFinal} ${fmt(xLimite + 1)}`,
    `x ${compOriginal} ${fmt(-xLimite)}`,
  ];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 9. Sistemas de ecuaciones 2×2 (x+y=s, x−y=d) ───────────────────────────

function generarSistema(): PreguntaModulo {
  let x = 0;
  let y = 0;
  while (x === y) {
    x = entero(-8, 8);
    y = entero(-8, 8);
  }
  const suma = x + y;
  const resta = x - y;
  const enunciado = `Resuelve el sistema: x + y = ${suma} ; x − y = ${resta}`;
  const correcta = `x = ${fmt(x)}, y = ${fmt(y)}`;
  const pasoClave = `Sumas ambas ecuaciones: 2x = ${suma + resta}, entonces x = ${x}. Sustituyes en la primera: y = ${suma} − ${x} = ${y}.`;
  const distractores = [
    `x = ${fmt(y)}, y = ${fmt(x)}`,
    `x = ${fmt(x)}, y = ${fmt(-y)}`,
    `x = ${fmt(suma)}, y = ${fmt(resta)}`,
    `x = ${fmt(x + 1)}, y = ${fmt(y - 1)}`,
  ];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 10. Polinomios — multiplicar 2 binomios distintos (inverso de factorizar) ──

function generarPolinomio(): PreguntaModulo {
  const { p, q } = generarParFactores();
  const b = p + q;
  const c = p * q;
  const enunciado = `Multiplica: ${factorTexto(p)}${factorTexto(q)}`;
  const correcta = `x² ${b >= 0 ? '+' : '−'} ${Math.abs(b)}x ${c >= 0 ? '+' : '−'} ${Math.abs(c)}`;
  const pasoClave = `Sumas p+q para el término del medio y multiplicas p·q para el término independiente: x² + (${p}+${q})x + (${p})(${q}) = ${correcta}.`;
  const distractores = [
    `x² ${b >= 0 ? '+' : '−'} ${Math.abs(b)}x ${c >= 0 ? '−' : '+'} ${Math.abs(c)}`,
    `x² + ${Math.abs(p) + Math.abs(q)}x + ${Math.abs(c)}`,
    `x² ${b >= 0 ? '+' : '−'} ${Math.abs(b)}x`,
    `x² ${b >= 0 ? '−' : '+'} ${Math.abs(b)}x ${c >= 0 ? '+' : '−'} ${Math.abs(c)}`,
  ];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 11. Cuadráticas — resolver x²+bx+c=0 (raíces enteras) ──────────────────

function generarCuadratica(): PreguntaModulo {
  const { p, q } = generarParFactores();
  const b = p + q;
  const c = p * q;
  const sol1 = -p;
  const sol2 = -q;
  const menor = Math.min(sol1, sol2);
  const mayor = Math.max(sol1, sol2);
  const enunciado = `Resuelve: x² ${b >= 0 ? '+' : '−'} ${Math.abs(b)}x ${c >= 0 ? '+' : '−'} ${Math.abs(c)} = 0`;
  const correcta = `x = ${fmt(menor)} o x = ${fmt(mayor)}`;
  const pasoClave = `Factorizas primero: ${factorTexto(p)}${factorTexto(q)} = 0, así que x = ${fmt(-p)} o x = ${fmt(-q)}.`;
  const distractores = [
    `x = ${fmt(Math.min(p, q))} o x = ${fmt(Math.max(p, q))}`,
    `x = ${fmt(menor)} o x = ${fmt(menor)}`,
    `x = ${fmt(menor + 1)} o x = ${fmt(mayor)}`,
    `x = ${fmt(-menor)} o x = ${fmt(-mayor)}`,
  ];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── 12. Funciones — evaluar f(x) = mx + b en un punto ───────────────────────

function generarFuncion(): PreguntaModulo {
  const m = entero(2, 8);
  const b = entero(-10, 10);
  const xVal = entero(-6, 8);
  const resultado = m * xVal + b;
  const enunciado = `Si f(x) = ${m}x ${b >= 0 ? '+' : '−'} ${Math.abs(b)}, ¿cuánto es f(${xVal})?`;
  const correcta = fmt(resultado);
  const pasoClave = `Sustituyes x por ${xVal}: f(${xVal}) = ${m}(${xVal}) ${b >= 0 ? '+' : '−'} ${Math.abs(b)} = ${fmt(resultado)}.`;
  const distractores = [fmt(resultado - b), fmt(m + xVal + b), fmt(resultado + m), fmt(-resultado)];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── Camino de progreso (orden pedido por el usuario, 2026-08-17) ───────────
// El primero de la lista es el módulo gratis (MODULO_GRATIS_SLUG en lib/plan.ts
// lo toma dinámicamente de MODULOS[0]) — arrancar con lo más básico es la
// elección correcta para el plan Free.

export const MODULOS: Modulo[] = [
  {
    slug: 'expresiones',
    nombre: 'Expresiones',
    descripcion: 'Evaluar una expresión algebraica dando el valor de x.',
    ejemplo: {
      enunciado: 'Si x = 5, evalúa: 3x + 2',
      pasos: [
        { titulo: 'Sustituye x por su valor', detalle: '3(5) + 2' },
        { titulo: 'Resuelve la multiplicación primero', detalle: '15 + 2' },
        { titulo: 'Suma', detalle: '= 17' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarExpresion, cantidad),
  },
  {
    slug: 'operaciones',
    nombre: 'Operaciones',
    descripcion: 'Sumar y restar términos semejantes.',
    ejemplo: {
      enunciado: 'Simplifica: 7x + 3x',
      pasos: [
        { titulo: 'Verifica que son términos semejantes', detalle: 'Ambos tienen x' },
        { titulo: 'Suma solo los coeficientes', detalle: '7 + 3' },
        { titulo: 'Escribe el resultado con la x', detalle: '= 10x' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarOperacion, cantidad),
  },
  {
    slug: 'exponentes',
    nombre: 'Exponentes',
    descripcion: 'Las 3 leyes de potencias: multiplicar, dividir, elevar.',
    ejemplo: {
      enunciado: 'Simplifica: x³ · x²',
      pasos: [
        { titulo: 'Misma base, se multiplican', detalle: 'Base x en ambos' },
        { titulo: 'Suma los exponentes', detalle: '3 + 2 = 5' },
        { titulo: 'Escribe el resultado', detalle: '= x⁵' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarExponente, cantidad),
  },
  {
    slug: 'productos-notables',
    nombre: 'Productos notables',
    descripcion: 'Cuadrado de un binomio y diferencia de cuadrados.',
    ejemplo: {
      enunciado: 'Desarrolla: (x + 3)²',
      pasos: [
        { titulo: 'El primer término al cuadrado', detalle: 'x²' },
        { titulo: 'El doble producto', detalle: '+ 2(3)x = 6x' },
        { titulo: 'El segundo término al cuadrado', detalle: '+ 9 → x² + 6x + 9' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarProductoNotable, cantidad),
  },
  {
    slug: 'factorizacion',
    nombre: 'Factorización',
    descripcion: 'Encontrar los dos números que arman la expresión.',
    ejemplo: {
      enunciado: 'Factoriza: x² + 6x + 8',
      pasos: [
        { titulo: 'Busca 2 números que MULTIPLICADOS den el último término', detalle: '2 × 4 = 8' },
        { titulo: 'Verifica que esos mismos números SUMADOS den el término del medio', detalle: '2 + 4 = 6 ✓' },
        { titulo: 'Arma los dos paréntesis con esos números', detalle: '(x+2)(x+4)' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarFactorizacion, cantidad),
  },
  {
    slug: 'ecuaciones',
    nombre: 'Ecuaciones básicas',
    descripcion: 'Despejar x cuando suma o resta a un lado.',
    ejemplo: {
      enunciado: 'Resuelve: x + 6 = 14',
      pasos: [
        { titulo: 'Mira qué le está sumando a la x', detalle: 'Aquí es +6.' },
        { titulo: 'Pásalo al otro lado con signo contrario', detalle: 'x = 14 − 6' },
        { titulo: 'Resuelve la operación', detalle: 'x = 8' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarEcuacion, cantidad),
  },
  {
    slug: 'despejes',
    nombre: 'Despejes con signos',
    descripcion: 'Cuando x va multiplicada y hay que dividir.',
    ejemplo: {
      enunciado: 'Despeja x: 4x − 5 = 19',
      pasos: [
        { titulo: 'Pasa el número que resta, sumando', detalle: '4x = 19 + 5 = 24' },
        { titulo: 'El número que multiplica a x pasa dividiendo', detalle: 'x = 24 ÷ 4' },
        { titulo: 'Resuelve la división', detalle: 'x = 6' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarDespeje, cantidad),
  },
  {
    slug: 'inecuaciones',
    nombre: 'Inecuaciones',
    descripcion: 'Como una ecuación, pero cuidado al dividir por negativo.',
    ejemplo: {
      enunciado: 'Resuelve: −2x + 4 < 10',
      pasos: [
        { titulo: 'Despeja como una ecuación normal', detalle: '−2x < 6' },
        { titulo: 'Divides entre un número NEGATIVO: el signo se voltea', detalle: '< pasa a >' },
        { titulo: 'Escribe el resultado', detalle: 'x > −3' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarInecuacion, cantidad),
  },
  {
    slug: 'sistemas',
    nombre: 'Sistemas de ecuaciones',
    descripcion: 'Dos ecuaciones, dos incógnitas: x y y.',
    ejemplo: {
      enunciado: 'Resuelve: x + y = 10 ; x − y = 2',
      pasos: [
        { titulo: 'Suma las dos ecuaciones (la y se cancela)', detalle: '2x = 12' },
        { titulo: 'Despeja x', detalle: 'x = 6' },
        { titulo: 'Sustituye x en la primera para hallar y', detalle: 'y = 10 − 6 = 4' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarSistema, cantidad),
  },
  {
    slug: 'polinomios',
    nombre: 'Polinomios',
    descripcion: 'Multiplicar dos binomios — el camino inverso a factorizar.',
    ejemplo: {
      enunciado: 'Multiplica: (x+2)(x+5)',
      pasos: [
        { titulo: 'Suma los dos números para el término del medio', detalle: '2 + 5 = 7' },
        { titulo: 'Multiplica los dos números para el término final', detalle: '2 × 5 = 10' },
        { titulo: 'Arma el resultado', detalle: 'x² + 7x + 10' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarPolinomio, cantidad),
  },
  {
    slug: 'cuadraticas',
    nombre: 'Ecuaciones cuadráticas',
    descripcion: 'Resolver x² + bx + c = 0 factorizando primero.',
    ejemplo: {
      enunciado: 'Resuelve: x² − x − 6 = 0',
      pasos: [
        { titulo: 'Factoriza primero', detalle: '(x−3)(x+2) = 0' },
        { titulo: 'Cada paréntesis puede ser cero', detalle: 'x−3=0 o x+2=0' },
        { titulo: 'Resuelve cada uno', detalle: 'x = 3 o x = −2' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarCuadratica, cantidad),
  },
  {
    slug: 'funciones',
    nombre: 'Funciones',
    descripcion: 'Evaluar f(x) en un punto — la misma idea de Expresiones, con notación nueva.',
    ejemplo: {
      enunciado: 'Si f(x) = 2x + 1, ¿cuánto es f(4)?',
      pasos: [
        { titulo: 'Sustituye x por 4', detalle: 'f(4) = 2(4) + 1' },
        { titulo: 'Resuelve la multiplicación', detalle: '8 + 1' },
        { titulo: 'Suma', detalle: '= 9' },
      ],
    },
    generarPreguntas: (cantidad) => generarUnicas(generarFuncion, cantidad),
  },
];

export function getModulo(slug: string): Modulo | undefined {
  return MODULOS.find((m) => m.slug === slug);
}
