# PÂTISSERIE LUNE（架空店舗の制作デモ）

架空の洋菓子店のデモサイトです。実在の店舗ではありません。仕様書: `../siyosyo/PATISSERIE_LUNE_Claude_Code.md`

技術: Astro 7 + TypeScript + 素のCSS の静的サイト（仕様書は Next.js を標準としていますが、本ワークスペースの他サイトに揃えて Astro を採用）。Node 22。

## 開発・ビルド

```sh
npm install
npm run dev -- --port 4408   # 開発サーバー
npm run build                # dist/ に静的出力
npm run preview -- --port 4408
npm run check                # astro check（型チェック）
npm run lint                 # eslint
npm run verify               # 仕様書と dist の突き合わせ（先に build）
```

## ページ

`/` トップ（大きな写真中心。カット3点、ホールケーキと焼き菓子、店舗の紹介、営業時間） / `/menu/` 商品一覧（ケーキ・ホール・焼き菓子のタブ。`#cut` `#whole` `#baked` で直接開ける） / `/order/` ホールケーキ（予約フローのデモ。送信しない） / `/about/` 店舗案内（お店について・営業情報・地図・FAQ。旧 /access/ を統合）

## データ編集

- 商品・価格: `src/data/menu.ts`
- 店舗情報・文言・FAQ: `src/data/site.ts`
- 画像定義（ファイル名・alt・撮影イメージ）: `src/data/photos.ts`

## 画像の差し替え

`public/images/patisserie-lune/` に下記のファイル名で置くと、ビルド時に自動で実写へ切り替わります（拡張子は webp / png / jpg / jpeg / avif のいずれか）。無い場合は「画像準備中」の単色面を表示します。現在は下記8点すべて配置済み（png）です。幅・高さと alt は `src/data/photos.ts` で管理しています。

| ファイル名（拡張子除く） | 比率 | 用途 |
|---|---|---|
| lune-hero | 4:3 | トップ冒頭（横長に切り出し） |
| lune-shop | 4:5 | トップ・店舗案内 |
| lune-shortcake / lune-tart / lune-chocolat | 4:5 | トップ・メニュー |
| lune-whole-cake | 1:1 | トップ・メニュー・ご予約 |
| lune-gift | 5:4 | トップ・メニュー（正方形に切り出し） |
| lune-baker | 4:5 | 店舗案内 |

カットケーキのモンブラン等3点（cake04〜06）は写真未配置です。追加する場合は `src/data/photos.ts` にキーを足し、`menu.ts` の `photo` を指定してください。

## メインサイトへの同居ビルド

```sh
BASE_PATH=/demos/patisserie-lune/ npm run build
```

favicon・画像・OG画像は `import.meta.env.BASE_URL` 経由のため、サブパス配下でも解決します。確認後は通常の `npm run build` で dist を作り直してください。

## noindex の注意

架空デモのため、全ページに `noindex,nofollow`、`robots.txt` は `Disallow: /`。canonical・構造化データ（LocalBusiness 等）は設定していません。公開環境でも検索に載せないでください。

## デモ機能について

`/order/` の予約フォームはブラウザ内のみで動作し、送信・保存は一切しません（「デモのため予約されません」と表示）。受取日の候補は火・水定休と3営業日前のデモ用ロジックで、祝日・臨時休業には対応していません。Google マップの埋め込みは `/about/` の1点のみで、会津若松市の目安として鶴ヶ城周辺を表示しています（店舗の所在地ではありません）。
