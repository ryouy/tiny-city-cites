import type { APIRoute } from 'astro';
import { site } from '../config/site';

// 単一ページ構成。公開URL(site.url)が未設定のときは空の urlset を返す。
export const GET: APIRoute = () => {
  const base = site.url.replace(/\/$/, '');
  const urls = base ? `<url><loc>${base}/</loc></url>` : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
