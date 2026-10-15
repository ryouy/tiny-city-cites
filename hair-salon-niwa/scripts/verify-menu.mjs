// 仕様書(Markdown)のメニュー・営業情報・文言と dist のHTMLを機械的に突き合わせる。
// 使い方: npm run build && npm run verify [仕様書パス]
import { readFileSync } from 'node:fs';

const specPath = process.argv[2] ?? '../siyosyo/HAIR_SALON_NIWA_Claude_Code.md';
const spec = readFileSync(specPath, 'utf8');
const raw = (p) => readFileSync(`dist/${p}index.html`, 'utf8');
const toLines = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&#x27;/g, "'")
    .split('\n').map((s) => s.trim()).filter(Boolean);
const pages = ['', 'menu/', 'styles/', 'staff/', 'access/', 'reserve/'];
const html = Object.fromEntries(pages.map((p) => [p, raw(p)]));
const lines = Object.fromEntries(pages.map((p) => [p, toLines(html[p])]));
const flat = Object.fromEntries(pages.map((p) => [p, lines[p].join('').replace(/\s+/g, '')]));

let fail = 0;
let count = 0;
const ng = (m) => { fail++; console.error(`NG: ${m}`); };
const section = (from, to) => spec.slice(spec.indexOf(from), spec.indexOf(to));
const near = (ls, name, others) => {
  const idxs = ls.map((l, i) => (l === name ? i : -1)).filter((i) => i >= 0);
  return idxs.length > 0 && idxs.some((i) => others.every((o) => ls.slice(i, i + 6).includes(o)));
};

// 1) メニュー表(§4)を /menu と reserve に対して確認(名前・所要時間・料金・備考が近接)
for (const row of section('## 4. メニュー', '## 5. スタイリスト').split('\n')) {
  const c = row.split('|').map((s) => s.trim());
  if (c.length < 7 || !/^[a-z]+\d+$/.test(c[1])) continue;
  const [, , name, price, dur, note] = c;
  count++;
  const ok = near(lines['menu/'], name, [dur, price, note]);
  if (ok) console.log(`OK: ${name} ${price} ${dur} ${note}`); else ng(`menu: ${name} ${price} ${dur} ${note}`);
  if (!lines['reserve/'].some((l) => l === name) && !html['reserve/'].includes(`data-label="${name}"`)) ng(`reserve: ${name}`);
}

// 2) スタイル(§6)・スタッフ(§5)
for (const row of section('## 6. スタイル', '## 7. 情報設計').split('\n')) {
  const c = row.split('|').map((s) => s.trim());
  if (c.length < 6 || !/^style\d+$/.test(c[1])) continue;
  const [, , name, cat] = c;
  count++;
  const catJa = { Short: 'ショート', Bob: 'ボブ', Medium: 'ミディアム', Long: 'ロング', "Men's": 'メンズ' }[cat];
  if (!near(lines['styles/'], catJa, [name])) ng(`style: ${name}`);
  if (!lines['styles/'].includes(catJa)) ng(`style cat: ${catJa}`);
}
for (const w of ['佐伯 まどか', 'オーナースタイリスト', '美容師歴12年', '高野 悠', 'スタイリスト', '美容師歴7年', 'ナチュラルなレイヤー', 'メンズカット', '頭皮ケア', '骨格に馴染むショート・ボブ', '柔らかなカラー'])
  if (!lines['staff/'].includes(w)) ng(`staff: ${w}`);

// 3) 営業情報・固定文言
const access = lines['access/'];
const musts = [['access/', ['9:30〜18:30', 'カット17:30', 'カット＋カラー16:00', '月曜日・第1・第3日曜日', '2席（半個室風の配置）', '2台', '現金、カード、QR決済', '福島県会津若松市の住宅エリア']]];
for (const [p, ws] of musts) for (const w of ws) if (!lines[p].includes(w)) ng(`access: ${w}`);
void access;
const home = flat[''];
for (const t of [
  '福島県会津若松市の美容室です。2席、完全予約制。', 'メニュー・料金を見る', 'スタイルを見る',
  'お店について', 'カット、カラー、パーマ、トリートメント、ヘッドスパを行っています。施術の前に、髪の悩みや普段のセット方法を伺います。',
  'はじめての方へ', '髪型が決まっていなくても、相談しながら決められます。',
  'カット5,000円台〜、カラー7,000円台〜',
  '予約する',
].map((s) => s.replace(/\s+/g, ''))) if (!home.includes(t)) ng(`home missing: ${t}`);
// FAQ: 質問文は仕様書どおり。回答は平易な文に書き換え済み(事実=所要時間の目安、同伴相談可、空き枠に応じて対応)
const faqRows = [...section('## 11. FAQ', '## 12. 技術').matchAll(/\*\*Q\. (.+?)\*\*\s*\nA\. (.+)/g)].map((m) => [m[1], m[2]]);
const faqAns = ['はい。髪質や普段のスタイリングを伺って、一緒に決めます。', faqRows[1][1], '同伴でのご相談も可能です。', '空き枠に応じて対応いたします。'];
faqRows.forEach(([q], i) => {
  count++;
  if (!flat['access/'].includes(q.replace(/\s+/g, '')) || !flat['access/'].includes(faqAns[i].trim())) ng(`faq: ${q}`);
});
if (!flat['reserve/'].includes('予約は成立していません')) ng('予約ページの送信されない旨の1行');
if (/予約完了|ご予約ありがとう|デモを完了|これはデモです/.test(flat['reserve/'])) ng('完了表示らしき文言');
const disclaimer = '架空店舗のポートフォリオ用デモサイトです。実在店舗ではありません。店名・人物・料金・店舗情報は創作です。';
for (const p of pages) {
  const h = html[p];
  if (/class="band"|PORTFOLIODEMO|PORTFOLIO DEMO/.test(h)) ng(`${p || '/'} 上部の帯が残っている`);
  if (!flat[p].includes(disclaimer)) ng(`${p || '/'} フッター免責(1行)`);
  // フッター免責とメタ情報以外に「デモ・架空・サンプル」の語が残っていないこと(予約ページの注記は別途許可)
  const body = h.replace(/<head>[\s\S]*?<\/head>/, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<footer[\s\S]*?<\/footer>/, '');
  const txt = body.replace(/<[^>]+>/g, '');
  if (/デモ|架空|サンプル|ダミー|デモ用/.test(txt)) ng(`${p || '/'} 本文に「デモ/架空/サンプル」が残っている`);
  const head = (h.match(/<head>[\s\S]*?<\/head>/) ?? [''])[0].replace(/<script[\s\S]*?<\/script>/g, '');
  if (/デモ|架空|サンプル/.test(head.replace(/<meta name="robots"[^>]*>/, ''))) ng(`${p || '/'} head に「デモ/架空」が残っている`);
}
// 地図キャプション: 「会津若松市周辺の地図」のみ
if (!/<figcaption[^>]*>\s*会津若松市周辺の地図\s*<\/figcaption>/.test(html['access/'])) ng('地図キャプションは「会津若松市周辺の地図」のみ');
if (/店舗の所在地ではありません/.test(html['access/'])) ng('地図の旧注記が残っている');

// 3b) 情緒語・英字キャッチの再混入防止
const poem = /こだわり|丁寧|心地よ|ほっと|そっと|特別な|ひととき|物語|約束|想い|寄り添|彩る|紡ぐ|A PLACE TO|YOURSELF/;
for (const p of pages) { const m = lines[p].join('\n').match(poem); if (m) ng(`${p || '/'} 情緒語: ${m[0]}`); }

// 4) 禁止事項(全ページ)
const bad = [
  [/href="tel:/, 'tel リンク'], [/href="mailto:/, 'mailto リンク'], [/<form[\s>]/, 'form'], [/application\/ld\+json/, '構造化データ'],
  [/rel="canonical"/, 'canonical'], [/instagram|twitter\.com|facebook|tabelog|line\.me|hotpepper/i, 'SNS/外部サービス'],
  [/〒|\b\d{2,4}-\d{2,4}-\d{3,4}\b/, '郵便番号/電話番号らしき文字列'], [/<a [^>]*href="https?:/, '外部リンク(a)'],
];
for (const p of pages) {
  const h = html[p];
  for (const [re, label] of bad) if (re.test(h)) ng(`${p || '/'} forbidden: ${label}`);
  if (!/<meta name="robots" content="noindex,nofollow"/.test(h)) ng(`${p || '/'} robots`);
  if ((h.match(/<h1[\s>]/g) ?? []).length !== 1) ng(`${p || '/'} h1 は1つ`);
  const ifr = h.match(/<iframe[^>]*>/g) ?? [];
  const allowed = p === 'access/';
  if (ifr.length !== (allowed ? 1 : 0) || ifr.some((i) => !/src="https:\/\/www\.google\.com\/maps\/embed\?/.test(i))) ng(`${p || '/'} iframe(許可は Google マップ埋め込み1点のみ。アクセスのみ): ${ifr.length}`);
  if (/¥/.test(lines[p].join(''))) ng(`${p || '/'} ¥ 表記`);
}

console.log(`\n${count} spec rows checked, ${fail} failures`);
process.exit(fail ? 1 : 0);
