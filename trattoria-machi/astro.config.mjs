// @ts-check
import { defineConfig } from 'astro/config';

// 単体起動は '/'、メインサイトに同居させるビルドでは BASE_PATH=/demos/trattoria-machi/ を指定する
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
});
