// 店舗設定は仕様書 §2 のとおり。住所・電話・SNS は設定しない。
const base = import.meta.env.BASE_URL;
/** base 付きの内部リンクを作る(例: path('menu') → /menu/) */
export const path = (p = '') => (p === '' ? base : `${base}${p.replace(/^\//, '')}${p.endsWith('/') ? '' : '/'}`);

export const site = {
  name: 'HAIR SALON niwa',
  kana: 'ヘアサロン ニワ',
  wordmark: 'niwa',
  title: 'HAIR SALON niwa（ヘアサロン ニワ）｜会津若松市の美容室',
  description:
    '福島県会津若松市の美容室「HAIR SALON niwa」。2席、完全予約制です。メニュー・料金、スタイル、営業時間を掲載しています。',
  hero: '福島県会津若松市の美容室です。2席、完全予約制。',
  disclaimer:
    '架空店舗のポートフォリオ用デモサイトです。実在店舗ではありません。店名・人物・料金・店舗情報は創作です。',
  cta: '予約する',
} as const;

export const nav = [
  { href: path('styles'), label: 'スタイル' },
  { href: path('menu'), label: 'メニュー・料金' },
  { href: path('staff'), label: 'スタッフ' },
  { href: path('access'), label: 'アクセス' },
];

export const about = {
  heading: 'お店について',
  body: 'カット、カラー、パーマ、トリートメント、ヘッドスパを行っています。施術の前に、髪の悩みや普段のセット方法を伺います。',
};

export const firstVisit = {
  heading: 'はじめての方へ',
  body: '髪型が決まっていなくても、相談しながら決められます。',
};

export const infoRows: { k: string; v: string[] }[] = [
  { k: '営業時間', v: ['9:30〜18:30'] },
  { k: '最終受付目安', v: ['カット17:30', 'カット＋カラー16:00', '施術内容により変動します'] },
  { k: '定休日', v: ['月曜日・第1・第3日曜日'] },
  { k: '席数', v: ['2席（半個室風の配置）', '完全予約制'] },
  { k: '所在エリア', v: ['福島県会津若松市の住宅エリア'] },
  { k: '駐車場', v: ['2台'] },
  { k: 'お支払い', v: ['現金、カード、QR決済'] },
];
