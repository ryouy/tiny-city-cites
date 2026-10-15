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
// 新方針: 上部の注記帯なし・地図キャプション・「デモ」等の言い回しはフッター免責以外に出さない
const disc = 'このWebサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在する店舗・商品・サービスではありません。';
const rest = text.replace(disc, '');
for (const w of ['デモ', '架空', 'サンプル']) {
  if (rest.includes(w)) { fail++; console.error(`NG: 「${w}」が免責文以外に残っています`); }
}
if (html.includes('demo-note')) { fail++; console.error('NG: 上部の注記帯が残っています'); }
if (!lines.includes('会津若松市周辺の地図')) { fail++; console.error('NG: 地図キャプション'); }
if ((html.match(/<iframe[\s>]/g) ?? []).length !== 1) { fail++; console.error('NG: iframe は1点のみ'); }
// 追加検査: noindex / 禁止要素 / 看板コピー / 物語の原文
const must2 = ['<meta name="robots" content="noindex,nofollow">'];
for (const m of must2) if (!html.includes(m)) { fail++; console.error(`NG missing html: ${m}`); }
for (const m of spec.matchAll(/^- \*\*(.+?)\*\*: `(.+?)`$/gm)) {
  if (!text.includes(m[2])) { fail++; console.error(`NG signature copy: ${m[1]}`); }
}
for (const m of spec.matchAll(/^(?:見出し|本文): `(.+?)`$/gm)) {
  if (!text.includes(m[1])) { fail++; console.error(`NG story text: ${m[1].slice(0, 20)}...`); }
}
if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) { fail++; console.error('NG: h1 must be exactly one'); }
for (const bad of [/href="tel:/i, /href="mailto:/i, /<form[\s>]/i, /Since\s?\d/i, /Our Story/i, /itemtype=|application\/ld\+json/i, /rel="canonical"/i, /(instagram|twitter|facebook)\.com/i]) {
  if (bad.test(html)) { fail++; console.error(`NG forbidden pattern: ${bad}`); }
}
console.log(`\n${count} items checked, ${fail} failures`);
process.exit(fail ? 1 : 0);
