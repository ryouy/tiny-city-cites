// 店舗設定は仕様書 §2 のとおり(すべて架空)。住所・電話・SNS は設定しない。
const base = import.meta.env.BASE_URL;
/** base 付きの内部リンクを作る(例: path('menu') → /menu/) */
export const path = (p = '') => (p === '' ? base : `${base}${p.replace(/^\//, '')}${p.endsWith('/') ? '' : '/'}`);

export const site = {
  name: 'HAIR SALON niwa',
  kana: 'ヘアサロン ニワ',
  wordmark: 'niwa',
  title: 'HAIR SALON niwa（ヘアサロン ニワ）｜髪から、日々を心地よく。（架空店舗デモ）',
  description:
    '福島県会津若松市の住宅エリアにある設定の、2席・完全予約制のプライベートヘアサロン「HAIR SALON niwa」。Web制作ポートフォリオ用の架空店舗デモサイトです。',
  copy: '髪から、日々を心地よく。',
  heroEn: 'A PLACE TO FEEL LIKE YOURSELF.',
  heroSub: 'いつもの自分に、ちょうどいい変化を。静かな空間で、一人ひとりの髪と丁寧に向き合うプライベートサロン。',
  band: 'PORTFOLIO DEMO｜架空店舗の制作事例です',
  disclaimer:
    'このサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在の店舗ではなく、店名・人物・料金・店舗情報はすべて創作です。実際の営業案内として使用しないでください。',
  opened: '2024年6月',
  cta: '予約デモを体験',
} as const;

export const bandParts = site.band.split('｜') as [string, string];

export const nav = [
  { href: path('menu'), label: 'Menu', ja: 'メニュー・料金' },
  { href: path('styles'), label: 'Styles', ja: 'スタイル' },
  { href: path('staff'), label: 'Staff', ja: 'スタッフ' },
  { href: path('first-visit'), label: 'First Visit', ja: 'はじめての方へ' },
  { href: path('access'), label: 'Access', ja: 'アクセス' },
];

export const about = {
  heading: '背伸びをしない、自分らしいきれい。',
  body: '髪質も、暮らし方も、似合うスタイルも一人ひとり違うから。niwaではカウンセリングの時間を大切にし、日々のお手入れまで見据えたヘアデザインをご提案します。落ち着いた空間で、どうぞゆっくりお過ごしください。',
  story:
    '店名「niwa」には、小さな庭のように自分のペースで過ごせる場所という思いを込めた。大きなサロンのにぎやかさが苦手な人にも、相談しながら髪型を決めたい人にも、肩肘張らずに通える空間。派手な流行を追うより、毎朝扱いやすい髪と、自然体の似合うスタイルを提案する。',
};

export const concepts = [
  { no: '01', title: '丁寧なカウンセリング', body: '悩みや好み、普段のセット方法までじっくり伺います。' },
  { no: '02', title: '毎日に馴染むスタイル', body: 'サロン帰りだけでなく、翌朝も扱いやすい髪へ。' },
  { no: '03', title: '静かに過ごせる空間', body: '2席だけのプライベートな空間で、自分の時間を。' },
];

export const firstVisit = {
  heading: 'はじめての方へ',
  body: 'ご希望の髪型が決まっていなくても大丈夫です。髪のお悩みや普段のライフスタイルを伺いながら、一緒にスタイルを考えていきます。',
};

export const infoRows: { k: string; v: string[] }[] = [
  { k: '営業時間', v: ['9:30〜18:30'] },
  { k: '最終受付目安', v: ['カット17:30', 'カット＋カラー16:00', '施術内容により変動します'] },
  { k: '定休日', v: ['月曜日・第1・第3日曜日'] },
  { k: '席数', v: ['2席（半個室風の配置）', '完全予約制'] },
  { k: '所在エリア', v: ['福島県会津若松市の住宅エリア', '架空設定のため、住所・電話番号は設定していません'] },
  { k: '駐車場', v: ['2台'] },
  { k: 'お支払い', v: ['現金、カード、QR決済（架空設定）'] },
];

export const facts = [
  { n: '2席', l: '完全予約制のプライベートサロン' },
  { n: '2024.6', l: '開業（架空設定）' },
  { n: '9:30–18:30', l: '月曜・第1/第3日曜定休' },
];

export const flow = [
  { no: '01', title: 'ご予約', body: '完全予約制です。このデモでは、予約デモを体験できます（実際の予約は成立しません）。' },
  { no: '02', title: 'カウンセリング', body: '悩みや好み、普段のセット方法までじっくり伺います。' },
  { no: '03', title: '施術', body: '髪の状態を見ながら、ご相談した内容に沿って進めます。' },
  { no: '04', title: 'お手入れのご提案', body: '翌朝も扱いやすいよう、日々のお手入れまで見据えてご提案します。' },
];
