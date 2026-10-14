# 麦と日々（MUGI TO HIBI）デモサイト

架空ベーカリー「麦と日々」のWeb制作ポートフォリオ用デモサイトです。店名・人物・所在地・商品・価格・営業条件はすべて架空で、実際の店舗・販売・予約は行っていません。仕様は `../siyosyo/MUGI_TO_HIBI_Claude_Code.md` に基づきます。

> 技術構成の判断: 仕様書の標準は Next.js + Tailwind CSS ですが、本ワークスペースの既存サイト(kito-coffee / komeya 等)に揃え、Astro + TypeScript + 素のCSS の静的サイトで構築しています。

## 開発

Node.js 22.12 以上が必要です。

```sh
npm install
npm run dev       # 開発サーバー (http://localhost:4321)
npm run build     # 静的サイトを dist/ に出力
npm run preview   # ビルド結果を確認 (例: npm run preview -- --port 4404)
npm run check     # 型チェック (astro check)
npm run lint      # ESLint
npm run verify    # 仕様書とビルド結果(dist の全3ページ)の商品・価格・営業情報・禁止事項を突き合わせ(要 build)
```

## ページ構成

| URL | 内容 |
|---|---|
| `/` | トップ。写真ヒーロー、営業時間・定休日、今日の焼き上がり(サンプル)、お知らせ(サンプル)、おすすめのパン3点、他ページへの導線 |
| `/breads/` | パン一覧(8商品)。カテゴリ絞り込みと詳細モーダル。写真のある商品は大きく、無い商品は文字だけの行で表示 |
| `/shop/` | お店のこと(紹介・こだわり)、営業カレンダー、店舗案内、地図 |

ページは `src/pages/`(`index.astro` / `breads.astro` / `shop.astro`)。共通のヘッダー・フッター・`<head>` は `src/layouts/BaseLayout.astro` に集約し、各ページから `current`(現在ページ)を渡すと `aria-current="page"` が付きます。内部リンクは `src/data/site.ts` の `href()` で `BASE_URL` 基準に生成します。

## データ編集

- `src/data/site.ts` 店舗情報・ページごとの title/description・ナビ・本文・お知らせ・店舗案内・免責文
- `src/data/menu.ts` メニュー(価格は税込の数値)。`photo` を指定した商品のみ写真枠、未指定は文字だけの行。`tags` に「人気」を入れた写真付き商品がトップの「おすすめ」に出ます
- `src/data/bakery.ts` 焼き上がり時間表(デモ専用)、定休曜日、臨時休業(サンプル)の日付配列
- `src/data/photos.ts` 写真の定義(ファイル名の拡張子なし・alt・object-position・サイズ)
- `src/styles/global.css` 全スタイル(配色は先頭の CSS 変数)

焼き上がり表は固定のサンプルで、現在時刻との照合や在庫表示は行いません。臨時休業は `specialClosures` に `YYYY-MM-DD` で追加します(空配列なら通常の定休日のみ)。サンプル日付は過ぎたら更新してください。

## 画像の差し替え

`public/images/mugi-to-hibi/` に下記のファイル名で置くと、ビルド時に自動で実画像へ切り替わります。拡張子は webp / png / jpg / jpeg / avif を自動判定します。無い箇所は単色面に小さく「画像準備中」を表示します(コード変更不要。置いたあと再ビルド)。

| ファイル | 内容 | 比率 / 推奨サイズ(webp) |
|---|---|---|
| `hero-bakery.webp` | 店内のパン棚(朝の斜光) | 16:9 / 2400×1350 |
| `bread-campagne.webp` | カンパーニュ | 4:5 / 1600×2000 |
| `bread-croissant.webp` | クロワッサン | 4:5 / 1600×2000 |
| `bread-anbutter.webp` | あんバター | 4:5 / 1600×2000 |
| `bread-danish.webp` | 季節デニッシュ | 4:5 / 1600×2000 |
| `bakery-process.webp` | パン作りの手元 | 3:2 / 1800×1200 |
| `shop-exterior.webp` | 郊外の小規模ベーカリー外観(架空のロゴ・看板のみ) | 3:2 / 1800×1200 |

WebP・1枚300KB前後が目安です。画像は自前の生成画像または利用許諾を確認したものだけを使い、検索結果画像の転載は行わないでください。実在店舗と混同される看板・ロゴは入れないこと。画像ライセンス情報はここに追記してください(現在配置済みの画像は PNG で1枚2〜3MB あります。公開前に WebP へ変換・圧縮してください)。

## メインサイトへの同居ビルド

```sh
BASE_PATH=/demos/mugi-to-hibi/ npm run build
```

`favicon.svg`・画像・OG画像は `import.meta.env.BASE_URL` 経由で参照するため、サブパス配下でも解決します。

## 公開上の注意

- 架空デモのため `noindex, nofollow` と `robots.txt`(Disallow: /)を設定しています。canonical や LocalBusiness 等の構造化データは、架空店舗を実在登録しないために設定していません。
- 住所・電話・地図・SNS・予約/問い合わせフォームは置いていません。
- Webフォントは Google Fonts(Shippori Mincho / Noto Sans JP)を読み込み、失敗時はシステムの明朝・ゴシックにフォールバックします。
- OG画像(`public/og-image.png`)はHTMLからヘッドレスChromeで生成した1200×630の自作画像です。
