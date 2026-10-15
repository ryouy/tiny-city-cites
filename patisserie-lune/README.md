# PÂTISSERIE LUNE

洋菓子店のサイト（制作用サンプル。フッターに免責を1行記載）。文章は事実のみの短文で、キャッチコピーは置かない。デザインは紙色・淡いピンク・深いベリー色の色面を交互に重ね、ヒーローは左にベリー色の面+右に大きな写真、カットケーキは高さをずらした3枚、ホールケーキは丸く切り出した写真、焼き菓子は写真を端まで広げたピンクの帯、店の紹介はアーチ窓の形に切り出した写真。メニューは札状のタブと点線の品書き行。フォントは本文が端末標準ゴシック、見出し・価格のみ Shippori Mincho B1（Google Fonts、1ファミリー）。仕様書: `../siyosyo/PATISSERIE_LUNE_Claude_Code.md`

技術: Astro 7 + TypeScript + 素のCSS の静的サイト（仕様書は Next.js を標準としていますが、本ワークスペースの他サイトに揃えて Astro を採用）。Node 22。

## 開発・ビルド

```sh
npm install
npm run dev -- --port 4428   # 開発サーバー
npm run build                # dist/ に静的出力
npm run preview -- --port 4428
npm run check                # astro check（型チェック）
npm run lint                 # eslint
npm run verify               # 仕様書と dist の突き合わせ（先に build）
```

## ページ

`/` トップ（全幅の写真と営業時間、カット3点、ホールケーキと焼き菓子、店の紹介） / `/menu/` 商品一覧（ケーキ・ホール・焼き菓子のタブ。`#cut` `#whole` `#baked`。写真のないカットケーキ3点は文字だけの行） / `/order/` ホールケーキ（予約フローのデモ。送信しない） / `/about/` 店舗案内（お店について・営業情報と地図・FAQ）

## データ編集

- 商品・価格: `src/data/menu.ts`
- 店舗情報・文言・FAQ: `src/data/site.ts`
- 画像定義（ファイル名・alt・撮影イメージ）: `src/data/photos.ts`

## 画像の差し替え

`public/images/patisserie-lune/` に下記のファイル名で置くと、ビルド時に自動で実写へ切り替わります（拡張子は webp / png / jpg / jpeg / avif のいずれか）。無い場合は「画像準備中」の単色面を表示します。現在は下記8点すべて配置済み（webp）です。幅・高さと alt は `src/data/photos.ts` で管理しています。

| ファイル名（拡張子除く） | 比率 | 用途 |
|---|---|---|
| lune-hero | 4:3 | トップ冒頭（PCは2:1に切り出し） |
| lune-shop | 4:5 | 店舗案内 |
| lune-shortcake / lune-tart / lune-chocolat | 4:5 | トップ・メニュー |
| lune-whole-cake | 1:1 | トップ・メニュー・ホールケーキのページ |
| lune-gift | 5:4 | トップ・メニュー |
| lune-baker | 4:5 | トップ（店の紹介） |

カットケーキのモンブラン等3点（cake04〜06）は写真未配置です。追加する場合は `src/data/photos.ts` にキーを足し、`menu.ts` の `photo` を指定してください。

## メインサイトへの同居ビルド

```sh
BASE_PATH=/demos/patisserie-lune/ npm run build
```

favicon・画像・OG画像は `import.meta.env.BASE_URL` 経由のため、サブパス配下でも解決します。確認後は通常の `npm run build` で dist を作り直してください。

## noindex の注意

全ページに `noindex,nofollow`、`robots.txt` は `Disallow: /`。canonical・構造化データは設定していません。検索に載せないでください。

## 送信されない機能

`/order/` のフォームはブラウザ内のみで動作し、送信・保存しません。Google マップの埋め込みは `/about/` の1点のみ（会津若松市周辺）。
