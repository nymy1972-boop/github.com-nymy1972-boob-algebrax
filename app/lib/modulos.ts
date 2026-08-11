// Banco de contenido de los 3 módulos MVP (ESTADO.md → "Funciones núcleo").
// Cada pregunta se GENERA (no es una lista fija): así el estudiante nunca se
// topa con el mismo ejercicio dos veces seguidas, aunque complete el módulo y
// vuelva a practicar. Cada pregunta trae el paso exacto en el que se
// equivocan los estudiantes que fallan — eso es lo que el Descifrador de
// Pasos les muestra (nunca solo "mal").

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

// ── Módulo 1: Ecuaciones básicas (x ± a = b) ───────────────────────────────

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
  const distractores = [
    `x = ${fmt(-x)}`, // sign flip
    `x = ${fmt(suma ? b + a : b - a)}`, // aplicó la operación contraria
    `x = ${fmt(a)}`, // confunde x con a
    `x = ${fmt(x + 1)}`,
  ];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── Módulo 2: Despejes con signos (a·x ± b = c) ────────────────────────────

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
  const distractores = [
    `x = ${fmt(Math.round(c / a))}`, // olvidó mover el término independiente
    `x = ${fmt(-x)}`, // sign flip
    `x = ${fmt(x + a)}`,
    `x = ${fmt(suma ? x - 1 : x + 1)}`,
  ];
  const { opciones, correctaIndex } = armarOpciones(correcta, distractores);
  return { enunciado, opciones, correctaIndex, pasoClave };
}

// ── Módulo 3: Factorización (x² + (p+q)x + pq = (x+p)(x+q)) ───────────────

function factorTexto(p: number): string {
  return p < 0 ? `(x-${Math.abs(p)})` : `(x+${p})`;
}

function generarFactorizacion(): PreguntaModulo {
  let p = 0;
  let q = 0;
  // evita p=0, q=0 o p===q (para que el enunciado no sea un binomio al cuadrado disfrazado)
  while (p === 0 || q === 0 || p === q) {
    p = entero(-9, 9);
    q = entero(-9, 9);
  }
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

export const MODULOS: Modulo[] = [
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
];

export function getModulo(slug: string): Modulo | undefined {
  return MODULOS.find((m) => m.slug === slug);
}
