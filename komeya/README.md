# お食事処 こめや

定食屋の架空店舗サイト(Astro + TypeScript)。実在する店舗ではありません。

```sh
npm install
npm run dev      # 開発
npm run build    # dist/ に出力(BASE_PATH=/demos/komeya/ で配信先を変更)
npm run verify   # ビルド後に内容を検査
```

- 店名・メニュー・営業情報: `src/data/`
- 写真: `public/images/komeya/`(webp / png / jpg。置いたあと、ルートで `npm run images` を実行すると WebP に変換)
