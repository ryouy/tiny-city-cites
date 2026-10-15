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
- `/` トップ: 全幅の写真(hero-table)が濃い茶色の面にとけ、大きな明朝の見出し(事実のみ)、ランチ/ディナーの営業時間・予算の2枚の札、お店について(interior の大きな写真に重ねたカード、開業・席数・駐車場・定休日の赤い帯)、ギンガムチェックの区切り、店舗案内と地図
- `/menu/` お品書き: 濃色の見出し帯、黄色の固定カテゴリ帯、セクションごとに背景色を変えた価格表(ランチ=生成り、パスタ=ワイン色、ピッツァ=カード、前菜=オリーブ色、ドルチェ=生成り。ドット線でつないだ大きな価格)、濃色面のおふたりセット組み合わせデモ

## デザイン
色は生成り・濃茶・ワイン赤・オリーブ・マスタード。見出しと価格だけ Shippori Mincho B1(Google Fonts 1ファミリー)、本文は端末標準ゴシック。ギンガムチェックは CSS のみ。文章は事実の平易な文のまま。

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


## 文章とデザインの方針
紙色の背景1色、差し色は写真のバジルの緑のみ。端末標準のゴシック、見出しは中太、区切りは1pxの罫線。キャッチコピーや情緒的な文は置かず、事実と材料の説明だけにしています。仕様書の該当文言は書き換え済みで、`npm run verify` は新文言と、ポエム的な語が残っていないことを検査します。
