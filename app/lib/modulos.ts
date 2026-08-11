// Banco de contenido de los 3 módulos MVP (ESTADO.md → "Funciones núcleo").
// Cada pregunta trae el paso exacto en el que se equivocan los estudiantes que
// fallan — eso es lo que el Descifrador de Pasos les muestra (nunca solo "mal").

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
  preguntas: PreguntaModulo[];
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
    preguntas: [
      {
        enunciado: 'Resuelve: x + 8 = 15',
        opciones: ['x = 7', 'x = 23', 'x = -7', 'x = 8'],
        correctaIndex: 0,
        pasoClave: 'El 8 pasa restando al otro lado: x = 15 − 8 = 7.',
      },
      {
        enunciado: 'Resuelve: x − 6 = 4',
        opciones: ['x = 10', 'x = -2', 'x = 2', 'x = 24'],
        correctaIndex: 0,
        pasoClave: 'El 6 pasa sumando al otro lado: x = 4 + 6 = 10.',
      },
      {
        enunciado: 'Resuelve: 20 = x + 12',
        opciones: ['x = 8', 'x = 32', 'x = -8', 'x = 12'],
        correctaIndex: 0,
        pasoClave: 'No importa el orden: el 12 pasa restando: x = 20 − 12 = 8.',
      },
      {
        enunciado: 'Resuelve: x + 15 = 9',
        opciones: ['x = -6', 'x = 6', 'x = 24', 'x = -24'],
        correctaIndex: 0,
        pasoClave: 'El 15 pasa restando: x = 9 − 15 = -6 (el resultado negativo es válido).',
      },
    ],
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
    preguntas: [
      {
        enunciado: 'Despeja x: 3x − 4 = 11',
        opciones: ['x = 5', 'x = 2.33', 'x = 21/3', 'x = -5'],
        correctaIndex: 0,
        pasoClave: 'Primero sumas 4 en ambos lados (3x = 15), luego divides entre 3.',
      },
      {
        enunciado: 'Despeja x: 2x + 6 = 20',
        opciones: ['x = 7', 'x = 13', 'x = 10', 'x = 4'],
        correctaIndex: 0,
        pasoClave: 'Restas 6 en ambos lados (2x = 14), luego divides entre 2.',
      },
      {
        enunciado: 'Despeja x: 5x = 30 − x',
        opciones: ['x = 5', 'x = 6', 'x = 25', 'x = -5'],
        correctaIndex: 0,
        pasoClave: 'Pasas la x del lado derecho sumando (6x = 30), luego divides entre 6.',
      },
      {
        enunciado: 'Despeja x: -2x + 3 = 9',
        opciones: ['x = -3', 'x = 3', 'x = 6', 'x = -6'],
        correctaIndex: 0,
        pasoClave: 'Restas 3 (-2x = 6), divides entre -2 — y el signo se invierte: x = -3.',
      },
    ],
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
    preguntas: [
      {
        enunciado: 'Factoriza: x² + 5x + 6',
        opciones: ['(x+2)(x+3)', '(x+1)(x+6)', '(x+5)(x+1)', '(x-2)(x-3)'],
        correctaIndex: 0,
        pasoClave: 'Buscas 2 números que multiplicados den 6 y sumados den 5: son 2 y 3.',
      },
      {
        enunciado: 'Factoriza: x² + 7x + 10',
        opciones: ['(x+2)(x+5)', '(x+1)(x+10)', '(x+7)(x+3)', '(x-2)(x-5)'],
        correctaIndex: 0,
        pasoClave: 'Buscas 2 números que den 10 al multiplicar y 7 al sumar: son 2 y 5.',
      },
      {
        enunciado: 'Factoriza: x² − x − 6',
        opciones: ['(x-3)(x+2)', '(x+3)(x-2)', '(x-6)(x+1)', '(x+6)(x-1)'],
        correctaIndex: 0,
        pasoClave: 'Buscas 2 números que multiplicados den -6 y sumados den -1: son -3 y 2.',
      },
      {
        enunciado: 'Factoriza: x² + 2x − 8',
        opciones: ['(x+4)(x-2)', '(x-4)(x+2)', '(x+8)(x-1)', '(x-8)(x+1)'],
        correctaIndex: 0,
        pasoClave: 'Buscas 2 números que den -8 al multiplicar y 2 al sumar: son 4 y -2.',
      },
    ],
  },
];

export function getModulo(slug: string): Modulo | undefined {
  return MODULOS.find((m) => m.slug === slug);
}
