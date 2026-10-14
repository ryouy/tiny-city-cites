// 仕様書(§1,§3,§4)とビルド結果(dist の全ページ)を突き合わせる。事前に npm run build が必要。
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const specPath = process.env.SPEC_PATH ?? join(root, '..', 'siyosyo', 'MUGI_TO_HIBI_Claude_Code.md');
const pageFiles = { home: 'index.html', breads: 'breads/index.html', shop: 'shop/index.html' };
for (const f of Object.values(pageFiles)) {
  if (!existsSync(join(root, 'dist', f))) { console.error(`dist/${f} がありません。先に npm run build を実行してください`); process.exit(2); }
}
if (!existsSync(specPath)) { console.error(`仕様書が見つかりません: ${specPath}`); process.exit(2); }

const spec = readFileSync(specPath, 'utf8');
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '|').replace(/\|+/g, '|');
const pages = Object.fromEntries(Object.entries(pageFiles).map(([k, f]) => {
  const h = readFileSync(join(root, 'dist', f), 'utf8');
  return [k, { html: h, text: strip(h) }];
}));
const html = pages.breads.html; // 商品カードは /breads にある
const allHtml = Object.values(pages).map((p) => p.html).join('\n');
const text = Object.values(pages).map((p) => p.text).join('|');
let fail = 0;
const ok = (c, msg) => { console.log(`${c ? 'OK  ' : 'FAIL'} ${msg}`); if (!c) fail++; };
const has = (s) => text.includes(s);

// --- メニュー表(§3)をパース
const menuSec = spec.split('## 3. メニュー')[1].split('\n## ')[0];
const rows = menuSec.split('\n').filter((l) => /^\| [a-z]+ \|/.test(l) && !l.startsWith("| id ")).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
ok(rows.length === 8, `仕様書のメニュー行 ${rows.length} 件(期待 8)`);
for (const [id, name, price, cat, desc, tag] of rows) {
  const m = html.match(new RegExp(`<li[^>]*data-product-id="${id}"[^>]*>[\\s\\S]*?</li>`));
  if (!m) { ok(false, `${id}: 商品が出力されていない`); continue; }
  const li = m[0];
  const t = li.replace(/<[^>]+>/g, '|');
  ok(li.includes(`data-price="${price}"`), `${id}: data-price=${price}`);
  ok(li.includes(`data-category="${cat}"`), `${id}: カテゴリ ${cat}`);
  ok(t.includes(name), `${id}: 商品名「${name}」`);
  ok(t.includes(`¥|${Number(price).toLocaleString('ja-JP')}`) || t.replace(/\|/g, '').includes(`¥${Number(price).toLocaleString('ja-JP')}`), `${id}: 表示価格 ¥${price}`);
  ok(t.includes(desc), `${id}: 説明文一致`);
  if (tag) ok(t.includes(tag), `${id}: タグ「${tag}」`);
  else ok(!/class="tag"/.test(li), `${id}: タグなし`);
}
ok((html.match(/data-product-id=/g) ?? []).length === 8, '商品カードがちょうど8件');
const cats = ['すべて', '食事パン', '菓子パン', '惣菜パン', '季節限定', '焼き菓子'];
cats.forEach((c) => ok(html.includes(`data-filter="${c}"`), `フィルター「${c}」`));

// --- 営業情報(§1)
for (const s of ['8:00–16:00（売り切れ次第終了）', '月曜日・火曜日', '持ち帰り専門', '3台', '現金、クレジットカード、主要QRコード決済', '600–1,500円', '前日15:00まで、店頭で相談', '2022年10月', '福島県会津若松市郊外・住宅地', '天然酵母と、季節のパン。']) {
  ok(has(s), `店舗情報「${s}」`);
}

// --- 焼き上がり(§4.1)
const bake = spec.split('### 4.1')[1].split('### 4.2')[0].split('\n').filter((l) => /^\| \d\d:\d\d /.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
ok(bake.length === 4, `焼き上がり行 ${bake.length} 件`);
for (const [time, items, status] of bake) ok(has(`${time}|${items}|${status}`), `焼き上がり ${time} ${items}`);
ok(has('掲載時間は架空のサンプルです。リアルタイムの在庫・焼成情報ではありません'), '焼き上がり注記(仕様書の文言)');

// --- 文言(§2)
const quotes = [
  'BAKED WITH CARE, EVERY DAY.', '国産小麦と自家製天然酵母。会津の小さな工房から、毎日の食卓へ。', '今日のパンを見る', 'お店について',
  'ゆっくり育てて、丁寧に焼く。', '小麦の香り、酵母の力、季節の恵み。必要以上に飾らず、まっすぐに。朝ごはんにも、午後のおやつにも、いつもの食卓に寄り添うパンを焼いています。',
  '小麦そのものの風味を感じられるよう、パンに合わせて粉を選んでいます。', '発酵に時間をかけ、奥行きのある香りと味わいを育てます。', 'その日の分を少しずつ。焼き上がりに合わせて店頭に並べます。',
  '秋のいちじくデニッシュ、はじまりました。', '今週の焼き上がり時間を更新しました。',
  'このWebサイトは架空店舗「麦と日々」の制作実績用デモです。実際の店舗・販売・予約は行っていません。',
];
quotes.forEach((q) => ok(has(q), `文言「${q.slice(0, 24)}…」`));
ok(pages.home.html.includes('パンのある日々を、</span><span class="nb">もっと豊かに。'), 'H1 パンのある日々を、もっと豊かに。');
ok(has('営業時間') && pages.home.text.includes('8:00–16:00') && pages.home.text.includes('（売り切れ次第終了）') && pages.home.text.includes('月曜日・火曜日'), 'トップに営業時間・定休日');
ok(pages.home.text.includes('08:00|カンパーニュ・クロワッサン'), 'トップに今日の焼き上がり');
ok(pages.shop.text.includes('8:00–16:00（売り切れ次第終了）') && pages.shop.html.includes('data-calendar'), '/shop に営業時間とカレンダー');
ok(pages.home.text.includes('デモ用サンプル'), 'Newsに「デモ用サンプル」表記');
for (const [k, p] of Object.entries(pages)) {
  ok((p.html.match(/<h1[ >]/g) ?? []).length === 1, `${k}: h1 は1つ`);
  ok(/<meta name="robots" content="noindex, nofollow"/.test(p.html), `${k}: noindex,nofollow`);
  ok(!/rel="canonical"/.test(p.html), `${k}: canonical なし`);
  ok(/<title>[^<]*麦と日々/.test(p.html) && /<meta name="description" content="[^"]+"/.test(p.html), `${k}: title/description`);
  ok(p.text.includes('このWebサイトは架空店舗「麦と日々」の制作実績用デモです。実際の店舗・販売・予約は行っていません。'), `${k}: フッターの免責文`);
  ok(p.html.includes('class="demo-band"'), `${k}: 上部の帯`);
  ok(/aria-current="page"/.test(p.html), `${k}: aria-current`);
  ok(/href="#main"/.test(p.html), `${k}: スキップリンク`);
}
const titles = Object.values(pages).map((p) => p.html.match(/<title>([^<]*)/)[1]);
ok(new Set(titles).size === 3, 'title が全ページで固有');

// --- 禁止事項・SEO
// 地図は会津若松市の目安(鶴ヶ城周辺)の Google Maps 埋め込み 1 点のみ許可(店舗の所在地ではない)
const htmlNoMap = allHtml.replace(/<iframe[^>]*google\.com\/maps\/embed[^>]*><\/iframe>/g, '');
ok(!/href="tel:|href="mailto:|<form|<iframe|maps\.google|instagram|twitter\.com\/|facebook\.com|line\.me/i.test(htmlNoMap), '電話/メール/フォーム/SNSリンクなし(地図は目安の埋め込みのみ)');
ok(!/〒|TEL|電話番号：/.test(text.replace('詳細な住所・電話番号・SNSは、架空店舗のため掲載していません。', '')), '住所・電話の記載なし');
ok(!/class="eyebrow"|Our Story|Our Commitment|Today's Bake|Since 20|SCROLL/.test(allHtml), '装飾ラベル(eyebrow/Since/SCROLL 等)なし');
ok((text.match(/（架空）/g) ?? []).length === 0, '「（架空）」の繰り返しなし');
ok(!/application\/ld\+json|LocalBusiness/.test(allHtml), '構造化データなし');
ok((allHtml.match(/maps\/embed/g) ?? []).length === 1, '地図埋め込みは1点のみ');
const robots = join(root, 'dist', 'robots.txt');
ok(existsSync(robots) && /Disallow: \//.test(readFileSync(robots, 'utf8')), 'robots.txt Disallow');

console.log(fail ? `\n${fail} 件の不一致` : '\nすべて一致');
process.exit(fail ? 1 : 0);
