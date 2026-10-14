// メインサイトと全デモサイトを 1 つの静的ファイル群にまとめる。
//   machi-studio/dist/            ← メイン (/)
//   machi-studio/dist/demos/<名前>/ ← 各デモ (/demos/<名前>/)
// 公開時は machi-studio/dist だけを配信すればよい。
import { execSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const demos = ['kito-coffee', 'komeya', 'akari', 'mugi-to-hibi', 'menya-gou', 'soda-biyori', 'hair-salon-niwa', 'patisserie-lune', 'stack-burger', 'trattoria-machi']; // 追加時はここに足す
const main = resolve(root, 'machi-studio');

const run = (cwd, env = {}) =>
  execSync('npm run build', { cwd, stdio: 'inherit', env: { ...process.env, ...env } });

for (const name of demos) {
  console.log(`\n=== build demo: ${name}`);
  run(resolve(root, name), { BASE_PATH: `/demos/${name}/` });
}

console.log('\n=== build main: machi-studio');
run(main);

const target = resolve(main, 'dist', 'demos');
rmSync(target, { recursive: true, force: true });
for (const name of demos) {
  const src = resolve(root, name, 'dist');
  if (!existsSync(src)) throw new Error(`${name}/dist がありません`);
  mkdirSync(resolve(target, name), { recursive: true });
  cpSync(src, resolve(target, name), { recursive: true });
}
console.log(`\n統合完了: ${main}/dist (demos: ${demos.join(', ')})`);
