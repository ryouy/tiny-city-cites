// package.json を持つ全プロジェクトの依存関係を `npm ci` で入れる(Vercel の Install Command 用)。
import { execSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projects = readdirSync(root).filter((d) => existsSync(join(root, d, 'package.json')));
for (const d of projects) {
  console.log(`\n=== npm ci: ${d}`);
  execSync('npm ci --no-audit --no-fund', { cwd: join(root, d), stdio: 'inherit' });
}
