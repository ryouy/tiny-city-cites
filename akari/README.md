# 炭火と酒 灯（SUMIBI TO SAKE AKARI）デモサイト

> **架空店舗・Web制作ポートフォリオ用デモ。** 店舗・メニュー・価格・人物・運営情報はすべて創作で、実店舗・予約・営業は存在しません。

備長炭の炭火料理と会津の地酒をテーマにした、和モダンな夜の居酒屋の1ページサイトです。仕様書は `../siyosyo/AKARI_Claude_Code.md`。

技術: Astro 7 + TypeScript + 素のCSS の静的サイト（仕様書はNext.js等を推奨していますが、本ワークスペースの他プロジェクトと構成を揃えるため Astro を採用）。Node 22 以上。

## コマンド

```sh
npm install
npm run dev       # 開発サーバー
npm run build     # dist/ に静的出力
npm run preview   # ビルド結果の確認（例: npm run preview -- --port 4403）
npm run check     # astro check（型チェック）
npm run lint      # eslint
npm run verify    # 仕様書のお品書き・コース表と dist/index.html を突き合わせ（先に build）
```

## データの編集

文言・メニュー・画像定義は `src/data/` に集約し、配列から描画しています。

| ファイル | 内容 |
| --- | --- |
| `src/data/site.ts` | 店名・コピー・ナビ・営業情報・免責文・予約案内 |
| `src/data/menu.ts` | お品書き（炭火料理／季節の一品／お飲み物）。価格は税込の数値 |
| `src/data/course.ts` | コース2種（価格・内容・提供条件） |
| `src/data/reservation.ts` | 予約プレビュー（非送信デモ）の設定: 時間帯、人数、コース条件 |
| `src/data/photos.ts` | 画像のファイル名・alt・想定サイズ・プレースホルダー用キャプション |

## 画像の差し替え

写真素材は同梱していません。`public/images/akari/` に下記ファイルを置いてビルドすると、`Photo.astro` がビルド時に存在を判定し、自動で実画像（`object-fit: cover`、サイズ明示、lazy／heroのみ eager + fetchpriority）に切り替わります。無い場合は「画像準備中」の枠と撮影イメージを表示します。

| ファイル名 | 内容 | 比率 | 推奨サイズ |
| --- | --- | --- | --- |
| `hero-charcoal.webp` | 炭火焼きの火と料理 | 16:9 | 2400×1350 |
| `yakitori.webp` | 焼き鳥盛り合わせ | 4:5 | 1600×2000 |
| `basashi.webp` | 馬刺し | 4:5 | 1600×2000 |
| `donabe.webp` | 土鍋ごはん | 4:5 | 1600×2000 |
| `sake.webp` | 陶器の酒器と日本酒 | 3:2 | 2100×1400 |
| `counter.webp` | 暗めの和モダンカウンター | 16:9 | 2400×1350 |
| `semi-private.webp` | 半個室 | 4:3 | 1600×1200 |
| `exterior-night.webp` | 夜の暖簾・店舗入口 | 3:2 | 1800×1200 |

- 形式は webp、1枚あたり 300KB 前後を目安に圧縮してください。
- 生成画像または権利確認済みの素材のみを使用し、実在の店舗・人物・酒蔵の素材は使わないでください。実写に見せかけないこと。
- **画像クレジット**: サイト内の料理・空間イメージは OpenAI の画像生成ツールで作成した、実写ではない編集イラストです（2026年10月）。

## メインサイトへの同居（BASE_PATH）

```sh
BASE_PATH=/demos/akari/ npm run build
```

`astro.config.mjs` が環境変数 `BASE_PATH`（未指定は `/`）を `base` に設定します。favicon・OG画像・画像は `import.meta.env.BASE_URL` 経由で参照しているため、サブパス配下でも解決されます（末尾スラッシュ付きで指定）。

## 予約プレビュー（非送信デモ）

「予約画面のデモを見る」から開くダイアログは、入力値を画面上に表示するだけで、保存・送信・通知・空席確認は一切行いません。日付は Asia/Tokyo 基準で、過去日・日曜（定休日）は選択不可、コースは2名以上かつ2日前まで。電話番号・メール・氏名などの入力欄はありません。

## noindex・実在連絡先について

架空デモのため、`<meta name="robots" content="noindex, nofollow">` と `robots.txt`（Disallow: /）を設定し、LocalBusiness 等の構造化データ・canonical・電話・住所・地図・SNSは設けていません。**公開後も noindex を外さないでください。**

OG画像（`public/og-image.png`）は自作HTMLをChromeヘッドレスで1200×630に撮影したものです。
