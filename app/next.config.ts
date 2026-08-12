import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El indicador flotante de Next (círculo "N") solo aparece en dev — se
  // desactiva para que las capturas a 375px del revisor-visual no lo
  // confundan con un control real de la app.
  devIndicators: false,
};

export default nextConfig;
