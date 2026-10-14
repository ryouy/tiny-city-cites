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

## ページ構成(1ページ・ポスター型)

`src/pages/index.astro` の1ページ。上から Hero(全幅写真+見出し)/ Signature(全幅写真+価格)/ MENU(罫線の価格表+セット・追加)/ Build Your Stack(参考金額のみの計算UI)/ OUR STYLE(鉄板の全幅写真+3行の工程)/ お店について(店内写真+文)/ テイクアウト(色面)/ 店舗情報(営業情報の表+告知欄+地図)/ フッター。

## データ編集

| ファイル | 内容 |
|---|---|
| `src/data/site.ts` | 店名、免責、各セクションの原稿、店舗情報 |
| `src/data/menu.ts` | BURGERS / SIDES / DRINKS、セット・追加トッピング(Build Your Stack と共通) |
| `src/data/photos.ts` | 画像のファイル名・alt・サイズ・未配置時の単色 |

## 画像の差し替え

`public/images/stack-burger/` に以下のファイル名で置くと、ビルド時に自動でプレースホルダー(単色面+「画像準備中」)から切り替わります(webp / png / jpg / jpeg / avif 対応)。

| ファイル名 | 場所 |
|---|---|
| `hero-burger` | Hero と Signature(全幅で切り出し。被写体は中央付近に) |
| `griddle` | OUR STYLE(全幅・3:2) |
| `interior` | お店について(16:9) |
| `classic` / `bacon` / `fries` | メニュー下の写真列(4:5)。3枚そろったときだけ表示 |

写真を置いた場合、文字が読めるよう黒の半透明の膜が自動で重なります。構図に合わせて `src/pages/index.astro` の `<Photo pos="...">`(object-position)を調整してください。

## BASE_PATH

メインサイト配下に置くときは `BASE_PATH=/demos/stack-burger/ npm run build`。内部パスはすべて `import.meta.env.BASE_URL` 基準です。
