# HAIR SALON niwa(架空店舗デモ)

Web制作ポートフォリオ用の架空ヘアサロンのサイトです。実在の店舗ではありません。Astro + TypeScript + 素のCSS。

## ページ構成(6ページ)
- `/` トップ: 写真、ブランドコピー、About・3つの約束・はじめての方へ、スタイル抜粋、メニュー抜粋、スタッフ・営業時間
- `/styles` スタイルギャラリー(カテゴリ絞り込み、詳細モーダル)
- `/menu` メニュー・料金(カテゴリタブ、選択した料金・所要時間の表示)
- `/staff` スタッフ紹介(すべて架空の人物)
- `/access` 店舗情報、地図(鶴ヶ城周辺)、よくある質問(旧 /first-visit を統合)
- `/reserve` 予約デモ(ブラウザ内のみ。送信・保存なし)

## データ編集
`src/data/` の `services.ts`(メニュー)、`styles.ts`(スタイル)、`staff.ts`、`site.ts`(店舗情報・文言)、`faq.ts`。

## 画像の差し替え
`public/images/hair-salon-niwa/` に `niwa-hero` / `niwa-interior` / `niwa-hands` / `niwa-style-01`〜`06`(webp・png・jpg・jpeg・avif のいずれか)を置くとビルド時に自動で表示されます。無い場合は「画像準備中」の単色面になります。写真ごとの alt・サイトは `src/data/photos.ts`。スタッフの顔写真は使いません(手元写真と文字のみ)。

## コマンド
`npm run dev` / `npm run build` / `npm run preview` / `npm run check` / `npm run lint` / `npm run verify`(仕様書との照合。`npm run build` 後に実行)

## BASE_PATH
サブパス配下に置く場合は `BASE_PATH=/demos/hair-salon-niwa/ npm run build`。内部リンクは `import.meta.env.BASE_URL` 基準です。
