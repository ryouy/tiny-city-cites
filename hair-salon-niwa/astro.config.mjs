// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// 単体起動は '/'、メインサイトに同居させるビルドでは BASE_PATH=/demos/hair-salon-niwa/ を指定する
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
});
