// 仕様書(Markdown)のメニュー・コース表と dist/index.html を機械的に突き合わせる。
// 使い方: npm run build && npm run verify [仕様書パス]
import { readFileSync } from 'node:fs';

const specPath = process.argv[2] ?? '../siyosyo/AKARI_Claude_Code.md';
const spec = readFileSync(specPath, 'utf8');
const html = readFileSync('dist/index.html', 'utf8');
const text = html
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]+>/g, '\n')
  .replace(/&amp;/g, '&');
const lines = text.split('\n').map((s) => s.trim()).filter(Boolean);
const flat = lines.join('');

let fail = 0;
let count = 0;
const ng = (m) => {
  fail++;
  console.error(`NG: ${m}`);
};
const yen = (n) => `¥${Number(n).toLocaleString('en-US')}`;

// --- お品書き(3 表) ---
const menuStart = spec.indexOf('## 3. お品書き');
const menuEnd = spec.indexOf('## 4. コース料理');
for (const row of spec.slice(menuStart, menuEnd).split('\n')) {
  const m = row.match(/^\|\s*([a-z0-9]+)\s*\|\s*([^|]+?)\s*\|\s*(\d+)(〜?)\s*\|\s*([^|]+?)\s*\|$/);
  if (!m) continue;
  const [, id, name, price, from, desc] = m;
  count++;
  const want = yen(price);
  const idxs = lines.map((l, i) => (l === name ? i : -1)).filter((i) => i >= 0);
  // 品名 → 説明 → 価格(「税込」ラベルを挟む)の順で出ること
  const ok = idxs.some((i) => lines[i + 1] === desc.replace(/（架空の目安）/, '') && lines.slice(i + 2, i + 5).includes(want) && (!from || lines.slice(i + 2, i + 7).includes('〜')));
  if (!ok) ng(`menu ${id} ${name} ${want}${from} / ${desc}`);
  else console.log(`OK: ${name} ${want}${from}`);
}

// --- コース ---
const cStart = spec.indexOf('## 4. コース料理');
const cEnd = spec.indexOf('## 5. 予約導線');
for (const row of spec.slice(cStart, cEnd).split('\n')) {
  const m = row.match(/^\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/);
  if (!m || m[1] === 'コース') continue;
  const [, name, price, items, cond] = m;
  count++;
  const i = lines.indexOf(name);
  if (i < 0) {
    ng(`course name ${name}`);
    continue;
  }
  const block = lines.slice(i, i + 30);
  if (!block.includes(yen(price))) ng(`course price ${name} ${yen(price)}`);
  for (const it of items.split('、')) if (!block.includes(it)) ng(`course item ${name}: ${it}`);
  if (!block.includes(cond)) ng(`course cond ${name}: ${cond}`);
  if (!fail) console.log(`OK: ${name} ${yen(price)} ${items}`);
}

// --- 必須文言 ---
const must = [
  '火を囲み、酒を愉しむ。',
  'SUMIBI / SAKE / SEASONAL CUISINE',
  '炭火の香りと、会津の一杯。季節を味わう、静かな夜を。',
  'お品書きを見る',
  'コースのご案内',
  '火が引き出す、素材の旨み。',
  '炭の状態を見極め、火との距離を調整しながら焼き上げる。シンプルな料理ほど、素材と火入れの違いが現れます。ひと口目の香りから、最後の余韻まで。灯ならではの一皿をお届けします。',
  '今夜の一杯に、会津の地酒を。',
  '料理との相性を考え、季節に合わせて日本酒を入れ替えています。飲み比べから、お料理に寄り添う一杯まで。その日の気分に合わせてお楽しみください。',
  '火を眺める、穏やかな時間。',
  '炭火の気配を感じるカウンター席。会話を楽しむテーブル席。少人数のお集まりには半個室もご用意しています。',
  '本サイトは架空店舗「炭火と酒 灯」を題材としたWeb制作デモです。実店舗・予約・営業は存在しません。',
  'ご予約について',
  '予約の入力画面を開く',
  'この画面から予約は送信・確定されません。',
  '会津若松市周辺の地図',
  '17:30–23:00',
  'お料理 22:00／お飲み物 22:30',
  '毎週日曜日',
  '4,000–6,000円',
  '22席（カウンター8／テーブル8／半個室6）',
];
for (const s of must) if (!flat.includes(s)) ng(`missing text: ${s}`);

// --- 禁止事項 ---
if (html.includes('demo-band')) ng('top band remains');
for (const w of ['【架空', '(架空', '（架空', 'サンプル', 'デモ用', '店舗の所在地ではありません', 'ポートフォリオ用の操作デモ']) {
  if (flat.includes(w)) ng(`demo wording remains: ${w}`);
}
// 「デモ」「架空」は免責文1行(フッター)のみ
const rest = flat.replace('本サイトは架空店舗「炭火と酒 灯」を題材としたWeb制作デモです。実店舗・予約・営業は存在しません。', '');
if (/デモ|架空/.test(rest)) ng('デモ/架空 appears outside the footer disclaimer');
if ((html.match(/<iframe/g) ?? []).length !== 1) ng('iframe count != 1');
for (const bad of ['予約完了', '予約確定しました', 'tel:', 'mailto:', 'LocalBusiness', 'application/ld+json']) {
  if (html.includes(bad)) ng(`forbidden: ${bad}`);
}
if (!html.includes('noindex')) ng('noindex missing');
if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) ng('h1 count != 1');

console.log(`\n${count} items checked, ${fail} failures`);
process.exit(fail ? 1 : 0);
