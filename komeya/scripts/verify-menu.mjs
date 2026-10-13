// 仕様書(Markdown)のメニュー表と dist/index.html を機械的に突き合わせる。
// 使い方: npm run build && node scripts/verify-menu.mjs [仕様書パス]
import { readFileSync } from 'node:fs';

const specPath = process.argv[2] ?? '../siyosyo/KOMEYA_Claude_Code.md';
const spec = readFileSync(specPath, 'utf8');
const html = readFileSync('dist/index.html', 'utf8');
const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&');
const lines = text.split('\n').map((s) => s.trim()).filter(Boolean);

const start = spec.indexOf('## 4. 全メニュー');
const end = spec.indexOf('### 看板商品コピー');
const section = spec.slice(start, end);
let fail = 0;
let count = 0;
for (const row of section.split('\n')) {
  const m = row.match(/^\|\s*([^|]+?)\s*\|\s*(¥[\d,]+)\s*\|/);
  if (!m) continue;
  const [, name, price] = m;
  count++;
  // 名前の行の直後〜数行以内に価格があること(同じ品の周辺で検証)
  const idxs = lines.map((l, i) => (l === name || l.startsWith(name) ? i : -1)).filter((i) => i >= 0);
  const ok = idxs.some((i) => lines.slice(i, i + 4).includes(price));
  if (!ok) { fail++; console.error(`NG: ${name} ${price}`); } else console.log(`OK: ${name} ${price}`);
}
// 紹介文
for (const row of section.split('\n')) {
  const m = row.match(/^\|\s*([^|]+?)\s*\|\s*¥[\d,]+\s*\|\s*([^|]+?)\s*\|$/);
  if (!m || m[1] === '名前') continue;
  let desc = m[2].replace(/（内容は架空設定.*）$/, '');
  if (!lines.includes(desc)) { fail++; console.error(`NG desc: ${m[1]} -> ${desc}`); }
}
for (const must of ['定食にはごはん・味噌汁・小鉢・漬物が付きます。', '+¥100', '税込', 'L.O. 14:00', 'L.O. 19:30', '11:00–14:30', '17:00–20:00', '毎週日曜', 'このWebサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在する店舗・商品・サービスではありません。']) {
  if (!text.includes(must)) { fail++; console.error(`NG missing: ${must}`); }
}
console.log(`\n${count} items checked, ${fail} failures`);
process.exit(fail ? 1 : 0);
