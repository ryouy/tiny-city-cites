# STACK BURGER(架空デモサイト)

架空のスマッシュバーガー店「STACK BURGER」のWebサイト制作デモです。仕様書: `../siyosyo/STACK_BURGER_Claude_Code.md`。実在店舗ではなく、注文・予約・問い合わせ・SNS・電話番号・住所は設けていません。

技術: Astro 7 + TypeScript + 素のCSS の静的サイト(仕様書はNext.js等を標準としていますが、本ワークスペースの兄弟サイトの構成に揃えています)。Node 22。

## 開発・ビルド

```bash
npm install
npm run dev        # 開発サーバー
npm run build      # dist/ に静的出力
npm run preview    # ビルド結果の確認
npm run check      # astro check(型チェック)
npm run lint       # eslint
npm run verify     # 仕様書のメニュー・価格・営業情報・文言と dist/index.html を突き合わせ(先に build)
```

## データ編集

文言・メニュー・画像定義はすべて `src/data/` に集約しています。

| ファイル | 内容 |
|---|---|
| `site.ts` | 店名、SEO文言、免責、Hero/About等の原稿、店舗情報 |
| `menu.ts` | BURGERS / SIDES / DRINKS、セット・追加トッピング(Build Your Stack と共通) |
| `steps.ts` | OUR STYLE の3ステップ |
| `photos.ts` | 画像のファイル名・alt・プレースホルダー用の撮影イメージ |

## 画像の差し替え

`public/images/stack-burger/` に、下表のファイル名(拡張子は webp / png / jpg / jpeg / avif のいずれか)で置くと、ビルド時に自動でプレースホルダーから画像へ切り替わります。未設置の間は「画像準備中」と撮影イメージを表示します。
画像はAI生成または利用許諾のある素材のみを使い、第三者店舗の写真・SNS投稿・口コミ写真は使わないでください。画像に文字・ロゴは焼き込まない仕様です。AI生成画像を実店舗の撮影写真と称さないでください。

| ファイル名 | 内容 | 比率 | 用途 |
|---|---|---|---|
| `hero-burger` | ダブルチーズバーガー(焼き目・溶けたチーズ・バンズ) | 4:5 | Hero。Signature でも同じ画像を中央拡大して使用 |
| `classic` | クラシックバーガー単品 | 4:5 | メニュー BURGERS |
| `bacon` | ベーコンバーガー単品 | 4:5 | メニュー BURGERS |
| `fries` | フライドポテト | 4:5 | メニュー SIDES |
| `griddle` | 熱い鉄板でパティを焼く手元 | 3:2 | OUR STYLE |
| `interior` | 明るく賑やかな小さなダイナー | 16:9 | ABOUT |

## メインサイトへの同居ビルド(BASE_PATH)

`astro.config.mjs` は環境変数 `BASE_PATH` を `base` に使います。単体起動は `/`、同居時は例えば:

```bash
BASE_PATH=/demos/stack-burger/ npm run build
```

favicon・OG画像・画像・ページ内リンクは `import.meta.env.BASE_URL` 経由です(ページ内アンカーは相対 `#…`)。

## noindex の注意

架空デモのため `meta robots noindex,nofollow` と `robots.txt`(`Disallow: /`)を設定し、canonical と構造化データ(LocalBusiness等)は意図的に設けていません。本番店舗へ移行する際は、これらの設定、店名・メニュー・価格・営業情報・住所・電話・地図・画像・免責表示を実店舗の情報へ差し替えてください。

## 地図

アクセス欄の Google マップ埋め込み(`src/components/MapEmbed.astro`)は、会津若松市のおおよその目安として鶴ヶ城周辺を表示するもので、店舗の所在地ではありません(キャプションに明記)。埋め込みはこの1点のみです。

## 色とコントラスト

仕様書の色(クリーム #F7E9C9 / ブラック #171717 / レッド #C83324 / マスタード #F2BC38 / ピクルスグリーン #43613E / サーフェス #FFF8E9)を使用。レッドとクリームは 4.41:1 で小さな文字には不足のため、小さな赤文字には調整色 `--red-text: #b22b1d` を追加、補助文字には `--mute: #4d4a42`、黒面の補助文字には `--on-ink-mute: #e6d9b8` を使用。赤面上の本文はサーフェス色(5.02:1)、レッド/マスタードの組み合わせは大きな文字・罫線のみに使用しています。
