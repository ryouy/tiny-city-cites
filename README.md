# small_biz

tiny city sites(営業用サイト)と、架空店舗のデモサイト10件のリポジトリ。各フォルダは独立した Astro プロジェクトです。

- `tiny-city-sites/` 公式サイト
- `kito-coffee` `komeya` `akari` `mugi-to-hibi` `menya-gou` `soda-biyori` `hair-salon-niwa` `patisserie-lune` `stack-burger` `trattoria-machi` デモ(公式サイトの `/demos/<名前>/` で配信)
- `siyosyo/` 仕様書

```sh
npm run install:all   # 全プロジェクトの依存を入れる
npm run build         # 全てを tiny-city-sites/dist にまとめる
npm run serve         # http://localhost:4321
npm run images        # 追加した写真を WebP に変換
```

Vercel は `vercel.json` の設定で、`tiny-city-sites/dist` を配信します(Node 22.x)。
