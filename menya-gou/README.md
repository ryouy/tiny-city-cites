# 横浜家系 麺屋 豪

「横浜家系 麺屋 豪」のサイトです(営業用ポートフォリオ。店舗は架空)。店舗情報・品名・価格は仕様書(`siyosyo/MENYA_GOU_Claude_Code.md`)のとおりです。キャッチコピーと商品説明は平易な文に書き換えており、`npm run verify` はその文言に合わせています。

> 仕様書は Next.js + Tailwind を標準としていますが、本ワークスペースの他サイトに揃えて Astro 7 + TypeScript + 素のCSS の静的サイトとして実装しています。

## 開発・起動・ビルド

Node 22 以上。

```sh
npm install
npm run dev        # 開発サーバー
npm run build      # dist/ に静的出力
npm run preview    # ビルド結果の確認
npm run check      # astro check(型検査)
npm run lint       # eslint
npm run verify     # 仕様書とビルド結果HTMLの突き合わせ(先に build)
```

## ページ構成

1ページ。上から、ヒーロー(店名・一文・営業時間の表・写真)→ お品書き(カテゴリ別の一覧。タブなし)→ お好みの注文(麺の写真つきシミュレーター)→ ラーメン → ごはん → 店舗案内(営業情報の表・店内写真・地図)→ フッター(免責文1行のみ)。

## デザイン

紙色の背景1色、文字は墨色、差し色は写真の赤を落ち着かせた1色(リンクとフォーカスのみ)。区切りは1pxの細罫線だけで、色面・影・角丸・バッジ・アニメーションは使いません。フォントは端末標準。見出しは中太(600)、本文は標準。文章は事実だけを短く書き、キャッチコピーは置いていません。

## データ編集

- `src/data/site.ts` 店舗情報・コピー・営業時間・お好み選択肢
- `src/data/menu.ts` メニュー(税込価格・説明・ラベル)
- `src/data/photos.ts` 画像定義(ファイル名・alt・比率)

住所・電話番号・予約・SNSリンクは仕様上「設定しない」ため項目を持ちません。

## 画像の差し替え

`public/images/menya-gou/` に下表のベース名で画像を置いてビルドすると、プレースホルダーが自動で実写に切り替わります(webp / png / jpg / jpeg / avif)。

| ファイル名 | 用途 |
|---|---|
| `hero-ramen` | ヒーロー(スマホ 6:5、PC 4:3 で切らずに表示) |
| `noodle-lift` | お好みシミュレーター横(PC 縦長、スマホ 2:1) |
| `soup-detail` | 一杯の説明(PC 正方形、スマホ 21:9) |
| `rice-pairing` | ごはんの説明 |
| `shop-interior` | 営業案内の上(PC 21:9、スマホ 16:9) |

## メインサイトへの同居ビルド

`BASE_PATH` を指定すると、全てのリソース(favicon・画像・OG画像)が配下パスで解決されます。

```sh
BASE_PATH=/demos/menya-gou/ npm run build
```

## noindex について

`meta robots` は `noindex,nofollow`、`robots.txt` は `Disallow: /` です。canonical と LocalBusiness/Restaurant 等の構造化データは意図的に設定していません。実案件化する際は、これらを実店舗の情報に合わせて設定し直してください。

## 地図

営業案内に Google マップの埋め込みを1点のみ置いています(会津若松市周辺。キャプションは「会津若松市周辺の地図」のみ、住所は載せていません)。

## コントラスト

文字色 #1d1b19、補助文字 #5f5a54、リンク #9a2a21 はいずれも背景 #f7f4ee 上でAA以上です。
