# 喫茶 ソーダ日和

Web制作ポートフォリオ用の架空店舗サイト（実在の店舗ではありません）。仕様書: `../siyosyo/SODA_BIYORI_Claude_Code.md`

技術構成: Astro 7 + TypeScript + 素のCSS の静的サイト（仕様書は Next.js + Tailwind を標準としていますが、本ワークスペースの kito-coffee / komeya 等に揃えて Astro としています）。Node 22。

## 開発・ビルド

```sh
npm install
npm run dev        # 開発サーバー
npm run build      # dist/ に静的出力
npm run preview    # ビルド結果の確認（例: npm run preview -- --port 4406）
npm run check      # astro check（型検査）
npm run lint       # eslint
npm run verify     # 仕様書のメニュー・価格・営業情報と dist 内の全3ページを突き合わせ（要 build）
```

## ページ構成

| URL | ファイル | 内容 |
|---|---|---|
| `/` | `src/pages/index.astro` | 黄色の看板風ヒーロー、クリームソーダの色の選択（5色）、お知らせ、他ページへの案内（ナポリタン・店内の写真タイル） |
| `/menu/` | `src/pages/menu.astro` | クリームソーダ・スイーツ・フード・コーヒー・紅茶の全メニュー（税込） |
| `/shop/` | `src/pages/shop.astro` | お店のこと（店内写真を全幅）、店主のこと、営業情報・地図、ギャラリー（上段ソーダ縦長・下段フード横長） |

内部リンクは `src/data/site.ts` の `url()`（`import.meta.env.BASE_URL` 基準）で生成します。ナビは `pages` 配列、各ページの title/description は `pageMeta` で編集します。

## データの編集

- `src/data/site.ts` … 店舗設定・営業情報・お知らせ・店主のこと・ページ別 title/description
- `src/data/menu.ts` … クリームソーダ・スイーツ・フード・ドリンクと価格（税込・仕様書 §3 と一致させる）
- `src/data/photos.ts` … 画像のベース名・alt・撮影イメージ・推奨サイズ

画面はこれらの配列から描画されます。

## 画像の差し替え

`public/images/soda-biyori/` に下表のファイルを置くと、ビルド時に自動でプレースホルダー（単色面＋小さな「画像準備中」）から実画像へ切り替わります。拡張子は `webp` / `png` / `jpg` / `jpeg` / `avif` のいずれでも可（同じベース名）。生成画像、または商用利用の権利を確認した素材のみを使用してください。

| ファイル（ベース名） | 推奨比率 | 用途 |
|---|---|---|
| `hero-cream-soda` | 4:5（1122×1402） | ヒーロー、メロンソーダ（セレクター・メニュー） |
| `soda-ichigo` | 4:5 | いちごソーダ、ギャラリー |
| `soda-aozora` | 4:5 | 青空ソーダ、ギャラリー |
| `soda-yuyake` | 4:5 | ゆうやけソーダ、ギャラリー |
| `pudding` | 5:4（1402×1122） | メニュー（スイーツ）、トップ案内、ギャラリー |
| `napolitan` | 5:4 | メニュー（フード）、ギャラリー |
| `omelette-rice` | 1:1（1254×1254。ギャラリーPCのみ5:4に切り出し） | メニュー（フード）、ギャラリー |
| `shop-interior` | 5:4（1402×1122。表示は4:3・16:9） | お店のこと、トップ案内、ギャラリー |
| `soda-kisetsu`（任意・仕様書に指定なし） | 4:5 | 季節のクリームソーダ（セレクター・メニューの一覧） |

## メインサイトへの同居ビルド

```sh
BASE_PATH=/demos/soda-biyori/ npm run build
```

`/favicon.svg`・画像・OG画像は `import.meta.env.BASE_URL` 経由で参照しているため、サブパス配下でも解決します。単体起動は `BASE_PATH` 不要（既定 `/`）。

## 注意（noindex）

架空店舗のため `meta robots noindex,nofollow`・`robots.txt` で `Disallow: /`・canonical なし・構造化データなし。公開時もこの設定を外さないでください。実案件へ転用する場合は、店名・住所・電話・営業情報・メニュー・価格・免責表示・Googleマップ埋め込み・noindex を実情報に置き換えてください。

## その他

- 地図は Googleマップの小さな埋め込み1点のみ（会津若松市周辺。キャプションは「会津若松市周辺の地図」）。住所・電話・予約フォームは設けていません。
- 画面上の注記は、フッターの免責1行、メニューページの「アレルゲン情報は掲載していません。」、クリームソーダ選択部の「実際の注文はできません。」のみです。
- 書体は外部フォントを使わず、システム日本語ゴシック（Hiragino Kaku Gothic ProN / Yu Gothic / Meiryo）のみ。太さは通常と太字の2段階。
- デザインは喫茶店のメニュー表・看板のように平面的に統一しています。配色は紙色 `#f7f0de`・墨 `#2a211c`・看板の黄 `#f0c23a`・メニュー価格の赤 `#b3261b`・リンク/フォーカスの青 `#1c5e99`。グラデーション・影・角丸・背景アニメーションは使っていません（色は `src/styles/global.css` 先頭の変数）。ソーダ選択の色見本は写真に合わせて `src/data/menu.ts` の `color`。
