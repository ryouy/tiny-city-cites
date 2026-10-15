/**
 * 料金プラン(税込)。表示される金額・内容はすべてこのファイルで管理します。
 * 契約書で定める事項(所有権・著作権・ソース引き渡し・保守解約時の扱い)は、ここでは断定しません。
 */

export type Plan = {
  id: string;
  name: string;
  recommended?: boolean;
  price: number; // 初期制作費(税込)
  target: string;
  features: string[];
  revisions: number; // 制作中の修正回数
  care: {
    name: string;
    price: number; // 月額(税込・任意)
    items: string[];
  };
};

export const plans: Plan[] = [
  {
    id: 'simple',
    name: 'シンプルプラン',
    price: 19800,
    target: '小規模な飲食店、カフェ、個人商店など',
    features: [
      '1ページ完結型ホームページ',
      '店舗紹介',
      '営業時間・定休日',
      'メニュー・商品紹介',
      '写真掲載',
      'アクセス情報・Googleマップへのリンク',
      'InstagramなどSNSへのリンク',
      'スマートフォン対応',
      '基本的なSEO設定',
    ],
    revisions: 2,
    care: {
      name: 'Simple Care',
      price: 2200,
      items: ['サイトの稼働確認', '公開環境・HTTPS設定の基本管理', '月1回までの軽微な更新', '技術的な不具合の確認'],
    },
  },
  {
    id: 'standard',
    name: 'こだわりプラン',
    recommended: true,
    price: 34800,
    target: '店舗の魅力や世界観を、より丁寧に伝えたい事業者',
    features: [
      '最大4ページ',
      '店舗に合わせたデザイン調整',
      '店舗紹介・メニューページ',
      '写真ギャラリー',
      '営業時間・アクセス情報',
      '予約・問い合わせへの導線',
      'InstagramなどSNSとの連携リンク',
      'スマートフォン対応',
      '基本的なSEO設定',
    ],
    revisions: 3,
    care: {
      name: 'Standard Care',
      price: 3300,
      items: [
        'サイトの稼働確認',
        '公開環境・HTTPS設定の基本管理',
        '月2回までの軽微な更新',
        '写真・文章・メニュー情報の差し替え',
        '技術的な不具合の確認',
      ],
    },
  },
];

export const pricing = {
  heading: '料金',
  cta: 'このプランについて相談する',
  recommendedLabel: 'おすすめ',
  revisionsLabel: '制作中の修正',
  careLabel: '月額保守(任意)',
  option: {
    title: '追加・個別対応',
    items: [
      { label: '追加ページ制作', price: '10,000円〜／ページ' },
    ],
    note: '独自予約システム、EC機能、多言語対応、大規模なデザイン変更などは個別にお見積もりします。',
  },
  careNotes: [
    '「軽微な更新」は、原則1回15分以内の作業を想定しています。',
    'ページ追加、大幅なデザイン変更、新機能追加などは別料金です。',
    '修正回数の翌月繰り越しはありません。',
  ],
  notes: [
    '表示価格は税込です。独自ドメイン・有料サービス等の費用は別途発生する場合があります。制作内容によっては個別にお見積もりいたします。',
    '月額保守は任意です。',
  ],
  terms: [
    '独自ドメインの取得・更新費用は別途実費です。',
    '写真・ロゴ・原稿は、原則お客様からご提供ください。写真撮影の代行は基本料金に含まれません。',
    '独自の予約システムや決済機能は基本料金に含まれません。',
    '正式な制作内容・納期は、事前のお見積もりで確定します。',
  ],
};

export const yen = (n: number) => `${n.toLocaleString('ja-JP')}円`;
