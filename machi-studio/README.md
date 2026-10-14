# tiny city cites 公式Webサイト

小さなお店に、ちょうどいいWebを。 — Astro + TypeScript による静的シングルページサイト。

## 開発

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # dist/ に静的ファイルを出力
npm run preview   # ビルド結果の確認
```

Node.js 22.12 以上が必要です。

## 内容の更新

ブランド名・Instagram URL・連絡先・料金・Works はすべて [src/config/site.ts](src/config/site.ts) で管理します。
**空文字の項目は未設定として扱われ、サイトには表示されません。仮の値は入れないでください。**

| やりたいこと | 設定 |
|---|---|
| Instagram DM のリンクを設定 | `contact.instagramUrl` |
| メールアドレスを表示 | `contact.email` |
| 料金表を表示（金額確定後） | `pricing.show = true` |
| Works セクションを非表示 | `works.show = false` |
| 制作実績を追加 | `works.items` に追加（Demo / Concept Work / Client Work を明示） |
| 運営者の氏名・肩書きを表示 | `operator.name` / `operator.title` |
| 「相談は無料」表記を消す | `showFreeConsultation = false` |
| プライバシーポリシーへのリンク | `privacyUrl` |

文章は各 `src/components/*.astro`、デザイン（色・余白・書体）は `src/styles/global.css` の先頭の変数で調整できます。



## 公開前チェックリスト

- [x] `contact.instagramUrl` は設定済み（https://www.instagram.com/tiny_city_cites/）
- [ ] `SITE_URL` を設定
- [ ] ブランド名「tiny city cites」・商標・ドメインの重複確認
- [ ] 料金（金額・税込表示・作業範囲・ドメイン費用）を確定してから `pricing.show` を有効化
- [ ] 「ご相談・お見積もりは無料です。」を実際に提供するか確認
- [ ] FAQ・サービス内容が実際に提供できる範囲と一致しているか確認
- [ ] 運営者の氏名・肩書きの公開範囲を決定
- [ ] OGP画像（`public/og-image.png`）の最終確認
- [ ] 実機（iPhone Safari / Instagram アプリ内ブラウザ）での表示確認
- [ ] Lighthouse の計測

公開はvercelで

STACK_BURGER, TRATTORIA_MACHI_Claude_Code.md を読んで、記載されたデザインと仕様に従ってWebサイトを実装してください。写真を大胆に使い、商用案件に提案できる完成度を目指してください。最後にレスポンシブ表示、型チェック、ビルドを確認してください。