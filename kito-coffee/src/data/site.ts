/** 内部リンク用。BASE_PATH 付きビルドでも動くよう BASE_URL を基準にする */
export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;

export type PageKey = 'home' | 'menu' | 'story' | 'information';

export const site = {
  name: 'KITO COFFEE',
  reading: 'キト コーヒー',
  subtitle: '会津若松市のコーヒー店',
  title: 'KITO COFFEE | 会津若松のコーヒー店',
  description:
    '会津若松市のコーヒー店、KITO COFFEE。ハンドドリップのコーヒーと手づくりのお菓子を出しています。',
  disclaimer:
    'このWebサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在する店舗・商品・サービスではありません。',
  /** 免責文の改行位置制御用(定数のみ。set:html で使用) */
  disclaimerHtml:
    'このWebサイトはWeb制作ポートフォリオ用の<span class="nw">架空店舗デモです。</span>実在する店舗・商品・<span class="nw">サービスではありません。</span>',
  nav: [
    { key: 'menu', path: 'menu/', label: 'メニュー' },
    { key: 'story', path: 'story/', label: 'お店について' },
    { key: 'information', path: 'information/', label: '店舗情報' },
  ],
  info: [
    { term: '所在地', desc: '福島県会津若松市' },
    { term: '営業時間', desc: '9:00–17:00（ラストオーダー 16:30）' },
    { term: '休業日', desc: '火曜・第2水曜' },
    { term: '座席', desc: '18席（カウンター6・テーブル12）／席の予約なし' },
    { term: '駐車場', desc: '4台' },
    { term: '持ち帰り', desc: 'ドリンク・焼き菓子可' },
    { term: '支払い', desc: '現金／クレジットカード／主要QR決済' },
  ],
} as const;
