import type { APIRoute } from 'astro';

// 架空デモのため全クローラーを拒否
export const GET: APIRoute = () =>
  new Response('User-agent: *\nDisallow: /\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
