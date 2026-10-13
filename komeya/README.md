# お食事処 こめや デモサイト

架空の定食屋「お食事処 こめや」のポートフォリオ用デモサイトです。実在する店舗・商品・サービスではありません。

- 技術: Astro 7 + TypeScript + 素のCSS(静的サイト / Node 22)
- 仕様書は Next.js + Tailwind が「新規の場合」の標準ですが、同一ワークスペースの既存サイト(machi-studio)が Astro 静的構成のため、それに揃えました。

## 開発・起動・ビルド

```bash
npm install
npm run dev        # 開発サーバー
npm run build      # dist/ に静的ファイルを生成
npm run preview    # ビルド結果の確認 (--port 4402 など指定可)
npm run check      # 型チェック (astro check)
npm run lint       # ESLint
npm run verify     # 仕様書のメニュー表と dist/index.html の品名・価格を突き合わせ(要 build)
```

`npm run verify` は既定で `../siyosyo/KOMEYA_Claude_Code.md` を読みます。別の場所は引数で指定してください。

## メニュー・店舗情報の編集

画面はすべてデータ配列から生成されます。

- `src/data/menu.ts` : お品書き(カテゴリ・品名・説明・税込価格)、お持ち帰り、看板2品。価格は数値(例: `980`)で書くと `¥980` と表示されます。
- `src/data/site.ts` : 店名、営業時間・L.O.、定休日、席数、決済、キャッチコピー、各セクション本文、免責文。
- `src/data/photos.ts` : 各写真のファイル名・alt・プレースホルダー用の撮影イメージ説明。

## 画像の差し替え

`public/images/komeya/` に次のファイル名で置くと、ビルド時に自動でプレースホルダーから実写に切り替わります(コード変更不要)。

| ファイル名 | 内容 |
|---|---|
| `hero-karaage.webp` | 唐揚げ定食の全景(ヒーロー・名物料理) |
| `sauce-katsudon.webp` | 会津ソースカツ丼 |
| `rice.webp` | 羽釜からよそった炊きたてごはん |
| `interior.webp` | 店内 |
| `noren.webp` | のれん・外観(架空デザイン) |
| `ginger-pork.webp` | 生姜焼き定食(お持ち帰り) |

推奨: WebP、横長 4:3(1200×900px)、各 200KB 前後まで。写真はすべて利用許諾のあるものだけを使ってください。サイズを変える場合は `src/data/photos.ts` の `width` / `height` も合わせます(レイアウトずれ防止)。

OGP画像は `public/og.png`(1200×630)。差し替える場合は同名で置いてください。

## デモ公開時の注意

- 検索に載せない設定です: `<meta name="robots" content="noindex,nofollow">`、`/robots.txt` は `Disallow: /`。公開しても検索エンジンに登録されないようにしています。
- canonical、LocalBusiness 構造化データ、sitemap は意図的に設定していません。
- OGP画像のURLは相対パス(`/og.png`)です。SNSでのプレビューが必要な場合は、公開URLに合わせて絶対URLへ変更してください。
- 電話番号・住所・SNS・地図・注文/予約ボタンは、実在する連絡先がないため置いていません。
