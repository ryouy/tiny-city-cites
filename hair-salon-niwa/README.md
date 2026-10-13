# HAIR SALON niwa(架空店舗デモ)

2席・完全予約制のプライベートヘアサロンを想定した、**架空店舗のポートフォリオ用デモサイト**です。実在の店舗ではなく、店名・人物・料金・店舗情報はすべて創作です。仕様書: `../siyosyo/HAIR_SALON_NIWA_Claude_Code.md`

技術は Astro 7 + TypeScript + 素のCSS の静的サイトです(仕様書は Next.js / Tailwind を推奨していますが、このワークスペースの他プロジェクトに揃えています)。

## 開発

```sh
npm install
npm run dev        # 開発サーバー
npm run build      # dist/ に静的ファイルを出力
npm run preview    # ビルド結果の確認(例: npm run preview -- --port 4407)
npm run check      # astro check(型チェック)
npm run lint       # eslint
npm run verify     # 仕様書とビルド結果(dist)のメニュー・料金・営業情報を突き合わせ(先に build)
```

Node 22 が必要です。

## ページ

`/` Home / `/styles` スタイル(カテゴリ絞り込み・詳細モーダル) / `/menu` メニュー・料金(カテゴリ切替・選択で料金と所要時間を表示) / `/staff` / `/first-visit`(流れ・FAQ) / `/reserve` 予約デモ / `/access`

予約デモはブラウザ内のみで動作し、**予約の確定・外部送信・保存・メール送信は一切ありません**。完了画面にも「これはデモです。予約は成立していません」と表示します。

## データの編集

`src/data/` に集約しています。

- `site.ts` 店舗設定・文言・営業情報・ナビ
- `services.ts` メニュー・税込料金(仕様書の表記のまま文字列で保持)
- `styles.ts` スタイルギャラリー(関連メニューは `services.ts` の id)
- `staff.ts` スタッフ(架空の人物)
- `faq.ts` FAQ
- `photos.ts` 画像の定義(ファイル名・alt・撮影イメージ)

## 画像の差し替え

写真素材は未同梱です。`public/images/hair-salon-niwa/` に下記のファイル名(拡張子は webp / png / jpg / jpeg / avif のいずれか)で置いて再ビルドすると、プレースホルダー(「画像準備中」)から自動で実写に切り替わります。権利確認済みの素材のみ使用してください。実在顧客のビフォーアフター写真は掲載しない前提です。

| ファイル名(拡張子除く) | 比率 | 用途 |
|---|---|---|
| `niwa-hero` | 3:2 横長(1800x1200) | ヒーロー(2席の静かなサロン内装) |
| `niwa-interior` | 4:5 縦長(1200x1500) | About / 初回来店(ミラー・木材・自然光) |
| `niwa-hands` | 4:5 縦長(1200x1500) | メニュー / スタッフ(スタイリングの手元。本人を特定しない) |
| `niwa-style-01` 〜 `niwa-style-06` | 3:4 縦長(1200x1600) | スタイルギャラリー |
| `niwa-staff-saeki` / `niwa-staff-takano`(任意・仕様書外) | 4:5(1000x1250) | スタッフ写真。未提供時は `niwa-staff-placeholder.svg`(シルエット)を表示 |

## メインサイトへの同居ビルド

```sh
BASE_PATH=/demos/hair-salon-niwa/ npm run build
```

`astro.config.mjs` の `base` を環境変数で切り替えます。favicon・画像・OG画像・内部リンクは `import.meta.env.BASE_URL` 経由です。

## noindex について

架空店舗のため `meta robots` は `noindex,nofollow`、`robots.txt` は `Disallow: /` です。LocalBusiness 等の構造化データ・canonical は意図的に設定していません。公開時にインデックスさせたい場合は、実在事業と誤認されないかを確認のうえで判断してください。

## 地図

アクセス欄の Google マップ埋め込みは、会津若松市のおおよその目安(鶴ヶ城周辺)を示すもので、店舗の所在地ではありません(キャプションにも明記)。住所は掲載していません。
