import { services } from '../../data/landing'
import { siteConfig } from '../../data/site'

export default defineEventHandler((event: Parameters<typeof setHeader>[0]) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  const serviceUrls = services
    .map(
      (s) => `  <url>
    <loc>${siteConfig.url}/servicios/${s.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.url}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteConfig.url}/servicios</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
${serviceUrls}
  <url>
    <loc>${siteConfig.url}/contacto</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`
})
