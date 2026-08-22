import type { MetadataRoute } from 'next';

const SITE_URL = 'https://algebrax.nymystudio.com';

// Solo páginas públicas e indexables — /app, /onboarding (con estado de
// sesión), /entrar y /paywall se excluyen a propósito: son pantallas de
// flujo, no destinos de búsqueda, y no aportan nada a alguien que llega
// desde Google buscando la app en general (mejor mandarlo a "/").
export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ['', '/privacidad', '/terminos', '/reembolsos', '/aviso-ia'];
  return paginas.map((ruta) => ({
    url: `${SITE_URL}${ruta}`,
    lastModified: new Date(),
    changeFrequency: ruta === '' ? 'weekly' : 'yearly',
    priority: ruta === '' ? 1 : 0.3,
  }));
}
