import type { Metadata } from "next";
import { Baloo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReferralCapture } from "@/components/referral/ReferralCapture";

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

// Copy sin promesa de resultado académico (revisión 2026-08-17): "aprueba tu
// examen" / "domina" / "a la primera" prometían un resultado que la app no
// puede garantizar — Google Ads y TikTok Ads prohíben afirmaciones de
// resultados improbables presentados como esperables, y el público de
// AlgebraX incluye menores de edad (mayor cuidado exigido). El copy ahora
// describe la HERRAMIENTA (entender el paso a paso, practicar) en vez de
// prometer el resultado (aprobar).
export const metadata: Metadata = {
  title: "AlgebraX — Entiende álgebra paso a paso, sin quedarte en blanco",
  description:
    "Practica álgebra entendiendo el porqué de cada paso. Sin castigos por equivocarte, sin videos de 40 minutos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${baloo2.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReferralCapture />
        {children}
      </body>
    </html>
  );
}
