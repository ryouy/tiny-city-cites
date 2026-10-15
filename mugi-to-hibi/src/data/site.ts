// 店舗マスターデータ。仕様書 §1・§2 に基づく。住所・電話・SNSは設定しない。
export const site = {
  name: '麦と日々',
  kana: 'むぎとひび',
  en: 'MUGI TO HIBI',
  subtitle: '会津若松市の天然酵母パン屋',
  title: '麦と日々｜会津若松市の天然酵母パン屋',
  description:
    '会津若松市のパン屋、麦と日々。国産小麦と自家製天然酵母のパンを焼いています。営業時間8:00–16:00、月・火曜定休。',
  disclaimer:
    'このWebサイトは架空店舗「麦と日々」の制作実績用デモです。実際の店舗・販売・予約は行っていません。',
} as const;

/** 内部リンク用。BASE_URL(末尾スラッシュの有無どちらでも)を基準にする */
export const href = (path = '') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path}`;
};

export type PageKey = 'home' | 'breads' | 'shop';

export const pages = {
  home: {
    title: site.title,
    description: site.description,
  },
  breads: {
    title: 'パン｜麦と日々',
    description:
      '麦と日々のパン8種類。食事パン・菓子パン・惣菜パン・季節限定・焼き菓子。価格は税込。',
  },
  shop: {
    title: 'お店のこと｜麦と日々',
    description:
      '麦と日々について、営業カレンダー、店舗案内。営業時間8:00–16:00、定休日は月曜日・火曜日。',
  },
} as const;

/** ヘッダー・フッター共通のナビ。current はそのページを開いているとき aria-current="page" にする */
export const nav: { label: string; path: string; current?: PageKey }[] = [
  { label: 'パン', path: 'breads/', current: 'breads' },
  { label: '焼き上がり', path: '#today' },
  { label: '営業日', path: 'shop/#calendar' },
  { label: 'お店のこと', path: 'shop/', current: 'shop' },
];

export const hero = {
  heading: '会津若松市の天然酵母パン屋です。',
  lead: '国産小麦と自家製天然酵母のパンを、毎朝焼いています。',
  hours: '8:00–16:00',
  hoursNote: '（売り切れ次第終了）',
  closed: '月曜日・火曜日',
  takeout: '持ち帰り専門',
} as const;

export const about = {
  heading: 'お店について',
  story:
    '会津若松市郊外の住宅地にある、夫婦で営むパン屋です。国産小麦と自家製天然酵母を使い、毎朝工房で焼いています。',
  owner:
    '店主は製パン経験12年。都内のベーカリーで経験を積み、家族と会津へ移住。仕込み・成形・焼成を夫が担当し、接客と季節商品の企画を妻が担当しています。',
} as const;

export const commitmentsHeading = '材料と作り方';

export const commitments = [
  { title: '国産小麦', body: 'パンに合わせて粉を選んでいます。' },
  { title: '自家製天然酵母', body: '発酵に時間をかけて作っています。' },
  { title: '毎朝焼き', body: 'その日の分を毎朝焼き、焼き上がりに合わせて店頭に並べます。' },
] as const;

export const news = [
  { text: '秋のいちじくデニッシュを始めました。' },
  { text: '今週の焼き上がり時間を更新しました。' },
] as const;

/** 店舗案内(表示順どおり)。住所・電話・SNSは載せない。 */
export const shopInfo = [
  { term: 'エリア', desc: '福島県会津若松市郊外・住宅地' },
  { term: 'オープン', desc: '2022年10月' },
  { term: '営業時間', desc: '8:00–16:00（売り切れ次第終了）' },
  { term: '定休日', desc: '月曜日・火曜日' },
  { term: 'ご利用', desc: '持ち帰り専門（イートインはありません）' },
  { term: '駐車場', desc: '3台' },
  { term: 'お支払い', desc: '現金、クレジットカード、主要QRコード決済' },
  { term: '予算目安', desc: '600–1,500円' },
  {
    term: 'お取り置き',
    desc: 'パンのお取り置きは前日15:00まで、店頭で相談。このサイトからは受け付けていません。',
  },
] as const;

