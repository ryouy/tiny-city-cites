// 店舗マスターデータ(すべて架空)。仕様書 §1・§2 に基づく。住所・電話・SNS・地図は設定しない。
export const site = {
  name: '麦と日々',
  kana: 'むぎとひび',
  en: 'MUGI TO HIBI',
  subtitle: '天然酵母と、季節のパン。',
  copy: 'パンのある日々を、もっと豊かに。',
  title: '麦と日々｜天然酵母と、季節のパン。（架空店舗のデモサイト）',
  description:
    '国産小麦と自家製天然酵母。会津の小さな工房から、毎日の食卓へ。架空のベーカリー「麦と日々」の制作実績用デモサイトです。',
  disclaimer:
    'このWebサイトは架空店舗「麦と日々」の制作実績用デモです。実際の店舗・販売・予約は行っていません。',
  bandText: '架空店舗のデモサイト｜実際の店舗・販売・予約は行っていません',
} as const;

export const nav = [
  { label: 'こだわり', href: '#commitment' },
  { label: 'パン', href: '#menu' },
  { label: '焼き上がり', href: '#today' },
  { label: '営業日', href: '#calendar' },
  { label: '店舗案内', href: '#shop' },
] as const;

export const hero = {
  label: 'BAKED WITH CARE, EVERY DAY.',
  lead: '国産小麦と自家製天然酵母。会津の小さな工房から、毎日の食卓へ。',
  note: '8:00–16:00（売り切れ次第終了）／月・火曜定休／持ち帰り専門',
  ctaPrimary: { label: '今日のパンを見る', href: '#today' },
  ctaSecondary: { label: 'お店について', href: '#about' },
} as const;

export const about = {
  heading: 'ゆっくり育てて、丁寧に焼く。',
  body: '小麦の香り、酵母の力、季節の恵み。必要以上に飾らず、まっすぐに。朝ごはんにも、午後のおやつにも、いつもの食卓に寄り添うパンを焼いています。',
  story:
    '会津若松の静かな住宅地。小さな工房から、毎朝パンの焼ける香りが広がります。夫婦で営む「麦と日々」では、国産小麦と自家製天然酵母を使い、素材と発酵の時間に向き合いながら、一つひとつ焼き上げています。飾らない日常の食卓に、毎日食べたいパンを届けます。',
  owner:
    '店主は製パン経験12年。都内のベーカリーで経験を積み、家族と会津へ移住。仕込み・成形・焼成を夫が担当し、接客と季節商品の企画を妻が担当しています。',
  ownerNote: '※すべて創作上の人物設定です。',
} as const;

export const commitments = [
  { title: '国産小麦', en: 'Domestic wheat', body: '小麦そのものの風味を感じられるよう、パンに合わせて粉を選んでいます。' },
  { title: '自家製天然酵母', en: 'Natural leaven', body: '発酵に時間をかけ、奥行きのある香りと味わいを育てます。' },
  { title: '毎朝焼きたて', en: 'Baked every morning', body: 'その日の分を少しずつ。焼き上がりに合わせて店頭に並べます。' },
] as const;

export const news = [
  { text: '秋のいちじくデニッシュ、はじまりました。' },
  { text: '今週の焼き上がり時間を更新しました。' },
] as const;

/** 店舗案内(表示順どおり)。住所・電話・地図・SNSは載せない。 */
export const shopInfo = [
  { term: 'エリア', desc: '福島県会津若松市郊外・住宅地（架空）' },
  { term: 'オープン', desc: '2022年10月（架空）' },
  { term: '営業時間', desc: '8:00–16:00（売り切れ次第終了）' },
  { term: '定休日', desc: '月曜日・火曜日' },
  { term: 'ご利用', desc: '持ち帰り専門（イートインはありません）' },
  { term: '駐車場', desc: '3台（架空）' },
  { term: 'お支払い', desc: '現金、クレジットカード、主要QRコード決済（架空）' },
  { term: '予算目安', desc: '600–1,500円' },
  {
    term: 'お取り置き',
    desc: 'パンのお取り置きは前日15:00まで、店頭で相談（架空の運用ルール）。デモのため、連絡の窓口は設けていません。',
  },
] as const;

export const shopNote =
  '詳細な住所・電話番号・SNSは、架空店舗のため掲載していません。';
