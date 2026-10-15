# 炭火と酒 灯（SUMIBI TO SAKE AKARI）

> 店舗・メニュー・価格・人物・運営情報はすべて創作です(フッターに免責文を1行だけ掲載)。

備長炭の炭火料理と会津の地酒の店の1ページサイトです。文章は事実中心の短い文にしており、キャッチコピーや英字ラベルは置いていません(仕様書の詩的な文言は意図的に書き換え済み)。仕様書は `../siyosyo/AKARI_Claude_Code.md`。

## ページ構成（全画面セクション型）

1ページ内を、ほぼ1画面ぶんのセクションで区切っています。順に Hero / 灯について / お品書き（画面内タブで炭火料理・季節の一品・お飲み物を切替）/ 地酒 / コース / お席 / ご予約案内 / 営業情報 + フッター。

- スナップ・右端のインジケーターはありません。控えめなフェードイン(`.reveal`、動きを減らす設定では無効)があります。現在位置は上部ナビの `aria-current="location"` に反映されます（`src/components/SectionNav.astro`）。
- デザイン: 暗い背景に、紙色(お品書き)・アクセント色の帯(ご予約案内、コース2つ目)の面で起伏をつけています。ヒーローは写真全面+大きな明朝見出し+下端の営業情報帯、お品書きは紙色の品書き風(点線・大きな価格)、地酒は写真に重なるカード、お席は写真上に席数を重ねた構成です。
- フォント: 見出し・価格・数字は Shippori Mincho(Google Fonts、1ファミリーのみ)、本文は端末標準のゴシックです。
- セクションの並び・ナビの項目は `src/data/site.ts` の `screens` / `nav`。

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
| `src/data/site.ts` | 店名・紹介文・ナビ・営業情報・免責文・予約案内 |
| `src/data/menu.ts` | お品書き（炭火料理／季節の一品／お飲み物）。価格は税込の数値。各カテゴリに添える写真と object-position も指定 |
| `src/data/course.ts` | コース2種（価格・内容・提供条件） |
| `src/data/reservation.ts` | 予約プレビュー（非送信デモ）の設定: 時間帯、人数、コース条件 |
| `src/data/photos.ts` | 画像のファイル名（拡張子なし）・alt・実画像のピクセルサイズ |

## 画像の差し替え

`public/images/akari/` に下記ファイル名（拡張子は webp / avif / jpg / jpeg / png のいずれか。この順で自動判定）で置いてビルドすると、`Photo.astro` が自動で実画像（`object-fit: cover`、サイズ明示、lazy／heroのみ eager）に切り替わります。無い場合は控えめな単色面と「画像準備中」を表示します。

| ファイル名（拡張子なし） | 内容 | 使用箇所（各1か所・使い回しなし） |
| --- | --- | --- |
| `hero-charcoal` | 炭火焼きの火と料理 | Hero（左上の暗い部分に文字、下に焼き台） |
| `yakitori` | 焼き鳥盛り合わせ | 灯について |
| `basashi` / `donabe` | 馬刺し／土鍋ごはん | お品書き（季節の一品タブ） |
| `sake` | 陶器の酒器と日本酒 | 地酒 |
| `counter` | カウンター | お席（上部の横長バナー） |
| `semi-private` | 半個室 | お席（本文の右） |
| `exterior-night` | 夜の暖簾・店舗入口 | 営業情報 |

- 切り抜き位置は各 `<Photo pos="...">`（`src/pages/index.astro`、`src/data/menu.ts`）で調整します。画像を差し替えて縦横比が変わったら `src/data/photos.ts` の width / height も合わせてください。
- 生成画像または権利確認済みの素材のみを使用し、実在の店舗・人物・酒蔵の素材は使わないでください。
- **画像クレジット**: サイト内の料理・空間イメージは OpenAI の画像生成ツールで作成した、実写ではない編集イラストです（2026年10月）。

## メインサイトへの同居（BASE_PATH）

```sh
BASE_PATH=/demos/akari/ npm run build
```

`astro.config.mjs` が環境変数 `BASE_PATH`（未指定は `/`）を `base` に設定します。favicon・OG画像・画像は `import.meta.env.BASE_URL` 経由で参照しているため、サブパス配下でも解決されます（末尾スラッシュ付きで指定）。

## 予約プレビュー（非送信デモ）

「予約の入力画面を開く」から開くダイアログは、入力値を画面上に表示するだけで、保存・送信・通知・空席確認は一切行いません。日付は Asia/Tokyo 基準で、過去日・日曜（定休日）は選択不可、コースは2名以上かつ2日前まで。電話番号・メール・氏名などの入力欄はありません。

## noindex・実在連絡先について

`<meta name="robots" content="noindex, nofollow">` と `robots.txt`（Disallow: /）を設定し、LocalBusiness 等の構造化データ・canonical・電話・住所・SNSは設けていません（地図は会津若松市周辺の埋め込み1点のみ）。**公開後も noindex を外さないでください。**

OG画像（`public/og-image.png`）はHero写真に店名のみを重ねたものをChromeヘッドレスで1200×630に撮影したものです。
