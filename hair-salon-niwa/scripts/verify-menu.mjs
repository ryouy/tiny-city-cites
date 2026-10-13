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
const pages = ['', 'menu/', 'styles/', 'staff/', 'first-visit/', 'access/', 'reserve/'];
const html = Object.fromEntries(pages.map((p) => [p, raw(p)]));
const lines = Object.fromEntries(pages.map((p) => [p, toLines(html[p])]));
const flat = Object.fromEntries(pages.map((p) => [p, lines[p].join('').replace(/\s+/g, '')]));

let fail = 0;
let count = 0;
const ng = (m) => { fail++; console.error(`NG: ${m}`); };
const section = (from, to) => spec.slice(spec.indexOf(from), spec.indexOf(to));
const near = (ls, name, others) => {
  const idxs = ls.map((l, i) => (l === name ? i : -1)).filter((i) => i >= 0);
  return idxs.length > 0 && idxs.every((i) => others.every((o) => ls.slice(i, i + 6).includes(o)));
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
  const [, , name, cat, comment] = c;
  count++;
  if (!near(lines['styles/'], cat, [name, comment]) && !near(lines['styles/'].slice(), name, [comment])) ng(`style: ${name}`);
  if (!lines['styles/'].includes(cat)) ng(`style cat: ${cat}`);
}
const staffMsgs = [...section('## 5. スタイリスト', '## 6. スタイル').matchAll(/メッセージ：`([^`]+)`/g)].map((m) => m[1]);
for (const m of staffMsgs) if (!flat['staff/'].includes(m.replace(/\s+/g, ''))) ng(`staff message: ${m}`);
for (const w of ['佐伯 まどか', 'Madoka Saeki', 'Owner Stylist', '美容師歴12年（架空）', '高野 悠', 'Yu Takano', '美容師歴7年（架空）', 'ナチュラルなレイヤー', 'メンズカット', '頭皮ケア', '骨格に馴染むショート・ボブ', '柔らかなカラー'])
  if (!lines['staff/'].includes(w)) ng(`staff: ${w}`);

// 3) 営業情報・固定文言
const access = lines['access/'];
const musts = [['access/', ['9:30〜18:30', 'カット17:30', 'カット＋カラー16:00', '月曜日・第1・第3日曜日', '2席（半個室風の配置）', '2台', '現金、カード、QR決済（架空設定）']]];
for (const [p, ws] of musts) for (const w of ws) if (!lines[p].includes(w)) ng(`access: ${w}`);
void access;
const home = flat[''];
for (const t of [
  'A PLACE TO FEEL LIKE YOURSELF.', '髪から、日々を心地よく。', 'いつもの自分に、ちょうどいい変化を。静かな空間で、一人ひとりの髪と丁寧に向き合うプライベートサロン。',
  'メニュー・料金を見る', 'スタイルを見る', '背伸びをしない、自分らしいきれい。',
  '髪質も、暮らし方も、似合うスタイルも一人ひとり違うから。niwaではカウンセリングの時間を大切にし、日々のお手入れまで見据えたヘアデザインをご提案します。落ち着いた空間で、どうぞゆっくりお過ごしください。',
  '丁寧なカウンセリング', '悩みや好み、普段のセット方法までじっくり伺います。', '毎日に馴染むスタイル', 'サロン帰りだけでなく、翌朝も扱いやすい髪へ。',
  '静かに過ごせる空間', '2席だけのプライベートな空間で、自分の時間を。', 'はじめての方へ',
  'ご希望の髪型が決まっていなくても大丈夫です。髪のお悩みや普段のライフスタイルを伺いながら、一緒にスタイルを考えていきます。',
  'カット5,000円台〜、カラー7,000円台〜', '福島県会津若松市の住宅エリア', 'PORTFOLIO DEMO｜架空店舗の制作事例です',
  '予約デモを体験',
].map((s) => s.replace(/\s+/g, ''))) if (!home.includes(t)) ng(`home missing: ${t}`);
for (const [q, a] of [...section('## 11. FAQ', '## 12. 技術').matchAll(/\*\*Q\. (.+?)\*\*\s*\nA\. (.+)/g)].map((m) => [m[1], m[2]])) {
  count++;
  if (!flat['first-visit/'].includes('Q' + q.replace(/\s+/g, '')) || !flat['first-visit/'].includes(a.trim())) ng(`faq: ${q}`);
}
if (!flat['reserve/'].includes('これはデモです。予約は成立していません')) ng('完了画面の文言');
for (const p of pages) {
  if (!flat[p].includes('PORTFOLIODEMO｜架空店舗の制作事例です')) ng(`${p || '/'} に帯がない`);
  if (!flat[p].includes('このサイトはWeb制作ポートフォリオ用の架空店舗デモです。')) ng(`${p || '/'} フッター免責`);
}

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
  const allowed = p === '' || p === 'access/';
  if (ifr.length !== (allowed ? 1 : 0) || ifr.some((i) => !/src="https:\/\/www\.google\.com\/maps\/embed\?/.test(i))) ng(`${p || '/'} iframe(許可は Google マップ埋め込み1点のみ。トップとアクセスのみ): ${ifr.length}`);
  if (/¥/.test(lines[p].join(''))) ng(`${p || '/'} ¥ 表記`);
}

console.log(`\n${count} spec rows checked, ${fail} failures`);
process.exit(fail ? 1 : 0);
