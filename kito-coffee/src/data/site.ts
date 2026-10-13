export const site = {
  name: 'KITO COFFEE',
  reading: 'キト コーヒー',
  subtitle: 'Specialty Coffee & Homemade Sweets',
  catchcopy: '日常に、少しだけ余白を。',
  title: 'KITO COFFEE | 架空カフェ デモサイト',
  description:
    '日常に、少しだけ余白を。スペシャルティコーヒーと手作り焼き菓子の架空カフェ「KITO COFFEE」のデモサイトです。Web制作ポートフォリオ用の架空店舗で、実在しません。',
  disclaimer:
    'このWebサイトはWeb制作ポートフォリオ用の架空店舗デモです。実在する店舗・商品・サービスではありません。',
  /** 免責文の改行位置制御用(定数のみ。set:html で使用) */
  disclaimerHtml:
    'このWebサイトはWeb制作ポートフォリオ用の<span class="nw">架空店舗デモです。</span>実在する店舗・商品・<span class="nw">サービスではありません。</span>',
  nav: [
    { href: '#about', en: 'About', ja: 'KITOについて' },
    { href: '#coffee', en: 'Coffee', ja: 'コーヒー' },
    { href: '#menu', en: 'Menu', ja: 'メニュー' },
    { href: '#information', en: 'Information', ja: '店舗情報' },
  ],
  info: [
    { term: '所在地', desc: '福島県会津若松市（架空設定）' },
    { term: '営業時間', desc: '9:00–17:00（ラストオーダー 16:30）' },
    { term: '休業日', desc: '火曜・第2水曜' },
    { term: '座席', desc: '18席（カウンター6・テーブル12）／席の予約なし' },
    { term: '駐車場', desc: '4台' },
    { term: '持ち帰り', desc: 'ドリンク・焼き菓子可' },
    { term: '支払い', desc: '現金／クレジットカード／主要QR決済' },
  ],
} as const;
