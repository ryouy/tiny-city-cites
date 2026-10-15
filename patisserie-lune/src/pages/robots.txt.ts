import type { APIRoute } from 'astro';

// 全クローラーを拒否(meta robots の noindex,nofollow と併用)
export const GET: APIRoute = () =>
  new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
