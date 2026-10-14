# 横浜家系 麺屋 豪 デモサイト

架空のラーメン店「横浜家系 麺屋 豪」の営業用ポートフォリオ(非公式デモ)です。実在の店舗ではありません。店舗情報・メニュー・価格はすべて仕様書(`siyosyo/MENYA_GOU_Claude_Code.md`)の架空設定です。

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

1ページ・コンパクト型(スマホで約4画面)。上から、架空デモの帯 → ヒーロー(写真・店名・営業時間・「お品書きを見る」)→ お品書き(券売機風のボタン一覧、タブ切替)→ お好みシミュレーター(1ブロック)→ 一杯・ごはんの短い説明 → 店舗情報+地図 → フッター。固定バー・ヘッダーナビ・湯気アニメは置いていません。

## データ編集

- `src/data/site.ts` 店舗情報・コピー・営業時間・お好み選択肢
- `src/data/menu.ts` メニュー(税込価格・説明・ラベル)
- `src/data/photos.ts` 画像定義(ファイル名・alt・比率)

住所・電話番号・予約・SNSリンクは仕様上「設定しない」ため項目を持ちません。

## 画像の差し替え

`public/images/menya-gou/` に下表のベース名で画像を置いてビルドすると、プレースホルダーが自動で実写に切り替わります(webp / png / jpg / jpeg / avif)。

| ファイル名 | 用途 |
|---|---|
| `hero-ramen` | ヒーロー(スマホは縦長に切り抜き) |
| `rice-pairing` | 一杯・ごはんの説明 |
| `soup-detail` / `noodle-lift` / `shop-interior` | 現在ページでは未使用(コンパクト化のため)。Photo コンポーネントで再利用可能 |

## メインサイトへの同居ビルド

`BASE_PATH` を指定すると、全てのリソース(favicon・画像・OG画像)が配下パスで解決されます。

```sh
BASE_PATH=/demos/menya-gou/ npm run build
```

## noindex について

架空店舗のデモのため、`meta robots` は `noindex,nofollow`、`robots.txt` は `Disallow: /` です。canonical と LocalBusiness/Restaurant 等の構造化データは意図的に設定していません。実案件化する際は、これらを実店舗の情報に合わせて設定し直してください。

## 地図

営業案内に Google マップの埋め込みを1点のみ置いています(会津若松市の目安として鶴ヶ城周辺。店舗の所在地ではない旨のキャプション付き)。住所は載せていません。

## コントラスト

仕様の配色(墨黒 #151412 / 深紅 #AF2424 / 白 #FAF7F0 / 黄味 #D6A650 / 補助グレー #66615C)は、墨黒背景上の文字では深紅(2.72:1)・グレー(3.01:1)がAA未満のため、文字用の調整色 `--red-on-dark: #FF6B62`(6.60:1)と `--grey-on-dark: #A9A39C`(7.37:1)を追加しています。その他の組み合わせ(墨黒/白 17.2、深紅/白 6.3、グレー/白 5.7、黄味/墨黒 8.3 など)はAAを満たします。
