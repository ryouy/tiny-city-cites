# KITO COFFEE デモサイト

架空カフェ「KITO COFFEE」のWeb制作ポートフォリオ用デモサイトです。実在する店舗・商品・サービスではありません。仕様は `../siyosyo/KITO_COFFEE_Claude_Code.md` に基づきます。

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
| `/` | `src/pages/index.astro` | トップ(ヒーロー、ひと言紹介、営業時間の要約、メニュー抜粋、各ページへの導線) |
| `/menu/` | `src/pages/menu.astro` | メニュー全品(税込価格) |
| `/story/` | `src/pages/story.astro` | About・Coffee・Sweets・店主の紹介(写真と文章を交互に配置) |
| `/information/` | `src/pages/information.astro` | 営業情報・座席・支払い、地図、Gallery |

- `src/layouts/BaseLayout.astro` 全ページ共通(免責の帯、ヘッダー、フッター、`noindex`、フォント)。各ページが `title` / `description` / `current`(ナビの現在ページ表示)を渡します
- `src/data/site.ts` 店舗情報・免責文・ナビ。内部リンクは `url()` 経由で `BASE_URL` を基準にします
- `src/data/menu.ts` メニュー(品名・価格・説明)。価格は数値で持ち、画面側で `¥` 付き・税込表記に整形。`featured: true` の品がトップの抜粋に載ります
- `src/data/photos.ts` 写真の定義(ファイル名・alt・想定サイズ)
- `src/components/Photo.astro` 画像の表示/プレースホルダー切替
- `src/styles/global.css` 全スタイル(配色は先頭の CSS 変数)
- `scripts/verify.mjs` dist の全ページを検査(価格・営業情報・免責・noindex・禁止事項・リンク解決)

`BASE_PATH=/demos/kito/ npm run build` のようにサブパス配下へ出力できます(`npm run verify` も同じ環境変数で検査)。

## 検証

```sh
npm run check && npm run lint && npm run verify   # verify は build も実行
```

## 画像の差し替え

写真は `public/images/kito/` に次のファイル名(現在は png。webp 等に変える場合は `src/data/photos.ts` の `file` を変更)で置くと、ビルド時に自動で実画像へ切り替わります。ファイルが無い箇所は「画像準備中」のプレースホルダーを表示します。コードの変更は不要です(置いたあと `npm run build` / `npm run dev` を再起動)。

| ファイル | 内容 | 推奨サイズ(webp) |
|---|---|---|
| `hero.webp` | カフェ全景、自然光と木のカウンター(横長。トップと story) | 2400×1350 |
| `pour-over.webp` | 手注ぎドリップの寄り(story と Gallery) | 2000×1333 |
| `blend.webp` | 陶器カップのコーヒー(menu と Gallery) | 1600×1600 |
| `cheesecake.webp` | バスクチーズケーキ | 1800×1350 |
| `interior.webp` | 空間の引き写真(縦長) | 1600×2000 |
| `sweets.webp` | 焼き菓子とカフェラテ | 1600×1200 |

- 形式は WebP、1ファイル 300KB 前後を目安に圧縮してください。
- 表示は `object-fit: cover` で、箇所ごとに比率と切り抜き位置(`pos`)が異なります(トリミングされても問題ない構図で撮影・生成してください)。実サイズを変える場合は `src/data/photos.ts` の `width` / `height`(CLS防止用の intrinsic size)も合わせます。
- 利用権限を確認済みの撮影画像・生成画像のみ使用してください。`pour-over` `blend` `interior` `sweets` は Gallery でも使っています。

## メニューの編集

`src/data/menu.ts` の配列を編集します。`price` は数値(税込)、`¥650〜` のような表記は `priceSuffix: '〜'` を指定します。セット割などの注記は同ファイルの `menuNotes` です。

## デモ公開時の注意

- 全4ページに `noindex, nofollow`(`src/layouts/BaseLayout.astro`)を設定し、`robots.txt` は `Disallow: /` です。実在店舗の検索結果を汚さないよう、公開後もこの設定を外さないでください。
- `LocalBusiness` 構造化データは意図的に使っていません。`canonical` は公開URL未確定のため設定していません。
- OGP画像は `og-image.webp`(自作)です。公開URLが決まったら絶対URLに変更してください。
- 免責文(「このWebサイトはWeb制作ポートフォリオ用の架空店舗デモです。…」)はページ最上部の帯とフッターに常時表示されます。
