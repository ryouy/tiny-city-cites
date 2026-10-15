# small_biz

tiny city sites（営業用の公式サイト）と、ポートフォリオ用の架空店舗デモサイト群をまとめたリポジトリです。
各フォルダは独立した Astro + TypeScript プロジェクトです。

| フォルダ | 内容 |
|---|---|
| `tiny-city-sites/` | 公式サイト（メイン） |
| `kito-coffee/` | デモ: カフェ |
| `komeya/` | デモ: 定食屋 |
| `akari/` | デモ: 居酒屋 |
| `mugi-to-hibi/` | デモ: ベーカリー |
| `menya-gou/` | デモ: ラーメン店 |
| `soda-biyori/` | デモ: 喫茶店 |
| `hair-salon-niwa/` | デモ: 美容室 |
| `patisserie-lune/` | デモ: パティスリー |
| `siyosyo/` | 各サイトの仕様書 |
| `scripts/build-all.mjs` | メイン + 全デモを 1 つにまとめるビルド |

デモはすべて架空の店舗です。実在する店舗・商品・サービスではありません。

## 使い方

```sh
# 各プロジェクトで依存関係を入れる（初回のみ）
for d in tiny-city-sites kito-coffee komeya akari mugi-to-hibi menya-gou soda-biyori hair-salon-niwa patisserie-lune; do (cd $d && npm install); done

npm run build   # メイン + 全デモをビルドし tiny-city-sites/dist にまとめる（デモは /demos/<名前>/）
npm run serve   # ビルド後 http://localhost:4321 で配信
```

公開時は `tiny-city-sites/dist` だけを配信します。個別のデモを単体で動かす場合は、各フォルダで `npm run dev` を使います。

## 画像の追加

各サイトの `public/images/<名前>/` に写真を置きます（拡張子は webp / png / jpg のどれでも自動で使われます）。PNG はサイズが大きいため、置いたあとに `npm run images` を実行すると WebP に変換され、元のファイルは削除されます。

## Vercel でのデプロイ

ルートの `vercel.json` に設定があります（Install: `scripts/install-all.mjs`、Build: `npm run build`、Output: `tiny-city-sites/dist`）。Root Directory はリポジトリのルートのままにし、Node.js は 22.x、環境変数 `SITE_URL` に公開URLを設定してください。
