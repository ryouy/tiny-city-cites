# HAIR SALON niwa

Web制作ポートフォリオ用の架空ヘアサロンのサイトです(免責はフッター1行のみ)。Astro + TypeScript + 素のCSS。

## ページ構成(6ページ)
- `/` トップ: 写真、事実だけの1文、お店について・はじめての方へ、スタイル抜粋、メニュー抜粋、スタッフ・営業時間
- `/styles` スタイルギャラリー(カテゴリ絞り込み(ショート・ボブ・ミディアム・ロング・メンズ)、詳細モーダル)
- `/menu` メニュー・料金(カテゴリタブ、選択した料金・所要時間の表示)
- `/staff` スタッフ紹介(手元の写真と経歴・得意な施術)
- `/access` 店舗情報、地図(会津若松市周辺)、よくある質問
- `/reserve` 予約(ブラウザ内のみ。送信・保存なし。最後の確認画面に「予約は成立していません」の1行)

## データ編集
`src/data/` の `services.ts`(メニュー)、`styles.ts`(スタイル)、`staff.ts`、`site.ts`(店舗情報・文言。キャッチコピーやスタッフのひとことは置かない方針)、`faq.ts`。

## 写真の使い方(配色は写真のクリーム色・蜂蜜色の木に合わせて調整)
- ヒーロー: `niwa-hero`(横長。PC 16:9・スマホ 4:3、`object-position` は鏡と椅子が切れない位置)
- トップ About: `niwa-interior`(4:5)/ スタッフ: `niwa-hands`(4:5)
- スタイル: `niwa-style-01`〜`06`(3:4。トップは4枚、`/styles` は6枚、モーダルはスマホ1:1・PC縦長)
- `niwa-staff-placeholder.svg` は人物写真が無い場合の代替で、現在は使っていません
- OG画像 `public/og.png` は hero 写真と店名・地域の1行で作成

## 画像の差し替え
`public/images/hair-salon-niwa/` に `niwa-hero` / `niwa-interior` / `niwa-hands` / `niwa-style-01`〜`06`(webp・png・jpg・jpeg・avif のいずれか)を置くとビルド時に自動で表示されます。無い場合は「画像準備中」の単色面になります。写真ごとの alt・サイトは `src/data/photos.ts`。スタッフの顔写真は使いません(手元写真と文字のみ)。

## コマンド
`npm run dev` / `npm run build` / `npm run preview` / `npm run check` / `npm run lint` / `npm run verify`(仕様書との照合。`npm run build` 後に実行)

## BASE_PATH
サブパス配下に置く場合は `BASE_PATH=/demos/hair-salon-niwa/ npm run build`。内部リンクは `import.meta.env.BASE_URL` 基準です。

## デザイン方針
- 書体は Zen Kaku Gothic New の1ファミリー。見出し・価格・数字は太字で大きくし、本文との差をつける。
- 色: 紙色の背景、少し濃い面(surface)、濃い茶(deep: メニュー抜粋・FAQ・予約案内の面)、はちみつ色(濃色面の価格・罫)、粘土色(短い色帯・左罫)。濃色面の文字は 7:1 以上。
- トップ: 大きな店内写真に、見出しのカードを重ねる。営業時間・席数・駐車場を大きな数字で並べる。スタイルは大きさと高さをずらした配置、メニュー抜粋は濃色面に大きな価格。
- 各ページは薄い色面の見出し帯から始まる。メニューは選ぶと濃色に反転し、右の濃色カードに料金を表示する。スタッフは得意な施術をタグ表示、FAQは濃色面。
- 動き: スクロールで出る表示、写真のホバー拡大のみ(prefers-reduced-motion では止まる)。影・グラデーション・英字ラベルは使わない。文章は事実(メニュー・料金・営業情報)のみ。
