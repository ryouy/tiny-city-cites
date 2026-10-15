// 店舗情報・文言。店舗情報(営業時間・席数など)は仕様書(MENYA_GOU_Claude_Code.md)のとおり。キャッチ類は平易な文に書き換え済み。
// 住所・電話番号・予約リンク・SNSリンクは仕様上「設定しない」ため、項目自体を持たない。

export const site = {
  name: '横浜家系 麺屋 豪',
  kana: 'よこはまいえけい めんや ごう',
  en: 'MENYA GOU',
  title: '横浜家系 麺屋 豪',
  description: '会津若松市の家系ラーメン店。豚骨醤油ラーメン。昼と夜に営業、水曜定休。',
  disclaimer: 'このサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在の店舗ではありません。',
  copy: '会津若松市の家系ラーメン店です。',
} as const;

export const about = {
  heading: 'ラーメン',
  body: '豚骨と鶏ガラのスープに、醤油ダレと鶏油を合わせた家系ラーメンです。麺は中太のストレート麺です。',
} as const;

export const custom = {
  heading: 'お好みの注文',
  body: '麺の硬さ、味の濃さ、油の量を選べます。',
  note: '追加料金なし。はじめはすべて「ふつう」です。',
  disclaimer: '注文の送信や券売機との連動はしません。',
} as const;

export const preferences = [
  { id: 'noodle', label: '麺の硬さ', short: '麺', options: ['かため', 'ふつう', 'やわらかめ'] },
  { id: 'taste', label: '味の濃さ', short: '味', options: ['こいめ', 'ふつう', 'うすめ'] },
  { id: 'oil', label: '油の量', short: '油', options: ['おおめ', 'ふつう', 'すくなめ'] },
] as const;

export const rice = {
  heading: 'ごはん',
  body: 'ライスは小・中・大があります。海苔でごはんを巻いて食べる方もいます。',
} as const;

export const info = {
  heading: '店舗案内',
  hours: [
    { label: '昼', time: '11:00–15:00', lo: '14:45' },
    { label: '夜', time: '17:00–22:00', lo: '21:45' },
  ],
  holiday: '水曜日',
  rows: [
    { dt: '営業時間', dd: '昼 11:00–15:00（L.O. 14:45）／夜 17:00–22:00（L.O. 21:45）' },
    { dt: '定休日', dd: '水曜日' },
    { dt: '席数', dd: '22席（カウンター12、4名テーブル2卓、2名テーブル1卓）' },
    { dt: '駐車場', dd: '店舗前に8台' },
    { dt: '予算目安', dd: '900〜1,500円' },
    { dt: '注文方法', dd: '入店時に券売機で食券を購入し、スタッフに提出' },
    { dt: 'お支払い', dd: '券売機は現金対応' },
    { dt: 'ご予約', dd: '席予約はありません' },
    { dt: 'テイクアウト', dd: '対応しておりません' },
  ],
  area: '福島県会津若松市',
} as const;
