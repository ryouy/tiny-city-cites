/**
 * tiny city sites — サイト設定
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
  name: 'tiny city sites',
  tagline: '会津大学の学生が、お店のホームページづくりをお手伝いします',
  subtagline: '飲食店や個人のお店を中心に、ホームページ制作を承っています。',

  title: 'tiny city sites | 会津大学の学生が、お店のホームページづくりをお手伝いします',
  description:
    '飲食店や個人のお店を中心に、ホームページ制作を承っています。学んだことを実際の制作で活かし、経験を積みたいという思いから、料金を抑えて取り組んでいます。「まずは話を聞いてみたい」という方も、お気軽にご相談ください。',

  /** 公開URL（例: "https://tiny-city-sites.pages.dev"）。末尾スラッシュなし。確定後に設定。
   *  canonical / OGP URL / sitemap.xml に使われます。環境変数 SITE_URL でも上書き可。 */
  url: (import.meta.env.SITE_URL as string | undefined) ?? '',

  /** 連絡先。個人の電話番号は公開しない方針。 */
  contact: {
    /** Instagram のプロフィールまたはDMのURL。未設定の間はCTAが問い合わせセクションへ移動します。 */
    instagramUrl: 'https://www.instagram.com/tiny_city_sites/',
    /** Instagram ID（表示用。例: "@machi_studio"） */
    instagramHandle: '@tiny_city_sites',
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
    bio: '静岡県出身。会津大学の学部4年生で、ソフトウェアを専攻しています。趣味は登山です。勉強しながら、個人でWeb制作に取り組んでいます。',
  },

  /** 「ご相談・お見積もりは無料です。」を表示するか。無料相談を提供する方針が確定してから true に。 */
  showFreeConsultation: true,

  /** Works セクション。false で非表示（ナビゲーションからも消えます）。 */
  works: {
    show: true,
    /** 制作事例。正式に掲載できるものだけを追加。空のときは「準備中」を表示。 */
    intro: '実在しない店舗を想定して作ったサンプルです。メニューや営業時間が、スマートフォンですぐ見つかるようにしています。',
    items: [
      {
        title: 'KITO COFFEE',
        category: 'カフェ',
        kind: 'Demo',
        summary:
          'スペシャルティコーヒーと焼き菓子の店。全4ページで、メニュー・店のストーリー・営業情報を分けて見せる構成です。',
        url: '/demos/kito-coffee/',
        thumbnail: '/images/works/kito-coffee.webp',
      },
      {
        title: 'お食事処 こめや',
        category: '定食屋',
        kind: 'Demo',
        summary:
          '昼夜の営業時間とお品書きを、トップですぐ見つけられる1ページ構成です。',
        url: '/demos/komeya/',
        thumbnail: '/images/works/komeya.webp',
      },
      {
        title: '炭火と酒 灯',
        category: '居酒屋',
        kind: 'Demo',
        summary:
          '夜の雰囲気を伝える全画面型の1ページ。お品書き・コース・お席を画面ごとに切り替えて見せます。',
        url: '/demos/akari/',
        thumbnail: '/images/works/akari.webp',
      },
      {
        title: '麦と日々',
        category: 'ベーカリー',
        kind: 'Demo',
        summary:
          '焼き上がりの時間と営業日が最初の画面でわかる、3ページ構成のパン屋のサイトです。',
        url: '/demos/mugi-to-hibi/',
        thumbnail: '/images/works/mugi-to-hibi.webp',
      },
      {
        title: '横浜家系 麺屋 豪',
        category: 'ラーメン店',
        kind: 'Demo',
        summary:
          '写真とお品書きをすぐ見せる、コンパクトな1ページ。好みの組み合わせも確認できます。',
        url: '/demos/menya-gou/',
        thumbnail: '/images/works/menya-gou.webp',
      },
      {
        title: '喫茶 ソーダ日和',
        category: '喫茶店',
        kind: 'Demo',
        summary:
          'クリームソーダの色を選んで楽しめる、3ページ構成の喫茶店のサイトです。',
        url: '/demos/soda-biyori/',
        thumbnail: '/images/works/soda-biyori.webp',
      },
      {
        title: 'HAIR SALON niwa',
        category: '美容室',
        kind: 'Demo',
        summary:
          'スタイル写真を大きく見せる6ページ構成。メニューと料金、スタッフ、アクセスも整理しています。',
        url: '/demos/hair-salon-niwa/',
        thumbnail: '/images/works/hair-salon-niwa.webp',
      },
      {
        title: 'PÂTISSERIE LUNE',
        category: 'パティスリー',
        kind: 'Demo',
        summary:
          'ケーキの写真が主役の4ページ構成。ホールケーキの受取日と金額の確認画面もあります。',
        url: '/demos/patisserie-lune/',
        thumbnail: '/images/works/patisserie-lune.webp',
      },
      {
        title: 'STACK BURGER',
        category: 'ハンバーガー店',
        kind: 'Demo',
        summary:
          '大きな写真で区切る縦長の1ページ。トッピングを選んで金額を確認できます。',
        url: '/demos/stack-burger/',
        thumbnail: '/images/works/stack-burger.webp',
      },
      {
        title: 'トラットリア まちの灯',
        category: 'イタリアン',
        kind: 'Demo',
        summary:
          'ランチとディナーを分けて見せる2ページ構成。おふたりセットの内容も確認できます。',
        url: '/demos/trattoria-machi/',
        thumbnail: '/images/works/trattoria-machi.webp',
      },
    ] as WorkItem[],
  },

  /** プライバシーポリシーページのURL（設定するとフッターにリンクが出ます） */
  privacyUrl: '',
};

export type Site = typeof site;
