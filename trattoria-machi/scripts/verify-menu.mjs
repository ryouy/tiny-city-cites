// 仕様書(§1・§3・§4)とビルド結果 dist/index.html を突き合わせる。使い方: npm run build && npm run verify
import { readFileSync, existsSync } from 'node:fs';

const SPEC = '/Users/ryo/Documents/small_biz/siyosyo/TRATTORIA_MACHI_Claude_Code.md';
const html = readFileSync('dist/index.html', 'utf8');
if (!existsSync(SPEC)) { console.error('仕様書が見つかりません: ' + SPEC); process.exit(1); }
const spec = readFileSync(SPEC, 'utf8');

let fail = 0, count = 0;
const ng = (m) => { fail++; console.error('NG: ' + m); };
const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
const lines = text.replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&').replace(/&#39;/g, "'").split('\n').map((l) => l.trim()).filter(Boolean);
const near = (name, words) => lines.some((l, i) => l === name && words.every((w) => lines.slice(i, i + 8).includes(w)));
const section = (a, b) => { const s = spec.indexOf(a); return spec.slice(s, b ? spec.indexOf(b, s + a.length) : undefined); };
const rows = (sec) => sec.split('\n').filter((l) => /^\|/.test(l) && /¥[\d,]+/.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));

// 1) メニュー価格(表の行ごと。名前の直後に価格(と説明)が並ぶこと)
const groups = [
  ['### LUNCH', '- ランチドリンク', 3],
  ['### PASTA', '- パスタ大盛り', 3],
  ['### PIZZA', '### ANTIPASTI', 3],
  ['### ANTIPASTI', '### DOLCE', 2],
  ['### DOLCE & DRINK', '- ワイン提供', 2],
];
for (const [a, b, cols] of groups) for (const r of rows(section(a, b))) {
  count++;
  const words = [r[1]];
  if (cols === 3) words.push(r[2]);
  if (!near(r[0], words)) ng(`${r[0]} ${r[1]}`); else console.log(`OK: ${r[0]} ${r[1]}`);
}
if (rows(section('### LUNCH', '- ランチドリンク')).length !== 5 || rows(section('### PASTA', '- パスタ大盛り')).length !== 5 || rows(section('### PIZZA', '### ANTIPASTI')).length !== 4 || rows(section('### ANTIPASTI', '### DOLCE')).length !== 5 || rows(section('### DOLCE & DRINK', '- ワイン提供')).length !== 8) ng('商品数が仕様書と異なる');

// 2) 固定文言・営業情報
const musts = [
  'A LITTLE ITALY IN OUR TOWN', 'いつもの街に、', 'ちょっといいイタリアン。',
  'お昼は気軽なパスタランチ。夜はピッツァを囲んで、のんびりおしゃべり。誰と来ても、ほっとできる町のトラットリアです。',
  '家族で囲むような、', 'あたたかい食卓。', 'まちの灯は、夫婦で営む小さなイタリアン。季節の野菜やいつもの食材を、手間ひまかけて一皿に。かしこまった日はもちろん、なんでもない日にも、おいしい時間を届けます。',
  'お昼の楽しみは、', '選べるランチ。', 'パスタもピッツァも、気分に合わせて。サラダとドリンク付きのセットで、気軽にゆっくりお過ごしください。',
  '仕事帰りも、', '家族の週末も。', '焼きたてのピッツァに、前菜を少し。ワインやソフトドリンクと一緒に、いつもの夜を少しだけ楽しく。',
  '小さなお客さまも、', '大歓迎。', 'お子さまプレートをご用意しています。家族で囲む食卓の楽しさを、どうぞ気軽に。',
  'トラットリア まちの灯｜架空店舗のWebサイト制作デモです。実在店舗ではなく、予約・注文・問い合わせは受け付けていません。',
  'ランチ 11:30–14:30（L.O.14:00）', 'ディナー 17:30–21:00（L.O.20:30）', '月曜日（祝日の場合翌火曜日休みという架空設定）',
  '28席（2人席4卓、4人席5卓）', '6台（架空設定）', 'ランチ ¥1,000–1,800', 'ディナー ¥2,000–3,500',
  'コーヒー（HOT/ICE）、紅茶（HOT/ICE）、オレンジジュース', 'きのことベーコンのクリームソース', '本日の一例（架空）',
  'パスタ大盛り＋¥200（キッズ除く）', '価格はすべて税込表記です。', '¥4,200', 'これは注文・予約ではありません。',
  '【サンプル】季節のおすすめメニューを準備中です', '会津若松市内を想定した架空店舗', '実店舗化時に電話番号・予約導線を設定予定です。',
  'ピッツァと一部パスタを対象とする設定。注文機能はなし。', '現金、クレジットカード、QR決済を想定', '歓迎。キッズプレートあり',
];
for (const m of musts) if (!lines.some((l) => l.includes(m))) ng(`missing: ${m}`);
for (const [a, b] of [['ランチ 11:30–14:30（L.O.14:00）', '営業時間 §1'], ['17:30–21:00（L.O.20:30）', '営業時間 §1']]) if (!spec.includes(a.replace('ランチ ', '').replace('ディナー ', '')) ) ng('spec hours changed ' + b);
if (!spec.includes('¥4,200') || !spec.includes('28席（2人席4卓、4人席5卓）')) ng('spec changed');

// 3) 禁止事項・SEO・デモ表記
const bad = [
  [/href="tel:/, 'tel リンク'], [/href="mailto:/, 'mailto リンク'], [/application\/ld\+json/, '構造化データ'], [/rel="canonical"/, 'canonical'],
  [/instagram|twitter\.com|facebook|line\.me|(?<![a-z])x\.com/i, 'SNS'], [/〒|\d{2,4}-\d{2,4}-\d{3,4}/, '郵便番号/電話番号らしき文字列'],
  [/注文完了|予約完了|ご予約ありがとう|送信しました/, '完了を装う文言'], [/<form[^>]*action=/, 'form action'], [/<input[^>]*type="(text|tel|email)"/, '個人情報入力欄'],
  [/<a [^>]*href="https?:/, '外部リンク'],
];
const noIframe = html.replace(/<iframe[\s\S]*?<\/iframe>/g, '');
for (const [re, l] of bad) if (re.test(noIframe.replace(/<script[\s\S]*?<\/script>/g, ''))) ng('forbidden: ' + l);
const ifr = html.match(/<iframe[^>]*>/g) ?? [];
if (ifr.length !== 1 || !/src="https:\/\/www\.google\.com\/maps\/embed\?/.test(ifr[0])) ng('iframe は Google マップ埋め込み1点のみ許可');
if (!/<meta name="robots" content="noindex,nofollow"/.test(html)) ng('noindex');
if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) ng('h1 は1つ');
if (!html.includes('<title>トラットリア まちの灯 | 架空イタリアン店舗 デモサイト</title>')) ng('title');
if (!html.includes('lang="ja"')) ng('lang');
if (lines.filter((l) => l.includes('架空店舗のWebサイト制作デモです')).length < 2) ng('デモ表記が帯とフッターの2か所にない');
for (const im of html.match(/<img[^>]*>/g) ?? []) if (!/ alt="[^"]+"/.test(im)) ng('img alt');

console.log(`\n${count} menu rows checked, ${fail} failures`);
process.exit(fail ? 1 : 0);
