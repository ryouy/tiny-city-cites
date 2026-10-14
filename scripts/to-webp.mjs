// 各サイトの public/images 配下の PNG / JPG を WebP に変換し、元ファイルを削除する。
// 画像生成ツールが PNG を置いたあとに `npm run images` で実行する。
// 変換後のサイズ(幅・高さ)は元と同じ。og.png などの OGP 画像(public 直下)は対象外。
import { createRequire } from 'node:module';
import { existsSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projects = readdirSync(root).filter((d) => existsSync(join(root, d, 'package.json')));
const host = projects.find((d) => existsSync(join(root, d, 'node_modules', 'sharp')));
if (!host) throw new Error('sharp が見つかりません。いずれかのプロジェクトで npm install を実行してください。');
const sharp = createRequire(join(root, host, 'package.json'))('sharp');

const found = [];
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(png|jpe?g)$/i.test(e.name)) found.push(p);
  }
};
for (const d of projects) {
  const dir = join(root, d, 'public', 'images');
  if (existsSync(dir)) walk(dir);
}

let before = 0;
let after = 0;
for (const f of found) {
  const out = f.replace(/\.(png|jpe?g)$/i, '.webp');
  await sharp(f).webp({ quality: 82, effort: 5 }).toFile(out);
  before += statSync(f).size;
  after += statSync(out).size;
  unlinkSync(f);
  console.log(`${relative(root, f)} -> .webp`);
}
console.log(found.length ? `${found.length} 枚変換: ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB` : '変換する PNG / JPG はありません。');
