export interface PhotoDef {
  /** public/images/akari/ 内のファイル名(拡張子なし。webp / avif / jpg / jpeg / png を自動判定) */
  base: string;
  alt: string;
  /** 実画像のピクセルサイズ(CLS防止用の intrinsic size)。差し替え時は合わせる */
  width: number;
  height: number;
}

export const photos = {
  hero: { base: 'hero-charcoal', alt: '備長炭の火で串を焼く炭火焼き台の様子', width: 1672, height: 941 },
  yakitori: { base: 'yakitori', alt: '炭火で焼いた焼き鳥の盛り合わせ', width: 1122, height: 1402 },
  basashi: { base: 'basashi', alt: '器に盛られた馬刺し', width: 1122, height: 1402 },
  donabe: { base: 'donabe', alt: '蓋を開けた炊きたての土鍋ごはん', width: 1122, height: 1402 },
  sake: { base: 'sake', alt: '陶器の酒器と日本酒', width: 1536, height: 1024 },
  counter: { base: 'counter', alt: 'カウンター席', width: 1916, height: 821 },
  semiPrivate: { base: 'semi-private', alt: '半個室', width: 1448, height: 1086 },
  exterior: { base: 'exterior-night', alt: '夜の暖簾と店舗入口', width: 1536, height: 1024 },
} as const satisfies Record<string, PhotoDef>;

export type PhotoKey = keyof typeof photos;

export const imageDir = '/images/akari/';
export const imageExts = ['webp', 'avif', 'jpg', 'jpeg', 'png'] as const;
