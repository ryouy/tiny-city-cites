# 喫茶 ソーダ日和（架空店舗デモ）

Web制作ポートフォリオ用の架空店舗デモサイトです。実在の店舗ではありません。仕様書: `../siyosyo/SODA_BIYORI_Claude_Code.md`

技術構成: Astro 7 + TypeScript + 素のCSS の静的サイト（仕様書は Next.js + Tailwind を標準としていますが、本ワークスペースの kito-coffee / komeya 等に揃えて Astro としています）。Node 22。

## 開発・ビルド

```sh
npm install
npm run dev        # 開発サーバー
npm run build      # dist/ に静的出力
npm run preview    # ビルド結果の確認（例: npm run preview -- --port 4406）
npm run check      # astro check（型検査）
npm run lint       # eslint
npm run verify     # 仕様書のメニュー・価格・営業情報と dist/index.html を突き合わせ（要 build）
```

## データの編集

- `src/data/site.ts` … 店舗設定・営業情報・お知らせ（サンプル）・店主設定
- `src/data/menu.ts` … クリームソーダ・スイーツ・フード・ドリンクと価格（税込・仕様書 §3 と一致させる）
- `src/data/photos.ts` … 画像のベース名・alt・撮影イメージ・推奨サイズ

画面はこれらの配列から描画されます。

## 画像の差し替え

`public/images/soda-biyori/` に下表のファイルを置くと、ビルド時に自動でプレースホルダー（「画像準備中」表示）から実画像へ切り替わります。拡張子は `webp` / `png` / `jpg` / `jpeg` / `avif` のいずれでも可（同じベース名）。生成画像、または商用利用の権利を確認した素材のみを使用してください。

| ファイル（ベース名） | 推奨比率 | 用途 |
|---|---|---|
| `hero-cream-soda` | 4:5（1200×1500） | ヒーロー、メロンソーダ（セレクター）、ギャラリー |
| `soda-ichigo` | 4:5 | いちごソーダ、ギャラリー |
| `soda-aozora` | 4:5 | 青空ソーダ、ギャラリー |
| `soda-yuyake` | 4:5 | ゆうやけソーダ、ギャラリー |
| `pudding` | 5:4（1500×1200） | プリン特集、ギャラリー |
| `napolitan` | 5:4 | 喫茶ごはん、ギャラリー |
| `omelette-rice` | 5:4（表示は正方形にトリミング） | 喫茶ごはん、ギャラリー |
| `shop-interior` | 5:4（表示は4:5・4:3にトリミング） | コンセプト、ギャラリー |
| `soda-kisetsu`（任意・仕様書に指定なし） | 4:5 | 季節のクリームソーダ（セレクター） |

## メインサイトへの同居ビルド

```sh
BASE_PATH=/demos/soda-biyori/ npm run build
```

`/favicon.svg`・画像・OG画像は `import.meta.env.BASE_URL` 経由で参照しているため、サブパス配下でも解決します。単体起動は `BASE_PATH` 不要（既定 `/`）。

## 注意（noindex）

架空デモのため `meta robots noindex,nofollow`・`robots.txt` で `Disallow: /`・canonical なし・構造化データなし。公開時もこの設定を外さないでください。実案件へ転用する場合は、店名・住所・電話・営業情報・メニュー・価格・免責表示・Googleマップ埋め込み・noindex を実情報に置き換えてください。

## その他

- 地図は Googleマップの小さな埋め込み1点のみ（会津若松市の目安として鶴ヶ城周辺。店舗の所在地ではない旨のキャプション付き）。住所・電話・予約フォームは設けていません。
- 書体は Zen Maru Gothic・DM Serif Display（SIL OFL、Google Fonts 配信）。
