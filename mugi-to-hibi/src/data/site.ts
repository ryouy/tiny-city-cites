// 店舗マスターデータ。仕様書 §1・§2 に基づく。住所・電話・SNSは設定しない。
export const site = {
  name: '麦と日々',
  kana: 'むぎとひび',
  en: 'MUGI TO HIBI',
  subtitle: '天然酵母と、季節のパン。',
  copy: 'パンのある日々を、もっと豊かに。',
  title: '麦と日々｜天然酵母と、季節のパン。',
  description:
    '国産小麦と自家製天然酵母。会津の小さな工房から、毎日の食卓へ。営業時間8:00–16:00、月・火曜定休。',
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
      '麦と日々のこだわり、営業カレンダー、店舗案内。営業時間8:00–16:00、定休日は月曜日・火曜日。',
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
  label: 'BAKED WITH CARE, EVERY DAY.',
  lead: '国産小麦と自家製天然酵母。会津の小さな工房から、毎日の食卓へ。',
  hours: '8:00–16:00',
  hoursNote: '（売り切れ次第終了）',
  closed: '月曜日・火曜日',
  takeout: '持ち帰り専門',
} as const;

export const about = {
  heading: 'ゆっくり育てて、丁寧に焼く。',
  body: '小麦の香り、酵母の力、季節の恵み。必要以上に飾らず、まっすぐに。朝ごはんにも、午後のおやつにも、いつもの食卓に寄り添うパンを焼いています。',
  story:
    '会津若松の静かな住宅地。小さな工房から、毎朝パンの焼ける香りが広がります。夫婦で営む「麦と日々」では、国産小麦と自家製天然酵母を使い、素材と発酵の時間に向き合いながら、一つひとつ焼き上げています。飾らない日常の食卓に、毎日食べたいパンを届けます。',
  owner:
    '店主は製パン経験12年。都内のベーカリーで経験を積み、家族と会津へ移住。仕込み・成形・焼成を夫が担当し、接客と季節商品の企画を妻が担当しています。',
} as const;

export const commitments = [
  { title: '国産小麦', body: '小麦そのものの風味を感じられるよう、パンに合わせて粉を選んでいます。' },
  { title: '自家製天然酵母', body: '発酵に時間をかけ、奥行きのある香りと味わいを育てます。' },
  { title: '毎朝焼きたて', body: 'その日の分を少しずつ。焼き上がりに合わせて店頭に並べます。' },
] as const;

export const news = [
  { text: '秋のいちじくデニッシュ、はじまりました。' },
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

