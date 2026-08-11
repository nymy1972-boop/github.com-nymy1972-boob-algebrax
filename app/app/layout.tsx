import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Nombres deliberadamente distintos de --font-display/--font-body: esos ya
// son variables propias de components/landing/tokens.css (el brand kit) —
// usar el mismo nombre aquí pisaría ese valor en el :root (colisión real).
const baloo2 = Baloo_2({
  variable: "--font-baloo2",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AlgebraX — Aprueba tu examen de álgebra sin quedarte en blanco",
  description:
    "Entiende el porqué de cada paso y aprueba tu examen de álgebra a la primera. Sin castigos por equivocarte, sin videos de 40 minutos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${baloo2.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
