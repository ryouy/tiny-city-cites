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

`src/pages/index.astro` の1ページ。上から トップ(写真と店名・一文)/ ダブルチーズ・スタック(写真と価格)/ メニュー(細線の価格表+セット・追加+写真3枚)/ 金額の計算(参考金額のみ)/ 焼き方(写真と3行)/ お店について / 店舗案内(営業情報の表+告知欄+地図)/ フッター(免責1行)。

配色は紙色の背景、墨色の文字、差し色の赤茶1色。端末標準のゴシック体(見出し600、本文400)、区切りは1pxの細線のみで、色面・影・角丸・アニメーションは使っていません。文言は短く事実だけを書き、キャッチコピーは置いていません(verify はポエム調の語が残っていないかも検査します)。

上部の注記帯はありません。免責はフッターの1行のみ。注文・決済・送信ができない旨は、Build Your Stack の見出し横の1行と、ボタン押下後の説明だけです。サイトは noindex,nofollow、robots.txt は Disallow です。

## データ編集

| ファイル | 内容 |
|---|---|
| `src/data/site.ts` | 店名、免責、各セクションの文、店舗情報 |
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
