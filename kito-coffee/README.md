# KITO COFFEE デモサイト

架空カフェ「KITO COFFEE」のWeb制作ポートフォリオ用サイトです(実在の店舗ではありません)。仕様は `../siyosyo/KITO_COFFEE_Claude_Code.md` に基づきます。

> 技術構成の判断: 仕様書の標準は Next.js + Tailwind CSS ですが、本ワークスペースの既存サイト(`tiny-city-cites`)が Astro + TypeScript + 素のCSS の静的サイトのため、それに揃えて Astro で構築しています。

## 開発

Node.js 22.12 以上が必要です。

```sh
npm install
npm run dev       # 開発サーバー (http://localhost:4321)
npm run build     # 静的サイトを dist/ に出力
npm run preview   # ビルド結果を確認 (例: npm run preview -- --port 4401)
npm run check     # 型チェック (astro check)
npm run lint      # ESLint
npm run verify    # ビルド後に全ページを検査
```

## 構成(4ページ)

| URL | ファイル | 内容 |
|---|---|---|
| `/` | `src/pages/index.astro` | トップ(店内写真、店の紹介1文、営業時間の要約、メニュー抜粋) |
| `/menu/` | `src/pages/menu.astro` | メニュー全品(税込価格) |
| `/story/`(ナビ表記は「お店について」) | `src/pages/story.astro` | お店・コーヒー・お菓子・店主(写真と短い説明) |
| `/information/` | `src/pages/information.astro` | 営業情報・座席・支払い、地図、写真4点 |

- `src/layouts/BaseLayout.astro` 全ページ共通(ヘッダー、フッター(免責文1行)、`noindex`、フォント)。各ページが `title` / `description` / `current`(ナビの現在ページ表示)を渡します
- `src/data/site.ts` 店舗情報・免責文(フッター用)・ナビ。内部リンクは `url()` 経由で `BASE_URL` を基準にします
- `src/data/menu.ts` メニュー(品名・価格・説明)。価格は数値で持ち、画面側で `¥` 付き・税込表記に整形。`featured: true` の品がトップの抜粋に載ります
- `src/data/photos.ts` 写真の定義(ファイル名・alt・想定サイズ)
- `src/components/Photo.astro` 画像の表示/プレースホルダー切替
- `src/styles/global.css` 全スタイル(配色は先頭の CSS 変数。紙色の背景1色、文字色、差し色の木の褐色のみ。端末標準のゴシック体で外部フォントなし、アニメーションなし)
- `scripts/verify.mjs` dist の全ページを検査(価格・営業情報・免責文がフッターのみにあること・本文に「デモ」等が無いこと・noindex・禁止事項・リンク解決)

`BASE_PATH=/demos/kito/ npm run build` のようにサブパス配下へ出力できます(`npm run verify` も同じ環境変数で検査)。

## 検証

```sh
npm run check && npm run lint && npm run verify   # verify は build も実行
```

## 画像の差し替え

写真は `public/images/kito/` に次のファイル名(webp)で置くと、ビルド時に自動で実画像へ切り替わります。ファイルが無い箇所は「画像準備中」のプレースホルダーを表示します。コードの変更は不要です(置いたあと `npm run build` / `npm run dev` を再起動)。

| ファイル | 内容 | 推奨サイズ(webp) |
|---|---|---|
| `hero.webp` | カフェ全景、自然光と木のカウンター(横長。トップと 写真ページ) | 1672×941(現在) |
| `pour-over.webp` | 手注ぎドリップの寄り(story と 写真ページ) | 1536×1024(現在) |
| `blend.webp` | 陶器カップのコーヒー(menu と 写真ページ) | 1254×1254(現在) |
| `cheesecake.webp` | バスクチーズケーキ(story) | 1448×1086(現在) |
| `interior.webp` | 空間の引き写真(縦長。story と 写真ページ) | 1122×1402(現在) |
| `sweets.webp` | 焼き菓子とカフェラテ(トップのメニュー抜粋) | 1448×1086(現在) |

- 形式は WebP、1ファイル 300KB 前後を目安に圧縮してください。
- 表示は `object-fit: cover` で、箇所ごとに比率と切り抜き位置(`pos`)が異なります(トリミングされても問題ない構図で撮影・生成してください)。実サイズを変える場合は `src/data/photos.ts` の `width` / `height`(CLS防止用の intrinsic size)も合わせます。
- 利用権限を確認済みの撮影画像・生成画像のみ使用してください。`hero` `blend` `interior` `pour-over` は情報ページの写真欄でも使っています。

## メニューの編集

`src/data/menu.ts` の配列を編集します。`price` は数値(税込)、`¥650〜` のような表記は `priceSuffix: '〜'` を指定します。セット割などの注記は同ファイルの `menuNotes` です。

## 公開時の注意

- 全4ページに `noindex, nofollow`(`src/layouts/BaseLayout.astro`)を設定し、`robots.txt` は `Disallow: /` です。実在店舗の検索結果を汚さないよう、公開後もこの設定を外さないでください。
- `LocalBusiness` 構造化データは意図的に使っていません。`canonical` は公開URL未確定のため設定していません。
- 免責文(「このWebサイトはWeb制作ポートフォリオ用の架空店舗デモです。…」)は全ページのフッターに小さく1行だけ表示します。`<title>` / description にも架空カフェである旨を残しています。
- 地図は会津若松市周辺の埋め込み1点のみ(情報ページ)。住所は載せていません。
- 予約・注文・問い合わせの機能、電話番号・メール・SNS・実住所はありません。
