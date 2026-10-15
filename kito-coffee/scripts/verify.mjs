// dist/ の全ページHTMLを検査する。事前に `npm run build` を実行しておくこと(npm run verify は build も行う)。
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');
const errors = [];
const fail = (m) => errors.push(m);

const pages = { home: 'index.html', menu: 'menu/index.html', story: 'story/index.html', information: 'information/index.html' };
const html = {};
for (const [k, f] of Object.entries(pages)) {
  const p = join(dist, f);
  if (!existsSync(p)) fail(`ページが無い: ${f}`);
  else html[k] = readFileSync(p, 'utf8');
}
const text = (s) => s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');

const disclaimer = 'このWebサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在する店舗・商品・サービスではありません。';
const menuItems = [
  ['ハンドドリップ（本日の豆）', '¥550'], ['KITOブレンド', '¥500'], ['シングルオリジン', '¥650〜'], ['カフェラテ（HOT / ICE）', '¥600'],
  ['カプチーノ', '¥600'], ['エスプレッソ', '¥400'], ['コールドブリュー', '¥580'],
  ['自家製レモネード', '¥550'], ['チャイラテ', '¥620'], ['抹茶ラテ', '¥600'], ['オーガニックアップルジュース', '¥450'],
  ['バスクチーズケーキ', '¥580'], ['季節のフルーツタルト', '¥650'], ['キャロットケーキ', '¥550'], ['スコーン（プレーン）', '¥350'], ['自家製プリン', '¥480'],
];
const norm = (s) => s.replace(/\s+/g, '');

for (const [k, h] of Object.entries(html)) {
  const t = norm(text(h));
  if ((h.match(/<h1[\s>]/g) ?? []).length !== 1) fail(`${k}: h1 は1つであること`);
  if (!/<meta name="robots" content="noindex, nofollow"/.test(h)) fail(`${k}: noindex,nofollow が無い`);
  if (/rel="canonical"|application\/ld\+json|LocalBusiness/.test(h)) fail(`${k}: canonical/構造化データは不可`);
  if (/href="(tel|mailto):|<form[\s>]|<input[\s>]|<textarea/.test(h)) fail(`${k}: 電話・メール・フォームは不可`);
  if (/自家焙煎|instagram\.com|twitter\.com\/|facebook\.com/.test(h)) fail(`${k}: 禁止表現/SNSリンク`);
  if (t.split(norm(disclaimer)).length - 1 !== 1) fail(`${k}: 免責文がフッターの1か所だけにあること`);
  if (!/<footer[\s\S]*site-footer__disclaimer/.test(h)) fail(`${k}: 免責文がフッター内に無い`);
  if (/demo-band/.test(h)) fail(`${k}: 上部の注記帯が残っている`);
  const body = norm(text(h.replace(/<head>[\s\S]*<\/head>/, '').replace(/<footer[\s\S]*<\/footer>/, '')));
  if (/デモ|架空|サンプル|創作|ダミー/.test(body)) fail(`${k}: 本文に「デモ・架空・サンプル・創作」の表現が残っている`);
  if (!/<title>[^<]+<\/title>/.test(h) || !/<meta name="description" content="[^"]+"/.test(h)) fail(`${k}: title/description`);
  if (!/class="skip-link"/.test(h)) fail(`${k}: スキップリンク`);
  if ((h.match(/aria-current="page"/g) ?? []).length !== 1) fail(`${k}: aria-current が1つでない`);
  if (/<img(?![^>]*\balt=)/.test(h)) fail(`${k}: alt の無い img`);
  const iframes = (h.match(/<iframe/g) ?? []).length;
  if (iframes !== (k === 'information' ? 1 : 0)) fail(`${k}: 地図iframe数が不正(${iframes})`);
}
const titles = Object.values(html).map((h) => h.match(/<title>([^<]*)/)?.[1]);
if (new Set(titles).size !== titles.length) fail('title が重複している');
if (html.home && html.home.match(/<title>([^<]*)/)?.[1] !== 'KITO COFFEE | 会津若松のコーヒー店') fail('トップの title が想定と異なる');

if (html.menu) {
  const t = norm(text(html.menu));
  for (const [n, p] of menuItems) {
    if (!t.includes(norm(n + '税込' + p))) fail(`menu: ${n} ${p} が無い`);
  }
  for (const s of ['価格はすべて税込です。', 'セット：ケーキ＋ドリンクの合計額から¥100引き', 'コーヒー', 'その他のドリンク', 'お菓子']) {
    if (!t.includes(norm(s))) fail(`menu: 「${s}」が無い`);
  }
}
if (html.home) {
  const t = norm(text(html.home));
  for (const s of ['KITO COFFEE', '会津若松市のコーヒー店です。', '9:00–17:00（ラストオーダー16:30）', '火曜・第2水曜', '18席（カウンター6・テーブル12）／席の予約なし', 'バスクチーズケーキ税込¥580']) {
    if (!t.includes(norm(s))) fail(`home: 「${s}」が無い`);
  }
}
if (html.information) {
  const t = norm(text(html.information));
  for (const s of ['福島県会津若松市', '9:00–17:00（ラストオーダー16:30）', '火曜・第2水曜', '18席（カウンター6・テーブル12）／席の予約なし', '4台', 'ドリンク・焼き菓子可', '現金／クレジットカード／主要QR決済', '写真', '会津若松市周辺の地図']) {
    if (!t.includes(norm(s))) fail(`information: 「${s}」が無い`);
  }
}
if (html.story) {
  const t = norm(text(html.story));
  for (const s of ['お店', 'コーヒー', 'お菓子', '店主', '国内の専門ロースターから仕入れています', '東京のコーヒー専門店で約6年働いた', '2023年に']) {
    if (!t.includes(norm(s))) fail(`story: 「${s}」が無い`);
  }
}

// ポエム・英語キャッチ・情緒語の再発防止
const banned = /余白|ひととき|こだわ|丁寧|ご褒美|物語|想い|寄り添|彩る|紡|心地よい|ほっと|Specialty|Homemade|Gallery|AIZU|温もり|穏やか/;
for (const [k, h] of Object.entries(html)) {
  const body = text(h.replace(/<head>[\s\S]*<\/head>/, ''));
  const m = body.match(banned);
  if (m) fail(`${k}: 情緒語・英語キャッチが残っている (${m[0]})`);
}

// robots.txt
const robots = existsSync(join(dist, 'robots.txt')) ? readFileSync(join(dist, 'robots.txt'), 'utf8') : '';
if (!/Disallow: \//.test(robots)) fail('robots.txt に Disallow: / が無い');

// 内部リンク・リソースが dist 内で解決するか
const resolve = (ref) => {
  if (!ref.startsWith(base)) return false;
  const rel = ref.slice(base.length).split('#')[0].split('?')[0];
  const p = join(dist, rel);
  if (existsSync(p) && statSync(p).isFile()) return true;
  return existsSync(join(p, 'index.html'));
};
for (const [k, h] of Object.entries(html)) {
  for (const m of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = m[1];
    if (/^(https?:)?\/\/|^#|^data:/.test(ref)) continue;
    if (!resolve(ref)) fail(`${k}: リンク/リソースが解決しない ${ref}`);
  }
}

if (errors.length) {
  console.error(`verify NG (${errors.length})\n- ` + errors.join('\n- '));
  process.exit(1);
}
console.log(`verify OK: ${Object.keys(html).length} ページ (base=${base})`);
