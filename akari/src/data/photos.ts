export type Tone = 'ember' | 'deep' | 'umber' | 'ash';

export interface PhotoDef {
  /** public/images/akari/ 内のファイル名 */
  file: string;
  alt: string;
  /** 撮影イメージ(プレースホルダーの可視キャプション) */
  shot: string;
  /** プレースホルダーの英字ラベル */
  label: string;
  tone: Tone;
  /** 元画像の想定ピクセルサイズ(CLS防止用の intrinsic size) */
  width: number;
  height: number;
}

export const photos = {
  hero: {
    file: 'hero-charcoal.png',
    alt: '備長炭の火で串を焼く炭火焼き台の様子',
    shot: '炭火焼きの火と料理（16:9）',
    label: 'Charcoal',
    tone: 'ember',
    width: 2400,
    height: 1350,
  },
  yakitori: {
    file: 'yakitori.png',
    alt: '炭火で焼いた焼き鳥の盛り合わせ',
    shot: '焼き鳥盛り合わせ（4:5）',
    label: 'Yakitori',
    tone: 'umber',
    width: 1600,
    height: 2000,
  },
  basashi: {
    file: 'basashi.png',
    alt: '器に盛られた馬刺し',
    shot: '馬刺し（4:5）',
    label: 'Basashi',
    tone: 'deep',
    width: 1600,
    height: 2000,
  },
  donabe: {
    file: 'donabe.png',
    alt: '蓋を開けた炊きたての土鍋ごはん',
    shot: '土鍋ごはん（4:5）',
    label: 'Donabe',
    tone: 'ash',
    width: 1600,
    height: 2000,
  },
  sake: {
    file: 'sake.png',
    alt: '陶器の酒器と日本酒',
    shot: '陶器の酒器と日本酒（3:2）',
    label: 'Sake',
    tone: 'deep',
    width: 2100,
    height: 1400,
  },
  counter: {
    file: 'counter.png',
    alt: '暗めの照明が落ち着いた和モダンのカウンター席',
    shot: '暗めの和モダンカウンター（16:9）',
    label: 'Counter',
    tone: 'umber',
    width: 2400,
    height: 1350,
  },
  semiPrivate: {
    file: 'semi-private.png',
    alt: '落ち着いた雰囲気の半個室',
    shot: '半個室（4:3）',
    label: 'Semi-private Room',
    tone: 'ash',
    width: 1600,
    height: 1200,
  },
  exterior: {
    file: 'exterior-night.png',
    alt: '夜の暖簾と店舗入口',
    shot: '夜の暖簾・店舗入口（3:2）',
    label: 'Entrance',
    tone: 'ember',
    width: 1800,
    height: 1200,
  },
} as const satisfies Record<string, PhotoDef>;

export type PhotoKey = keyof typeof photos;

export const imageDir = '/images/akari/';
