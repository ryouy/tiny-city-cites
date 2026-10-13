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

## データ編集

- `src/data/site.ts` 店舗情報・コピー・営業時間・こだわり・お好み選択肢
- `src/data/menu.ts` メニュー(税込価格・説明・ラベル)
- `src/data/photos.ts` 画像定義(ファイル名・alt・比率・撮影イメージ)

住所・電話番号・予約・SNSリンクは仕様上「設定しない」ため項目を持ちません。

## 画像の差し替え

`public/images/menya-gou/` に下表のベース名で画像を置いてビルドすると、プレースホルダーが自動で実写に切り替わります。拡張子は webp / png / jpg / jpeg / avif のいずれでも可です。画像生成または正当にライセンスを取得した素材のみ使用してください(実在店の写真・看板・人物が写るものは不可)。

| ファイル名 | 推奨比率 | 用途 |
|---|---|---|
| `hero-ramen.webp` | 16:10 横位置(PCでは右半分に全面表示、スマホ 4:3) | ヒーロー。海苔・ほうれん草・チャーシュー・鶏油、湯気 |
| `soup-detail.webp` | 1:1 〜 4:3(PCでは 21:9 に切り抜き) | こだわり。豚骨醤油スープの接写 |
| `noodle-lift.webp` | 4:5 縦位置 | ABOUT。箸で持ち上げた中太麺 |
| `rice-pairing.webp` | 16:10(スマホ 4:3) | 食べ方。ライス+海苔+ラーメン |
| `shop-interior.webp` | 4:3 | 営業案内。清潔なカウンター席 |

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
