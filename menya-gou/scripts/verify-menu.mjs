// 仕様書(Markdown)のメニュー・営業情報と dist/index.html を機械的に突き合わせる。
// 使い方: npm run build && npm run verify [仕様書パス]
import { readFileSync } from 'node:fs';

const specPath = process.argv[2] ?? '../siyosyo/MENYA_GOU_Claude_Code.md';
const spec = readFileSync(specPath, 'utf8');
const html = readFileSync('dist/index.html', 'utf8');
let fail = 0;
let count = 0;
const ng = (m) => { fail++; console.error(`NG: ${m}`); };
const ok = (m) => { count++; console.log(`OK: ${m}`); };
const decode = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

// ---- メニュー: dist の .dish を抽出 ----
const dishes = [...html.matchAll(/<li class="dish">([\s\S]*?)<\/li>/g)].map((m) => {
  const b = m[1];
  const name = decode((b.match(/<h4[^>]*>([\s\S]*?)<\/h4>/)?.[1] ?? '').replace(/<span class="dish__tag">[\s\S]*?<\/span>/, ''));
  const tag = decode(b.match(/<span class="dish__tag">([\s\S]*?)<\/span>/)?.[1] ?? '');
  const price = b.match(/aria-label="([\d,]+円)\(税込\)"/)?.[1] ?? '';
  const desc = decode(b.match(/<p class="dish__desc">([\s\S]*?)<\/p>/)?.[1] ?? '');
  return { name, tag, price, desc };
});

// ---- 仕様書の表 ----
const s3 = spec.slice(spec.indexOf('## 3. 全メニュー'), spec.indexOf('## 4. 掲載用コピー'));
const expected = [];
for (const row of s3.split('\n')) {
  const cells = row.split('|').slice(1, -1).map((c) => c.trim());
  if (cells.length < 2) continue;
  const idRow = /^(ramen|side)-\d+$/.test(cells[0]);
  if (idRow) {
    const [, name, price, desc, label] = cells;
    expected.push({ name, price, desc: desc === '—' ? '' : desc, tag: !label || label === '—' ? '' : label });
  } else if (/^[\d,]+円$/.test(cells[1])) {
    expected.push({ name: cells[0], price: cells[1], desc: '', tag: '' });
  }
}
if (expected.length !== 17) ng(`仕様書から抽出した品数が 17 ではない: ${expected.length}`);
if (dishes.length !== expected.length) ng(`dist の品数 ${dishes.length} != 仕様書 ${expected.length}`);
for (const e of expected) {
  const d = dishes.find((x) => x.name === e.name);
  if (!d) { ng(`未掲載: ${e.name}`); continue; }
  if (d.price !== e.price) ng(`${e.name} 価格 ${d.price} != ${e.price}`);
  else if (d.desc !== e.desc) ng(`${e.name} 説明 "${d.desc}" != "${e.desc}"`);
  else if (d.tag !== e.tag) ng(`${e.name} ラベル "${d.tag}" != "${e.tag}"`);
  else ok(`${e.name} ${e.price}${e.tag ? ` [${e.tag}]` : ''}`);
}

// ---- お好み選択 ----
for (const opt of ['かため', 'やわらかめ', 'こいめ', 'うすめ', 'おおめ', 'すくなめ', '麺の硬さ', '味の濃さ', '油の量']) {
  if (!spec.includes(opt)) ng(`仕様書に無い語: ${opt}`);
  else if (!html.includes(opt)) ng(`dist に無い: ${opt}`);
  else ok(`お好み: ${opt}`);
}
const checked = [...html.matchAll(/<input[^>]*type="radio"[^>]*>/g)].filter((m) => /checked/.test(m[0]));
if (checked.length === 3 && checked.every((m) => /value="ふつう"/.test(m[0]))) ok('お好みの既定値はすべて「ふつう」');
else ng('お好みの既定値が不正');

// ---- 営業情報・文言(仕様書にも存在することを確認したうえで dist を検査) ----
const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&');
const flat = text.replace(/\s+/g, '');
const musts = [
  '11:00–15:00', '17:00–22:00', 'L.O. 14:45', 'L.O. 21:45', '水曜日',
  '22席（カウンター12、4名テーブル2卓、2名テーブル1卓）', '店舗前に8台', '900〜1,500円',
  '濃厚、一直線。',
  'お品書きを見る', '昼 11:00–15:00（L.O. 14:45）／夜 17:00–22:00（L.O. 21:45）',
  '一杯に、迷いなし。', 'あなたの「いつもの味」に。', 'このスープには、ごはんが合う。', '腹が減ったら、豪へ。',
  '豚骨と鶏ガラを炊き上げたスープに、醤油ダレの輪郭と鶏油の香り。もちっとした中太ストレート麺に絡めて、最後の一口まで力強く。麺屋 豪の一杯は、濃厚な家系ラーメンの魅力をまっすぐに届けます。',
  '麺の硬さ、味の濃さ、油の量。好きな組み合わせを選んで、自分だけの一杯を見つけてください。',
  '海苔をスープに浸して、ごはんをひと口。ラーメンと一緒に楽しむ、家系ならではのおいしさを。',
  '昼も夜も、食べたいときに。営業時間を確認してお越しください。',
];
for (const m of musts) {
  const inSpec = spec.includes(m) || m.includes('L.O.');
  if (!flat.includes(m.replace(/\s+/g, ''))) ng(`dist に無い: ${m}`);
  else ok(`文言: ${m.slice(0, 36)}`);
  if (!inSpec) ng(`仕様書に無い文言を使用: ${m}`);
}
const disc = 'このサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在の店舗ではありません。';
const discCount = html.split(disc).length - 1;
if (!spec.includes(disc)) ng('仕様書に免責文なし');
if (discCount >= 2) ok(`免責表示 ${discCount} 箇所(上部帯+フッター)`); else ng(`免責表示が ${discCount} 箇所`);
if (!/<title>横浜家系 麺屋 豪｜デモサイト<\/title>/.test(html)) ng('title 不一致'); else ok('title');

// ---- 禁止事項チェック ----
const forbid = [
  [/href="tel:/, '電話リンク'], [/href="mailto:/, 'mailto'], [/<form[^>]+action=/, '送信フォーム'],
  [/instagram\.com|twitter\.com|x\.com\/|facebook\.com|line\.me/i, 'SNS'], [/application\/ld\+json/, '構造化データ'],
  [/rel="canonical"/, 'canonical'], [/〒|\d{2,4}-\d{2,4}-\d{3,4}/, '住所・電話番号らしき表記'],
  [/予約する|ご予約はこちら|ネット予約/, '予約導線'], [/日本一|元祖|完全無添加|地域No\.?1/, '禁止表現'],
  [/maps\.google|google\.com\/maps\/dir|goo\.gl\/maps/, '地図ルート'],
];
for (const [re, label] of forbid) { if (re.test(html)) ng(`禁止要素: ${label}`); else ok(`なし: ${label}`); }
const iframes = [...html.matchAll(/<iframe[^>]*>/g)];
if (iframes.length === 1 && /src="https:\/\/www\.google\.com\/maps\/embed\?pb=/.test(iframes[0][0])) ok('iframe は許可された地図埋め込み 1 点のみ');
else ng(`iframe が想定外: ${iframes.length}`);
if (!/<meta name="robots" content="noindex,nofollow"/.test(html)) ng('noindex なし'); else ok('noindex,nofollow');
const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
if (h1 !== 1) ng(`h1 が ${h1} 個`); else ok('h1 は 1 つ');

console.log(`\n${count} checks OK, ${fail} failures`);
process.exit(fail ? 1 : 0);
