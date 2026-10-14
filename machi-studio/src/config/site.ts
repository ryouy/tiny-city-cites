/**
 * tiny city cites — サイト設定
 *
 * ブランド情報・連絡先・表示切り替えはすべてここで管理します。
 * 空文字("")の項目は「未設定」として扱われ、サイト上には表示されません。
 * 仮の値は入れず、確定してから記入してください。
 */

export type WorkItem = {
  title: string; // 店舗・プロジェクト名
  category: string; // 業種
  kind: 'Demo' | 'Concept Work' | 'Client Work'; // 制作区分
  summary: string; // 制作概要
  url?: string; // サイトURL
  thumbnail?: string; // /images/ 以下のパス
};

export const site = {
  name: 'tiny city cites',
    tagline: '小さなお店に、ちょうどいいWebを。',
  subtagline: 'お店の魅力が、まっすぐ伝わる場所を。',

  title: 'tiny city cites | 飲食店・個人商店のホームページ制作',
  description:
    'tiny city cites は、会津若松を拠点に飲食店・カフェ・個人商店のホームページを制作する個人Webデザインスタジオです。小さなお店に、ちょうどいいWebを。',

  /** 公開URL（例: "https://machi-studio.pages.dev"）。末尾スラッシュなし。確定後に設定。
   *  canonical / OGP URL / sitemap.xml に使われます。環境変数 SITE_URL でも上書き可。 */
  url: (import.meta.env.SITE_URL as string | undefined) ?? '',

  /** 連絡先。個人の電話番号は公開しない方針。 */
  contact: {
    /** Instagram のプロフィールまたはDMのURL。未設定の間はCTAが問い合わせセクションへ移動します。 */
    instagramUrl: 'https://www.instagram.com/tiny_city_cites/',
    /** Instagram ID（表示用。例: "@machi_studio"） */
    instagramHandle: '@tiny_city_cites',
    /** メールアドレス（任意） */
    email: '',
  },

  /** 活動拠点 */
  location: {
    current: '福島県会津若松市',
  },

  /** 運営者。name / title は空なら非表示。 */
  operator: {
    name: '',
    title: '',
    bio: '静岡県出身。会津大学の学部4年生で、コンピュータサイエンスを学びながら、個人でWeb制作に取り組んでいます。',
  },

  /** 「ご相談・お見積もりは無料です。」を表示するか。無料相談を提供する方針が確定してから true に。 */
  showFreeConsultation: true,

  /** 料金表示。金額が正式に確定するまでは false のままにしてください。 */
  pricing: {
    show: false,
    items: [
      { label: 'Webサイト制作', price: '49,800円〜' },
      { label: '保守・更新', price: '月額5,500円〜' },
    ],
    note: '※ 金額は目安です。ドメイン費用などは別途ご案内します。',
    hiddenNote: '内容に合わせてお見積もりいたします。',
  },

  /** Works セクション。false で非表示（ナビゲーションからも消えます）。 */
  works: {
    show: true,
    /** 制作実績・サンプル。正式に掲載できるものだけを追加。空のときは「準備中」を表示。 */
    items: [
      {
        title: 'KITO COFFEE',
        category: 'カフェ',
        kind: 'Demo',
        summary:
          'スペシャルティコーヒーと焼き菓子の店を想定した、架空店舗のデモサイトです。実在する店舗ではありません。',
        url: '/demos/kito-coffee/',
      },
      {
        title: 'お食事処 こめや',
        category: '食堂・定食屋',
        kind: 'Demo',
        summary:
          'メニューと営業時間を探しやすくした、昔ながらの定食屋を想定した架空店舗のデモサイトです。実在する店舗ではありません。',
        url: '/demos/komeya/',
      },
      {
        title: '炭火と酒 灯',
        category: '居酒屋',
        kind: 'Demo',
        summary:
          '炭火料理と地酒を楽しむ和モダンな居酒屋を想定した、架空店舗のデモサイトです。実在する店舗ではありません。',
        url: '/demos/akari/',
      },
      {
        title: '麦と日々',
        category: 'ベーカリー',
        kind: 'Demo',
        summary:
          '天然酵母のパンを扱う小さなベーカリーを想定した、架空店舗のデモサイトです。実在する店舗ではありません。',
        url: '/demos/mugi-to-hibi/',
      },
      {
        title: '横浜家系 麺屋 豪',
        category: 'ラーメン店',
        kind: 'Demo',
        summary:
          '家系ラーメン店を想定した、架空店舗のデモサイトです。お好みの組み合わせを確認できる画面も試作しました。実在する店舗ではありません。',
        url: '/demos/menya-gou/',
      },
      {
        title: '喫茶 ソーダ日和',
        category: '喫茶店',
        kind: 'Demo',
        summary:
          'クリームソーダが主役のレトロポップな喫茶店を想定した、架空店舗のデモサイトです。実在する店舗ではありません。',
        url: '/demos/soda-biyori/',
      },
      {
        title: 'HAIR SALON niwa',
        category: '美容室',
        kind: 'Demo',
        summary:
          'スタイル紹介とメニューを軸にした美容室を想定した、架空店舗のデモサイトです。予約画面は試作で、実際には予約されません。実在する店舗ではありません。',
        url: '/demos/hair-salon-niwa/',
      },
      {
        title: 'PÂTISSERIE LUNE',
        category: 'パティスリー',
        kind: 'Demo',
        summary:
          '洋菓子店を想定した、架空店舗のデモサイトです。ご注文画面は試作で、実際には注文されません。実在する店舗ではありません。',
        url: '/demos/patisserie-lune/',
      },
      {
        title: 'STACK BURGER',
        category: 'ハンバーガー店',
        kind: 'Demo',
        summary:
          '鉄板で焼くスマッシュバーガーの店を想定した、架空店舗のデモサイトです。金額を試算できる画面は試作で、注文はできません。実在する店舗ではありません。',
        url: '/demos/stack-burger/',
      },
      {
        title: 'トラットリア まちの灯',
        category: 'イタリアン',
        kind: 'Demo',
        summary:
          '家族経営の大衆イタリアンを想定した、架空店舗のデモサイトです。実在する店舗ではありません。',
        url: '/demos/trattoria-machi/',
      },
    ] as WorkItem[],
  },

  /** プライバシーポリシーページのURL（設定するとフッターにリンクが出ます） */
  privacyUrl: '',
};

export type Site = typeof site;
