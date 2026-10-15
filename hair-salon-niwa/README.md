# HAIR SALON niwa

Web制作ポートフォリオ用の架空ヘアサロンのサイトです(免責はフッター1行のみ)。Astro + TypeScript + 素のCSS。

## ページ構成(6ページ)
- `/` トップ: 写真、ブランドコピー、About・3つの約束・はじめての方へ、スタイル抜粋、メニュー抜粋、スタッフ・営業時間
- `/styles` スタイルギャラリー(カテゴリ絞り込み、詳細モーダル)
- `/menu` メニュー・料金(カテゴリタブ、選択した料金・所要時間の表示)
- `/staff` スタッフ紹介(手元の写真とプロフィール)
- `/access` 店舗情報、地図(会津若松市周辺)、よくある質問
- `/reserve` 予約(ブラウザ内のみ。送信・保存なし。最後の確認画面に「予約は成立していません」の1行)

## データ編集
`src/data/` の `services.ts`(メニュー)、`styles.ts`(スタイル)、`staff.ts`、`site.ts`(店舗情報・文言)、`faq.ts`。

## 写真の使い方(配色は写真のクリーム色・蜂蜜色の木に合わせて調整)
- ヒーロー: `niwa-hero`(横長。PC 16:9・スマホ 4:3、`object-position` は鏡と椅子が切れない位置)
- トップ About: `niwa-interior`(4:5)/ スタッフ: `niwa-hands`(4:5)
- スタイル: `niwa-style-01`〜`06`(3:4。トップは4枚、`/styles` は6枚、モーダルはスマホ1:1・PC縦長)
- `niwa-staff-placeholder.svg` は人物写真が無い場合の代替で、現在は使っていません
- OG画像 `public/og.png` は hero 写真から作成

## 画像の差し替え
`public/images/hair-salon-niwa/` に `niwa-hero` / `niwa-interior` / `niwa-hands` / `niwa-style-01`〜`06`(webp・png・jpg・jpeg・avif のいずれか)を置くとビルド時に自動で表示されます。無い場合は「画像準備中」の単色面になります。写真ごとの alt・サイトは `src/data/photos.ts`。スタッフの顔写真は使いません(手元写真と文字のみ)。

## コマンド
`npm run dev` / `npm run build` / `npm run preview` / `npm run check` / `npm run lint` / `npm run verify`(仕様書との照合。`npm run build` 後に実行)

## BASE_PATH
サブパス配下に置く場合は `BASE_PATH=/demos/hair-salon-niwa/ npm run build`。内部リンクは `import.meta.env.BASE_URL` 基準です。
