// 仕様書(§1・§3・§4)とビルド結果(dist/index.html, dist/menu/index.html)を突き合わせる。使い方: npm run build && npm run verify
import { readFileSync, existsSync } from 'node:fs';

const SPEC = '/Users/ryo/Documents/small_biz/siyosyo/TRATTORIA_MACHI_Claude_Code.md';
if (!existsSync(SPEC)) { console.error('仕様書が見つかりません: ' + SPEC); process.exit(1); }
const spec = readFileSync(SPEC, 'utf8');
const pages = { top: 'dist/index.html', menu: 'dist/menu/index.html' };
const htmls = Object.fromEntries(Object.entries(pages).map(([k, f]) => [k, readFileSync(f, 'utf8')]));

let fail = 0, count = 0;
const ng = (m) => { fail++; console.error('NG: ' + m); };
const toLines = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&').replace(/&#39;/g, "'").split('\n').map((l) => l.trim()).filter(Boolean);
const lines = { top: toLines(htmls.top), menu: toLines(htmls.menu) };
const all = [...lines.top, ...lines.menu];
if (!/<figcaption[^>]*>会津若松市周辺の地図<\/figcaption>/.test(htmls.top)) { fail++; console.error('NG: 地図キャプション'); }
const near = (ls, name, words) => ls.some((l, i) => l === name && words.every((w) => ls.slice(i, i + 8).includes(w)));
const section = (a, b) => { const s = spec.indexOf(a); return spec.slice(s, b ? spec.indexOf(b, s + a.length) : undefined); };
const rows = (sec) => sec.split('\n').filter((l) => /^\|/.test(l) && /¥[\d,]+/.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));

// 1) メニュー価格(お品書きページ。表の行ごとに、名前の直後に価格(と説明)が並ぶこと)
const groups = [
  ['### LUNCH', '- ランチドリンク', 3, 5],
  ['### PASTA', '- パスタ大盛り', 3, 5],
  ['### PIZZA', '### ANTIPASTI', 3, 4],
  ['### ANTIPASTI', '### DOLCE', 2, 5],
  ['### DOLCE & DRINK', '- ワイン提供', 2, 8],
];
for (const [a, b, cols, n] of groups) {
  const rs = rows(section(a, b));
  if (rs.length !== n) ng(`${a} の商品数が仕様書と異なる`);
  for (const r of rs) {
    count++;
    const words = [r[1]];
    if (cols === 3) words.push(r[2]);
    if (!near(lines.menu, r[0], words)) ng(`${r[0]} ${r[1]}`); else console.log(`OK: ${r[0]} ${r[1]}`);
  }
}
const setOk = ['まちの灯 おふたりセット', '¥4,200', '前菜盛り合わせ＋選べるパスタ1皿＋選べるピッツァ1枚＋ソフトドリンク2杯'].every((w) => lines.menu.some((l) => l.includes(w)));
if (!setOk) ng('おふたりセット');
if (!lines.menu.some((l) => l.includes('これは注文・予約ではありません'))) ng('注文・予約ではない旨');
if (!lines.menu.some((l) => l.includes('税込'))) ng('税込表記');
if (!lines.menu.some((l) => l.includes('11:30–14:00'))) ng('ランチ提供時間');
for (const w of ['コーヒー（HOT/ICE）', '紅茶（HOT/ICE）', 'オレンジジュース', '本日のパスタの例：きのことベーコンのクリームソース', '＋¥200']) if (!lines.menu.some((l) => l.includes(w))) ng(`menu missing: ${w}`);

// 2) トップページの固定文言・営業情報
const musts = [
  'A LITTLE ITALY IN OUR TOWN', 'いつもの街に、', 'ちょっといいイタリアン。',
  'お昼は気軽なパスタランチ。夜はピッツァを囲んで、のんびりおしゃべり。誰と来ても、ほっとできる町のトラットリアです。',
  '家族で囲むような、あたたかい食卓。', 'まちの灯は、夫婦で営む小さなイタリアン。季節の野菜やいつもの食材を、手間ひまかけて一皿に。かしこまった日はもちろん、なんでもない日にも、おいしい時間を届けます。',
  'お昼の楽しみは、選べるランチ。', 'パスタもピッツァも、気分に合わせて。サラダとドリンク付きのセットで、気軽にゆっくりお過ごしください。',
  '仕事帰りも、家族の週末も。', '焼きたてのピッツァに、前菜を少し。ワインやソフトドリンクと一緒に、いつもの夜を少しだけ楽しく。',
  '小さなお客さまも、大歓迎。', 'お子さまプレートをご用意しています。家族で囲む食卓の楽しさを、どうぞ気軽に。',
  '料理人の夫と、接客を担当する妻が営む地域密着のイタリアン。夫は東京のカジュアルイタリアンで経験を積んだ後、会津に戻って店を開いた。地元の旬野菜を時期に合わせて取り入れ、ソースやドレッシングを店内で仕込む。子ども連れにも歓迎の雰囲気を大切にしている。',
  'ランチ 11:30–14:30（L.O.14:00）', 'ディナー 17:30–21:00（L.O.20:30）', '月曜日（祝日の場合翌火曜日休み）', '28席（2人席4卓、4人席5卓）', '6台',
  'ランチ ¥1,000–1,800', 'ディナー ¥2,000–3,500',
  'ディナーのみ電話予約を受ける想定。電話番号は未設定のため、このサイトでは予約を受け付けていません。',
  'ピッツァと一部パスタが対象。このサイトでは注文できません。', '現金、クレジットカード、QR決済', '歓迎。キッズプレートあり',
  'メニューを見る', 'お店について', 'ランチメニューを見る', 'ディナーメニューを見る', '所在地', '会津若松市',
];
for (const m of musts) if (!lines.top.some((l) => l.includes(m))) ng(`top missing: ${m}`);
for (const w of ['¥1,000–1,800', '¥2,000–3,500', '28席（2人席4卓、4人席5卓）', '¥4,200']) if (!spec.includes(w)) ng('spec changed: ' + w);
if (!spec.includes('11:30–14:30（L.O.14:00）') || !spec.includes('17:30–21:00（L.O.20:30）')) ng('spec hours changed');

// 3) 禁止事項・SEO・デモ表記(全ページ)
const bad = [
  [/href="tel:/, 'tel リンク'], [/href="mailto:/, 'mailto リンク'], [/application\/ld\+json/, '構造化データ'], [/rel="canonical"/, 'canonical'],
  [/instagram|twitter\.com|facebook|line\.me|(?<![a-z])x\.com/i, 'SNS'], [/〒|\d{2,4}-\d{2,4}-\d{3,4}/, '郵便番号/電話番号らしき文字列'],
  [/注文完了|予約完了|ご予約ありがとう|送信しました/, '完了を装う文言'], [/<form[^>]*action=/, 'form action'], [/<input[^>]*type="(text|tel|email)"/, '個人情報入力欄'],
  [/<a [^>]*href="https?:/, '外部リンク'],
];
for (const [k, html] of Object.entries(htmls)) {
  const body = html.replace(/<iframe[\s\S]*?<\/iframe>/g, '').replace(/<script[\s\S]*?<\/script>/g, '');
  for (const [re, l] of bad) if (re.test(body)) ng(`${k} forbidden: ${l}`);
  const ifr = html.match(/<iframe[^>]*>/g) ?? [];
  if (k === 'top' && (ifr.length !== 1 || !/src="https:\/\/www\.google\.com\/maps\/embed\?/.test(ifr[0]))) ng('top: iframe は Google マップ埋め込み1点のみ許可');
  if (k === 'menu' && ifr.length) ng('menu: iframe なし');
  if (!/<meta name="robots" content="noindex,nofollow"/.test(html)) ng(`${k} noindex`);
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) ng(`${k} h1 は1つ`);
  if (!html.includes('lang="ja"')) ng(`${k} lang`);
  if (/<meta name="description" content="[^"]*(架空|デモ)[^"]*"/.test(html)) ng(`${k} description に「架空・デモ」が残っている`);
  if (!html.includes('aria-current="page"')) ng(`${k} aria-current`);
  const ls = k === 'top' ? lines.top : lines.menu;
  // 注記はフッター1か所のみ。上部の帯・本文中の「デモ/架空/サンプル」は出さない(メタ情報とフッターで足りる)。
  if (ls.filter((l) => l.includes('架空店舗のWebサイト制作デモです')).length !== 1) ng(`${k} 免責文はフッター1か所のみ`);
  const foot = html.slice(html.indexOf('<footer'));
  const bodyOnly = html.slice(html.indexOf('<body'), html.indexOf('<footer'));
  if (!foot.includes('架空店舗のWebサイト制作デモです')) ng(`${k} フッターの免責文`);
  if (/<p class="demo-band"|demo-band/.test(html)) ng(`${k} 上部の帯が残っている`);
  const bodyText = toLines(bodyOnly).join('\n');
  const hit = bodyText.match(/デモ|架空|サンプル|デモ用|画像準備中/);
  if (hit && !/画像準備中/.test(hit[0])) ng(`${k} 本文に「${hit[0]}」が残っている`);
  for (const im of html.match(/<img[^>]*>/g) ?? []) if (!/ alt="[^"]+"/.test(im)) ng(`${k} img alt`);
}
if (!htmls.top.includes('<title>トラットリア まちの灯 | 会津若松のイタリアン</title>')) ng('top title');
if (!/<title>お品書き \| トラットリア まちの灯/.test(htmls.menu)) ng('menu title');
if (!all.some((l) => l.includes('トラットリア まちの灯｜架空店舗のWebサイト制作デモです。実在店舗ではなく、予約・注文・問い合わせは受け付けていません。'))) ng('footer notice');

console.log(`\n${count} menu rows checked, ${fail} failures`);
process.exit(fail ? 1 : 0);
