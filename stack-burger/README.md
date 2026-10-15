# STACK BURGER

スマッシュバーガー店「STACK BURGER」(架空店舗)のWebサイトです。仕様書: `../siyosyo/STACK_BURGER_Claude_Code.md`。実在店舗ではなく、注文・予約・問い合わせ・SNS・電話番号・住所は設けていません。

技術: Astro 7 + TypeScript + 素のCSS の静的サイト(仕様書はNext.js等を標準としていますが、本ワークスペースの兄弟サイトの構成に揃えています)。Node 22。

## 開発・ビルド

```bash
npm install
npm run dev        # 開発サーバー
npm run build      # dist/ に静的出力
npm run preview    # ビルド結果の確認
npm run check      # astro check(型チェック)
npm run lint       # eslint
npm run verify     # 仕様書のメニュー・価格・営業情報・文言・禁止事項と dist/index.html を突き合わせ(先に build)
```

## ページ構成(1ページ)

`src/pages/index.astro` の1ページ。上から Hero(縦構図の写真を右に大きく。スマホは上)/ Signature(赤地に写真を左、価格と文を右)/ MENU(罫線の価格表+セット・追加+写真3枚)/ Build Your Stack(参考金額のみの計算UI)/ OUR STYLE(鉄板の写真を横長に見せ、下に文と3行の工程)/ お店について(文、続けて店内写真を全幅)/ テイクアウト(色面)/ 店舗情報(営業情報の表+告知欄+地図)/ フッター(免責1行)。

上部の注記帯はありません。免責はフッターの1行のみ。注文・決済・送信ができない旨は、Build Your Stack の見出し横の1行と、ボタン押下後の説明だけです。サイトは noindex,nofollow、robots.txt は Disallow です。

## データ編集

| ファイル | 内容 |
|---|---|
| `src/data/site.ts` | 店名、免責、各セクションの原稿、店舗情報 |
| `src/data/menu.ts` | BURGERS / SIDES / DRINKS、セット・追加トッピング(Build Your Stack と共通) |
| `src/data/photos.ts` | 画像のファイル名・alt・サイズ・未配置時の単色 |

## 画像の差し替え

`public/images/stack-burger/` に以下のファイル名で置くと、ビルド時に自動でプレースホルダー(単色面+「画像準備中」)から切り替わります(webp / png / jpg / jpeg / avif 対応)。

| ファイル名 | 場所 | サイズ |
|---|---|---|
| `hero-burger` | Hero(縦4:5。バーガーが中央に収まる構図) | 1122x1402 |
| `double` | Signature(縦4:5。バーガー中央、右にポテト) | 1122x1402 |
| `classic` / `bacon` / `fries` | メニュー下の写真列(4:5。スマホでは fries のみ横長に切り出し)。3枚そろったときだけ表示 | 1122x1402 |
| `griddle` | OUR STYLE(横長に切り出し。手元と道具が主役) | 1536x1024 |
| `interior` | お店について(16:9) | 1672x941 |

写真には文字を重ねていません(オーバーレイなし)。構図に合わせて `src/pages/index.astro` の `<Photo pos="...">`(object-position)を調整してください。サイズを変えたときは `src/data/photos.ts` の width/height も合わせます。

## BASE_PATH

メインサイト配下に置くときは `BASE_PATH=/demos/stack-burger/ npm run build`。内部パスはすべて `import.meta.env.BASE_URL` 基準です。
