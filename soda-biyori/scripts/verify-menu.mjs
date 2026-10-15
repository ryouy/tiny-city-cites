// 仕様書(Markdown)のメニュー・営業情報と dist/index.html を機械的に突き合わせる。
// 使い方: npm run build && npm run verify [仕様書パス]
import { readFileSync } from 'node:fs';

const specPath = process.argv[2] ?? '../siyosyo/SODA_BIYORI_Claude_Code.md';
const spec = readFileSync(specPath, 'utf8');
// 3ページ構成: dist/index.html(トップ)・dist/menu/index.html・dist/shop/index.html
const pageFiles = { home: 'dist/index.html', menu: 'dist/menu/index.html', shop: 'dist/shop/index.html' };
const toText = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&amp;/g, '&');
const raws = Object.fromEntries(Object.entries(pageFiles).map(([k, f]) => [k, readFileSync(f, 'utf8')]));
const texts = Object.fromEntries(Object.entries(raws).map(([k, h]) => [k, toText(h)]));
const rawHtml = Object.values(raws).join('\n');
const text = Object.values(texts).join('\n');
const toLines = (t) => t.split('\n').map((s) => s.trim()).filter(Boolean);
const lines = toLines(texts.menu); // メニュー表はメニューページで検査
const homeLines = toLines(texts.home);

let fail = 0;
let count = 0;
const ng = (m) => { fail++; console.error(`NG: ${m}`); };

// 1) メニュー表(§3): 名前と価格が近接していること。ID付き表と「商品|価格」表の両方
const sec = spec.slice(spec.indexOf('## 3. メニュー'), spec.indexOf('## 4. 掲載文章'));
const priceNear = (name, price) => {
  const idxs = lines.map((l, i) => (l === name ? i : -1)).filter((i) => i >= 0);
  return idxs.length > 0 && idxs.every((i) => lines.slice(i, i + 5).includes(price)) ;
};
const descs = [];
for (const row of sec.split('\n')) {
  const cells = row.split('|').map((s) => s.trim());
  if (cells.length < 4) continue;
  let name, price, desc;
  if (/^(soda|sweet|food)-\d+$/.test(cells[1])) [, , name, price, desc] = cells;
  else if (/^[\d,]+円$/.test(cells[2])) [, name, price] = cells;
  else continue;
  count++;
  if (priceNear(name, price)) console.log(`OK: ${name} ${price}`); else ng(`${name} ${price}`);
  if (desc && cells[1].startsWith('sweet') || cells[1].startsWith('food')) descs.push([name, desc]);
  if (cells[1].startsWith('soda')) {
    // 色・内容を ／ 区切りで: メニュー表では「／」連結、パネルでは個別項目として存在
    for (const part of desc.split('／')) if (!homeLines.includes(part.trim())) ng(`soda note(トップ) ${name} -> ${part}`);
    if (!lines.includes(desc)) ng(`soda desc(メニュー) ${name} -> ${desc}`);
  }
}
for (const [name, desc] of descs) if (!lines.includes(desc)) ng(`desc ${name} -> ${desc}`);

// 2) 営業情報・固定文言(§1, §3, §4, §8, §9)
const musts = [
  '11:00–19:00', 'フードL.O. 18:00', 'ドリンク・スイーツL.O. 18:30', '月曜日', '26席', '2名席×7卓、4名席×3卓',
  '専用駐車場はありません', '900〜1,800円', '全席禁煙', '現金・クレジットカード・交通系電子マネー・QR決済',
  '福島県会津若松市の商店街近く', '2025年4月',
  'フードに対象ドリンクを付けると、ドリンク代から150円引き（クリームソーダは対象外）。',
  'アレルゲン情報は掲載していません。',
  'このサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在の店舗ではありません。',
  'ソーダの泡みたいに、気持ちが弾む喫茶時間。',
  '春のおすすめソーダ', '季節のケーキ便り', '営業日のご案内', '会津若松市周辺の地図',
  'メニューを見る', 'お店について', '実際の注文はできません。',
];
for (const m of musts) if (!text.includes(m)) ng(`missing: ${m}`);
// 見出しは複数 span に分割されているため、連結テキストで確認
const flat = text.replace(/\s+/g, '');
for (const h of ['懐かしいのに、なんだか新しい。', '色で選ぶ？気分で選ぶ？', 'プリンは、ちょっぴり固めがいい。', 'おなかがすいたら、喫茶ごはん。', '今日も、ちょっとごきげん。', 'また来たくなる、いつもの場所。'])
  if (!flat.includes(h)) ng(`heading: ${h}`);
if (!/ご予約[\s\S]{0,40}通常はご予約をお受けしていません/.test(text)) ng('予約');

// 2b) 「デモ」強調の禁止: 免責文1行(フッター)以外に デモ/架空/サンプル が無いこと。上部帯がないこと
const disc = 'このサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在の店舗ではありません。';
for (const [k, h] of Object.entries(raws)) {
  const t = toText(h);
  const n = t.split(disc).length - 1;
  if (n !== 1) ng(`${k}: 免責文はフッターに1回だけ (found ${n})`);
  const m = t.split(disc).join('').match(/デモ|架空|サンプル|ポートフォリオ/);
  if (m) ng(`${k}: 本文に「${m[0]}」`);
  const attrs = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(disc, '');
  const m2 = attrs.match(/(title|alt|content|aria-label)="[^"]*(デモ|架空|サンプル)[^"]*"/);
  if (m2) ng(`${k}: 属性に注記: ${m2[0].slice(0, 60)}`);
  if (/demo-band/.test(h)) ng(`${k}: 上部帯が残っている`);
  if (!new RegExp(`<footer[\\s\\S]*${disc}`).test(h)) ng(`${k}: 免責文がフッター内にない`);
}
if (!/<figcaption[^>]*>\s*会津若松市周辺の地図\s*<\/figcaption>/.test(raws.shop)) ng('地図キャプションは「会津若松市周辺の地図」のみ');

// 3) 禁止事項: 実在情報・外部誘導・構造化データ等
const bad = [
  [/href="tel:/, 'tel リンク'], [/href="mailto:/, 'mailto リンク'], [/<form[\s>]/, 'form'], [/application\/ld\+json/, '構造化データ'],
  [/rel="canonical"/, 'canonical'], [/instagram|twitter\.com|x\.com|facebook|tabelog|line\.me/i, 'SNS/外部サービス'],
  [/〒|\d{2,4}-\d{2,4}-\d{3,4}/, '郵便番号/電話番号らしき文字列'],
];
for (const [re, label] of bad) if (re.test(rawHtml)) ng(`forbidden: ${label}`);
// iframe は地図埋め込み(1点)のみ許可
const iframes = rawHtml.match(/<iframe[^>]*>/g) ?? [];
if (iframes.length !== 1 || !/src="https:\/\/www\.google\.com\/maps\/embed\?/.test(iframes[0])) ng(`iframe は Google マップ埋め込み1点のみ許可 (found ${iframes.length})`);
for (const [k, h] of Object.entries(raws)) {
  if ((h.match(/<h1[\s>]/g) ?? []).length !== 1) ng(`${k}: h1 は1つ`);
  if (!/<meta name="robots" content="noindex,nofollow"/.test(h)) ng(`${k}: robots noindex`);
  if (!/<title>[^<]+<\/title>/.test(h) || !/<meta name="description" content="[^"]+"/.test(h)) ng(`${k}: title/description`);
  if (!/aria-current="page"/.test(h)) ng(`${k}: 現在ページ表示(aria-current)`);
}
const titles = Object.values(raws).map((h) => h.match(/<title>([^<]+)<\/title>/)?.[1]);
if (new Set(titles).size !== titles.length) ng('title が重複');
// 内部リンクが3ページに届くこと
for (const p of ['menu/', 'shop/']) if (!raws.home.includes(`href="/${p}"`) && !raws.home.includes(`${p}"`)) ng(`トップから ${p} へのリンク`);
// 外部 http(s) リンク(<a href>)がないこと
if (/<a [^>]*href="https?:/.test(rawHtml)) ng('外部リンク(a)');

// 4) 価格は税込・円表記(¥ 表記が混ざっていない)
if (/¥/.test(text)) ng('¥ 表記が存在');

console.log(`\n${count} menu items checked, ${fail} failures`);
process.exit(fail ? 1 : 0);
