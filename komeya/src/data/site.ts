// 店舗情報。文言を変える場合はこのファイルだけ編集します。
export const site = {
  name: 'お食事処 こめや',
  title: 'お食事処 こめや | 会津若松市の定食屋',
  description:
    '福島県会津若松市の定食屋「お食事処 こめや」。お品書き、営業時間、お持ち帰りの案内。',
  catchcopy: 'お食事処 こめや',
  lead: '会津若松市の定食屋です。昼と夜、日曜定休。',
  area: '福島県会津若松市の中心市街地',
  since: '1998年4月',
  hours: [
    { key: '昼', open: '11:00', close: '14:30', lastOrder: '14:00' },
    { key: '夜', open: '17:00', close: '20:00', lastOrder: '19:30' },
  ],
  closed: '毎週日曜',
  seats: { total: 30, detail: 'カウンター6席・テーブル16席・座敷8席' },
  parking: '6台',
  budget: '¥800–1,500',
  payment: '現金・PayPay',
  reservation:
    '5名以上のご団体のみ、お電話でご相談ください。',
  takeout: '弁当と一部のおかず',
  disclaimer:
    'このWebサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在する店舗・商品・サービスではありません。',
} as const;

export const nav = [
  { href: '#about', label: 'こめやについて' },
  { href: '#menu', label: 'お品書き' },
  { href: '#takeaway', label: 'お持ち帰り' },
  { href: '#info', label: '店舗案内' },
] as const;

export const stories = {
  about: {
    heading: 'こめやについて',
    body: '1998年4月に、会津若松出身の夫婦が始めた定食屋です。ごはんは地元の農家から仕入れる会津産コシヒカリを、羽釜で炊いています。味噌汁は毎朝仕込んでいます。',
  },
  takeaway: {
    heading: 'お持ち帰り',
    body: '唐揚げ弁当と生姜焼き弁当があります。ご注文方法・受付状況は店頭でご確認ください。',
  },
  daily: {
    heading: '日替わりについて',
    body: '日替わり定食の内容は、店頭でご案内しています。',
  },
} as const;
