import type { APIRoute } from 'astro';
import { site } from '../config/site';

export const GET: APIRoute = () => {
  const base = site.url.replace(/\/$/, '');
  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /demos/'];
  if (base) lines.push('', `Sitemap: ${base}/sitemap.xml`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
