export const site = {
  name: '炭火と酒 灯',
  title: '炭火と酒 灯｜会津若松の炭火料理と地酒',
  description: '会津若松市の炭火料理と日本酒の店「炭火と酒 灯」。備長炭で焼く料理と会津の地酒を出しています。',
  /** フッター免責(仕様書の文言どおり) */
  disclaimer:
    '本サイトは架空店舗「炭火と酒 灯」を題材としたWeb制作デモです。実店舗・予約・営業は存在しません。',
  priceNote: '表示価格はすべて税込です。',
  nav: [
    { href: '#about', label: '店について' },
    { href: '#menu', label: 'お品書き' },
    { href: '#course', label: 'コース' },
    { href: '#space', label: 'お席' },
    { href: '#reservation', label: 'ご予約案内' },
    { href: '#info', label: '営業情報' },
  ],
  reserveCta: { href: '#reservation', label: 'ご予約について' },
  hero: {
    h1: '炭火と酒 灯',
    body: '備長炭で焼く料理と、会津の日本酒を出しています。営業は17:30から23:00まで、日曜は定休日です。',
    ctas: [
      { href: '#menu', label: 'お品書きを見る' },
      { href: '#course', label: 'コースのご案内' },
    ],
  },
  about: {
    heading: '店について',
    body: '備長炭で焼く料理と日本酒を出しています。献立は季節ごとに更新しています。',
    owner:
      '店主は40代の料理人。和食店で修業後、地元・会津若松で独立しました。炭火の火入れと日本酒の組み合わせを研究しています。',
  },
  sake: {
    heading: '地酒',
    body: '会津の日本酒を、季節に合わせて入れ替えています。飲み比べ三種もあります。',
    note: '特定の酒蔵・銘柄を示すものではありません。仕入れ状況により内容が変わります。',
  },
  space: {
    heading: 'お席',
    body: 'カウンター席、テーブル席、半個室があります。',
    seats: [
      { name: 'カウンター', count: 8, photo: 'counter' },
      { name: 'テーブル', count: 8, photo: null },
      { name: '半個室', count: 6, photo: 'semiPrivate' },
    ],
  },
  reservation: {
    heading: 'ご予約について',
    lead: '予約は電話または来店でご相談ください。下のボタンで、日時・人数・コースの入力画面を確認できます。',
    facts: [
      { term: '予約方法', desc: '電話予約・来店相談' },
      { term: '営業時間', desc: '17:30–23:00' },
      { term: '定休日', desc: '毎週日曜日' },
      { term: 'ご人数', desc: 'コースは2名から' },
      { term: 'コース', desc: '2日前までのご予約を想定' },
    ],
    demoButton: '予約の入力画面を開く',
    demoNotice: 'この画面から予約は送信・確定されません。',
  },
  info: [
    { term: '所在エリア', desc: '福島県会津若松市の中心市街地' },
    { term: '営業時間', desc: '17:30–23:00' },
    { term: 'ラストオーダー', desc: 'お料理 22:00／お飲み物 22:30' },
    { term: '定休日', desc: '毎週日曜日' },
    { term: '客単価', desc: '4,000–6,000円' },
    { term: '席数', desc: '22席（カウンター8／テーブル8／半個室6）' },
    { term: '喫煙', desc: '全席禁煙' },
    { term: '駐車場', desc: 'なし（近隣の有料駐車場のご利用を想定）' },
    { term: 'ご予約', desc: '電話予約・来店相談を想定' },
    { term: 'お支払い', desc: '現金・クレジットカード・主要QR決済' },
    { term: '開業', desc: '2021年11月' },
  ],
} as const;
