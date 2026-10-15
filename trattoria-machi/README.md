# トラットリア まちの灯(架空デモサイト)

架空のイタリアン「トラットリア まちの灯」の Web サイト制作デモ。仕様書: `../siyosyo/TRATTORIA_MACHI_Claude_Code.md`
店舗・人物・価格・提供内容はすべて創作です。

> 仕様書は Next.js + Tailwind を推奨していますが、本ワークスペースの他サイトに揃え Astro 7 + TypeScript + 素の CSS の静的サイトで実装しています。

## 開発
```
npm install
npm run dev        # 開発サーバー
npm run build      # dist/ に静的出力
npm run preview -- --port 4420
npm run check      # astro check(型チェック)
npm run lint       # eslint
npm run verify     # 仕様書とビルド結果(dist/index.html と dist/menu/index.html)の突き合わせ。先に build すること
```
Node 22 系。

## ページ構成
- `/` トップ: 全幅の写真(hero-table)と濃い茶色の面(見出し・ランチ/ディナー・定休日)、お店のこと(interior)、店舗案内と地図
- `/menu/` お品書き: ランチ・パスタ・ピッツァ・前菜・ドルチェとドリンクの価格表(写真つき)、おふたりセットの組み合わせデモ。カテゴリはページ内リンク

## データ編集
- `src/data/site.ts` 店舗情報・見出し・本文・営業情報
- `src/data/menu.ts` メニュー・価格(税込)・2名セット
- `src/data/photos.ts` 画像定義(ファイル名・alt・撮影イメージ。撮影イメージはプレースホルダーの alt に使用)
ページは配列から描画されます。

## 画像の差し替え
`public/images/trattoria-machi/` に下記のベース名で `webp / png / jpg / jpeg / avif` のいずれかを置いてビルドすると、プレースホルダーから自動で実写に切り替わります。画像内に価格・ロゴ・店名を入れないでください。許諾済み・AI生成素材のみ使用すること。

| ファイル名(拡張子は任意) | 比率 | 用途 |
|---|---|---|
| hero-table | 16:9 | トップのヒーロー(スマホ16:10、PC21:9に切り出し。object-position は src/data/photos.ts の pos) |
| pasta-cream | 4:5 | お品書き(ランチ) |
| pizza-margherita | 4:5 | お品書き(ピッツァ) |
| pasta-tomato | 4:5 | お品書き(パスタ) |
| antipasti | 4:5 | お品書き(前菜) |
| tiramisu | 4:5 | お品書き(ドルチェとドリンク) |
| interior | 3:2 | トップ(お店のこと) |

`public/og.png`(1200x630)は Chrome ヘッドレスで作成した自作画像です。

## メインサイトへの同居ビルド
```
BASE_PATH=/demos/trattoria-machi/ npm run build
```
favicon・OG 画像・画像・内部リンクは `import.meta.env.BASE_URL` 経由です。

## noindex の注意
本サイトは架空店舗のため、上部の注記帯は置かず、免責文はフッター1行と title/description のみです。`meta robots noindex,nofollow`、`robots.txt` は `Disallow: /`、canonical と構造化データは設けていません。実店舗化する場合は外してください。

## 地図
アクセスに Google マップ(会津若松市周辺・鶴ヶ城付近)を1点だけ埋め込み、キャプションは「会津若松市周辺の地図」のみです。住所は載せていません。

## 実案件へ転用する際の確認項目
メニュー・価格・営業時間/定休日・予約方法(電話番号)・ロゴ・写真の権利・店名の商標・住所/地図・お知らせの運用・免責表示の削除と noindex の解除。
