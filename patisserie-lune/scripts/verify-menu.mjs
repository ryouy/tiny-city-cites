// 仕様書(Markdown)の商品・営業情報・固定文言と、dist の各 HTML を機械的に突き合わせる。
// 使い方: npm run build && npm run verify [仕様書パス]
import { readFileSync, existsSync } from 'node:fs';

const specPath = process.argv[2] ?? '../siyosyo/PATISSERIE_LUNE_Claude_Code.md';
const spec = readFileSync(specPath, 'utf8');
const pages = { home: 'dist/index.html', menu: 'dist/menu/index.html', order: 'dist/order/index.html', about: 'dist/about/index.html' };

const raw = {};
const toLines = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
const lines = {};
for (const [k, f] of Object.entries(pages)) {
  if (!existsSync(f)) { console.error(`dist が見つかりません: ${f}(先に npm run build)`); process.exit(1); }
  raw[k] = readFileSync(f, 'utf8');
  lines[k] = toLines(raw[k]);
}

let fail = 0;
let count = 0;
const ng = (m) => { fail++; console.error(`NG: ${m}`); };
const master = spec.slice(spec.indexOf('## 4. 商品マスター'), spec.indexOf('## 5. 情報設計'));
const section = (a, b) => master.slice(master.indexOf(a), master.indexOf(b));
const rows = (sec, idRe) => sec.split('\n').map((r) => r.split('|').map((s) => s.trim())).filter((c) => c.length > 4 && idRe.test(c[1]));
// name の出現のうち、直後 8 行以内に全ての語が揃うものが1つでもあれば OK
const near = (L, name, words) => {
  const idxs = L.map((l, i) => (l === name ? i : -1)).filter((i) => i >= 0);
  return idxs.some((i) => words.every((w) => L.slice(i, i + 8).includes(w)));
};

// 1) 商品マスター(§4)
// 商品説明は事実のみの短文に書き換え済み(仕様書の説明文とは異なる)。名前・価格・サイズ・備考は仕様書と照合する。
const descs = {
  cake01: '季節の果実と生クリームのショートケーキ', cake02: 'タルト生地に季節の果物をのせたタルト', cake03: 'チョコレートのケーキ',
  cake04: 'レモン風味のレアチーズケーキ', cake05: '和栗のクリームをのせたモンブラン。秋季限定', cake06: '卵と牛乳のプリン。カラメル付き',
  bake01: 'バターとアーモンドの焼き菓子', bake02: '発酵バターを使ったサブレ', bake03: '果実とスパイス入りのパウンドケーキ',
  bake04: '焼き菓子6点の詰め合わせ', bake05: '焼き菓子10点の詰め合わせ',
};
const cut = rows(section('### Cut Cakes', '### Whole Cakes'), /^cake\d+$/);
for (const [, id, name, price] of cut) {
  const desc = descs[id];
  count++;
  if (!near(lines.menu, name, [price, desc])) ng(`menu cut: ${name} ${price}`); else console.log(`OK: ${name} ${price}`);
}
const whole = rows(section('### Whole Cakes', '### Baked Goods'), /^whole\d+$/);
for (const [, , name, size, price, note] of whole) {
  count++;
  if (!near(lines.menu, name, [size, price, note])) ng(`menu whole: ${name} ${size} ${price}`); else console.log(`OK: ${name} ${size} ${price}`);
  if (!lines.order.includes(price)) ng(`order whole price: ${name} ${price}`);
}
const baked = rows(section('### Baked Goods', '*アレルゲンは'), /^bake\d+$/);
for (const [, id, name, price] of baked) {
  const desc = descs[id];
  count++;
  if (!near(lines.menu, name, [price, desc])) ng(`menu baked: ${name} ${price}`); else console.log(`OK: ${name} ${price}`);
}
if (cut.length !== 6 || whole.length !== 6 || baked.length !== 5) ng(`商品数が仕様書と異なる: ${cut.length}/${whole.length}/${baked.length}`);
// 代表3点(トップ)
for (const r of cut.slice(0, 3)) if (!near(lines.home, r[2], [r[3], descs[r[1]]])) ng(`home featured: ${r[2]}`);

// 2) 営業情報・固定文言(§2, §3, §8)
const musts = {
  home: [
    '会津若松市の洋菓子店です。', 'カットケーキ、ホールケーキ、焼き菓子を販売しています。テイクアウト専門です。',
    '店主がパティスリーで経験を積み、2022年10月に会津で開業しました。旬の果物を使ったケーキと、甘さを抑えた焼き菓子を作っています。',
    '10:00–18:00', '火曜日・水曜日',
  ],
  about: [
    '10:00〜18:00', '火曜日・水曜日', 'テイクアウトあり', 'イートインはありません', '3台', 'カットケーキ500〜850円', 'ギフト1,000円〜',
    '現金・クレジットカード・一部QR決済', '福島県会津若松市の閑静な住宅地', 'ホールケーキのみ', '会津若松市周辺の地図',
  ],
  menu: ['表示価格はすべて税込です。'],
  order: ['予約は送信されません。', '火曜・水曜', '祝日・臨時休業には対応していません。', '予約・注文は受け付けていません。'],
};
// 英文見出しは 各行 span に分割されているため連結して(下の正規表現で確認)
for (const [pg, arr] of Object.entries(musts)) for (const m of arr) {
  const all = lines[pg].join('\n');
  if (!all.includes(m) && !lines[pg].join('').includes(m.replace(/\s/g, ''))) ng(`missing on ${pg}: ${m}`);
}
// 営業時間は仕様書の表と一致
if (!spec.includes('10:00〜18:00（商品売切れ時は早仕舞いの場合あり）') || !spec.includes('火曜日・水曜日')) ng('spec hours changed?');

// 3) 全ページ共通: デモ表記・noindex・禁止事項
const disclaimer = 'このサイトは架空店舗の制作デモです。実在の店舗ではありません。店舗名・設定・価格・人物・事業内容はすべて創作です。';
let iframeTotal = 0;
for (const [pg, h] of Object.entries(raw)) {
  const L = lines[pg];
  if (L.some((l) => /PORTFOLIO DEMO/.test(l))) ng(`${pg}: 上部の「デモ」帯が残っている`);
  if (/class="demo-band"/.test(h)) ng(`${pg}: demo-band が残っている`);
  // 「デモ」「架空」「サンプル」は免責の1行(フッター)にのみ許可
  const body = L.filter((l) => l !== disclaimer);
  for (const l of body) if (/デモ|架空|サンプル|ダミー/.test(l)) ng(`${pg}: 注記の言い回しが残っている: ${l}`);
  if (L.filter((l) => l === disclaimer).length !== 1) ng(`${pg}: フッターの免責文が1行だけではない`);
  if (!/<meta name="robots" content="noindex,nofollow"/.test(h)) ng(`${pg}: robots noindex`);
  if ((h.match(/<h1[\s>]/g) ?? []).length !== 1) ng(`${pg}: h1 は1つ`);
  const bad = [
    [/href="tel:/, 'tel リンク'], [/href="mailto:/, 'mailto リンク'], [/application\/ld\+json/, '構造化データ'], [/rel="canonical"/, 'canonical'],
    [/instagram|twitter\.com|facebook|tabelog|line\.me|(?<![a-z])x\.com/i, 'SNS/外部サービス'], [/〒|\d{2,4}-\d{2,4}-\d{3,4}/, '郵便番号/電話番号らしき文字列'],
    [/注文完了|予約完了|ご予約ありがとう|送信しました/, '完了を装う文言'], [/¥/, '¥ 表記'],
  ];
  const text = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  for (const [re, label] of bad) if (re.test(text.replace(/<iframe[\s\S]*?<\/iframe>/g, ''))) ng(`${pg}: forbidden ${label}`);
  if (/<a [^>]*href="https?:/.test(h)) ng(`${pg}: 外部リンク(a)`);
  if (/<form[\s>]/.test(h) && /action=/.test(h)) ng(`${pg}: form に action がある(送信されうる)`);
  if (pg === 'about' && !L.includes('会津若松市周辺の地図')) ng('about: 地図キャプション');
  if (/店舗の所在地ではありません/.test(h)) ng(`${pg}: 旧地図キャプション`);
  const ifr = h.match(/<iframe[^>]*>/g) ?? [];
  iframeTotal += ifr.length;
  if (ifr.length && pg !== 'about') ng(`${pg}: iframe は about ページのみ許可`);
  for (const f of ifr) if (!/src="https:\/\/www\.google\.com\/maps\/embed\?/.test(f)) ng(`${pg}: iframe が Google マップ埋め込みではない`);
  if (/lang="ja"/.test(h) === false) ng(`${pg}: lang`);
  // 画像に alt
  for (const im of h.match(/<img[^>]*>/g) ?? []) if (!/ alt="[^"]+"/.test(im)) ng(`${pg}: img alt`);
}
if (iframeTotal !== 1) ng(`iframe は Google マップ埋め込み1点のみ許可 (found ${iframeTotal})`);

// 4) 価格は全て「N円」表記(カンマ区切り)
for (const [pg, L] of Object.entries(lines)) for (const l of L) if (/^\d{4,}円$/.test(l)) ng(`${pg}: カンマなしの価格 ${l}`);

for (const [pg, L] of Object.entries(lines)) for (const l of L) if (/こだわり|丁寧|心まで|ほっと|そっと|特別なひととき|物語|約束|想い|寄り添|彩る|紡ぐ|届け|ひとつずつ|しあわせ|ごほうび|ふっくら|とろけ|A LITTLE/.test(l)) ng(`${pg}: 情緒語が残っている: ${l}`);

console.log(`\n${count} products checked, ${fail} failures`);
process.exit(fail ? 1 : 0);
