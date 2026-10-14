// 仕様書(Markdown)のメニュー・営業情報・文言と dist のHTMLを機械的に突き合わせる。
// 使い方: npm run build && npm run verify [仕様書パス]
import { readFileSync } from 'node:fs';

const specPath = process.argv[2] ?? '../siyosyo/STACK_BURGER_Claude_Code.md';
const spec = readFileSync(specPath, 'utf8');
const html = readFileSync('dist/index.html', 'utf8');
const lines = html
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]+>/g, '\n')
  .replace(/&amp;/g, '&')
  .replace(/&#39;|&#x27;/g, "'")
  .split('\n').map((s) => s.trim()).filter(Boolean);
const flat = lines.join('').replace(/\s+/g, '');
const norm = (s) => s.replace(/[()（）]/g, (c) => ({ '(': '(', ')': ')', '（': '(', '）': ')' })[c]).replace(/\s+/g, '');
const flatN = norm(flat);

let fail = 0;
let count = 0;
const ng = (m) => { fail++; console.error(`NG: ${m}`); };
const section = (from, to) => spec.slice(spec.indexOf(from), spec.indexOf(to));
const near = (name, others) => {
  const idxs = lines.map((l, i) => (l === name ? i : -1)).filter((i) => i >= 0);
  return idxs.some((i) => others.every((o) => lines.slice(i, i + 8).some((l) => l.replace(/\s+/g, '').includes(o.replace(/\s+/g, '')))));
};

// 1) 商品表(§3): 商品名・説明・価格が近接していること。バッジは「人気No.1（※…）」の先頭部分
const rows = (from, to) => section(from, to).split('\n').map((r) => r.split('|').map((s) => s.trim())).filter((c) => c.length > 3 && /^¥/.test(c[3] ?? '') || c.length > 3 && /^¥/.test(c[2] ?? ''));
for (const c of rows('### BURGERS', '### SIDES')) {
  const [, , name, price, desc, badge] = c;
  count++;
  const b = badge ? badge.replace(/（.*$/, '') : '';
  const others = [price, desc, ...(b ? [b] : [])];
  if (near(name, [desc, price]) || near(name, others.slice(0, 2))) console.log(`OK: ${name} ${price}`); else ng(`burger: ${name} ${price} ${desc}`);
  if (b && !flat.includes(b)) ng(`badge: ${b}`);
}
for (const c of rows('### SIDES', '### DRINKS')) {
  const [, name, price, desc] = c;
  count++;
  if (near(name, [desc, price])) console.log(`OK: ${name} ${price}`); else ng(`side: ${name} ${price} ${desc}`);
}
for (const c of rows('### DRINKS', '### SETS')) {
  const [, name, price] = c;
  count++;
  if (near(name, [price])) console.log(`OK: ${name} ${price}`); else ng(`drink: ${name} ${price}`);
}

// 2) セット・追加料金(§3 SETS & ADD-ONS): 金額が表示と builder データの両方にあること
const addons = [['ポテト＋対象ドリンク', '480'], ['ポテト大盛り', '150'], ['チーズ追加', '150'], ['パティ追加', '350'], ['ベーコン追加', '200'], ['ハラペーニョ追加', '100']];
const data = JSON.parse(html.match(/<script type="application\/json" id="builder-data">([\s\S]*?)<\/script>/)[1]);
for (const [label, yen] of addons) {
  count++;
  const specOk = norm(section('### SETS', '## 4.')).includes(`${label}`) || spec.includes(label);
  const specPrice = new RegExp(`${label}[^。\\n]*?＋¥${yen}|＋¥${yen}[^。\\n]*${label}|${label}.{0,12}＋¥${yen}`).test(spec) || (label === 'ポテト＋対象ドリンク' && spec.includes('＋¥480'));
  if (!specOk || !specPrice) ng(`spec addon: ${label} ${yen}`);
  const shown = lines.some((l, i) => l.includes(label) && lines.slice(i, i + 4).some((x) => x.replace(/\s+/g, '').includes(`＋¥${yen}`)));
  if (!shown) ng(`addon 表示: ${label} ＋¥${yen}`);
}
const dm = { cheese: 150, patty: 350, bacon: 200, jalapeno: 100 };
for (const t of data.toppings) if (dm[t.id] !== t.price) ng(`builder topping ${t.id} ${t.price}`);
if (data.set !== 480 || data.large !== 150) ng('builder set/large');
if (data.burgers.find((b) => b.id === 'kids')?.setEligible !== false) ng('kids はセット対象外');
if (data.burgers.length !== 6 || data.burgers[0].id !== 'classic') ng('builder base 初期値/件数');

// 3) 営業情報(§1)
for (const w of ['11:00–20:00(フードL.O.19:30)', '水曜日(不定休は告知欄に掲載する想定)', '24席(カウンター6、テーブル18)', '4台(架空設定)', '現金・クレジットカード・QRコード決済(架空設定)', '1,200–2,000円程度(想定)', '2024年6月(架空)', '店主1名＋スタッフ3名の個人経営', 'STACK BURGER', 'スタックバーガー'].map(norm)) {
  count++;
  if (!flatN.includes(w)) ng(`info: ${w}`);
}
for (const t of ['SMASH IT. STACK IT. LOVE IT.', 'かぶりつけ、うまさを重ねろ。', '焼きたての香ばしさも、とろけるチーズも、遠慮はいらない。街のスマッシュバーガー、STACK BURGER。', 'MENUを見る', 'お店について',
  'ひと口でわかる、鉄板のうまさ。', 'パティを熱い鉄板に押しつけて、一気に焼き上げる。表面はカリッと香ばしく、中には肉の旨み。バンズ、チーズ、野菜、ソースを重ねて、できたてを頬張る。それが、STACKのいちばんおいしい食べ方です。',
  '迷ったら、ダブルで。', '人気のダブルチーズ・スタックは、重ねたパティとチーズの一体感が主役。ボリュームはしっかり、それでいて最後のひと口まで飽きないバランスを目指しました。',
  '好きな場所で、思いきり。', 'バーガーもサイドもテイクアウトOK。お昼ごはんにも、家での映画時間にも。', '※本サイトはデモのため注文は受け付けていません。',
  '今日のごはんは、バーガーにしよう。', 'ひとりでも、友だちとでも。お腹を空かせて、気軽にどうぞ。', 'これは注文ではありません',
  'STACK BURGER｜架空店舗のWebサイト制作デモです。実在店舗ではなく、注文・予約・問い合わせは受け付けていません。', '架空店舗のデモサイトです。注文・予約・問い合わせは受け付けていません。'].map(norm)) {
  count++;
  if (!flatN.includes(t)) ng(`text missing: ${t}`);
}
if (!/<title>STACK BURGER \| 架空バーガーショップ デモサイト<\/title>/.test(html)) ng('title');

// 4) 禁止事項
const bad = [
  [/href="tel:/, 'tel リンク'], [/href="mailto:/, 'mailto リンク'], [/<form[^>]*action=/, 'form action'], [/application\/ld\+json/, '構造化データ'],
  [/rel="canonical"/, 'canonical'], [/instagram|twitter\.com|facebook|tabelog|line\.me|hotpepper|gurunavi/i, 'SNS/外部サービス'],
  [/〒|\b\d{2,4}-\d{2,4}-\d{3,4}\b/, '郵便番号/電話番号らしき文字列'], [/<a [^>]*href="https?:/, '外部リンク(a)'],
  [/注文完了|注文を確定しました|ご予約完了|決済完了/, '注文/決済完了表示'], [/<input[^>]*type="(text|tel|email|password)"/, '個人情報入力欄'],
];
for (const [re, label] of bad) if (re.test(html)) ng(`forbidden: ${label}`);
if (!/<meta name="robots" content="noindex,nofollow"/.test(html)) ng('robots');
if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) ng('h1 は1つ');
const ifr = html.match(/<iframe[^>]*>/g) ?? [];
if (ifr.length !== 1 || !/src="https:\/\/www\.google\.com\/maps\/embed\?/.test(ifr[0])) ng(`iframe(許可は Google マップ埋め込み1点のみ): ${ifr.length}`);
// 価格はすべて仕様書にある金額か(¥n の集合チェック)
const specPrices = new Set([...spec.matchAll(/¥([\d,]+)/g)].map((m) => m[1]));
const htmlPrices = new Set([...lines.join(' ').matchAll(/¥([\d,]+)/g)].map((m) => m[1]));
for (const p of htmlPrices) if (!specPrices.has(p)) ng(`仕様書に無い価格: ¥${p}`);

console.log(`\n${count} spec items checked, ${fail} failures`);
process.exit(fail ? 1 : 0);
