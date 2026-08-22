import type { MetadataRoute } from 'next';

const SITE_URL = 'https://algebrax.nymystudio.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // La app interna y el flujo de compra no aportan nada indexados —
      // además /app requiere sesión real para casi todo, así que un rastreador
      // solo perdería tiempo ahí.
      disallow: ['/app', '/admin', '/api', '/entrar'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
