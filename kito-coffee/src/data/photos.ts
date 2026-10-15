export type Tone = 'dark' | 'deep' | 'mid' | 'light' | 'warm';

export interface PhotoDef {
  /** public/images/kito/ 内のファイル名 */
  file: string;
  alt: string;
  tone: Tone;
  /** 元画像の想定ピクセルサイズ(CLS防止用の intrinsic size) */
  width: number;
  height: number;
}

export const photos = {
  hero: {
    file: 'hero.webp',
    alt: '木のカウンターのある店内',
    tone: 'dark',
    width: 1672,
    height: 941,
  },
  pourOver: {
    file: 'pour-over.webp',
    alt: 'ドリッパーにお湯を注ぐ手元',
    tone: 'deep',
    width: 1536,
    height: 1024,
  },
  blend: {
    file: 'blend.webp',
    alt: '陶器のカップに注がれたコーヒー',
    tone: 'mid',
    width: 1254,
    height: 1254,
  },
  cheesecake: {
    file: 'cheesecake.webp',
    alt: 'バスクチーズケーキ',
    tone: 'warm',
    width: 1448,
    height: 1086,
  },
  interior: {
    file: 'interior.webp',
    alt: '木の内装の店内',
    tone: 'light',
    width: 1122,
    height: 1402,
  },
  sweets: {
    file: 'sweets.webp',
    alt: '焼き菓子とカフェラテ',
    tone: 'mid',
    width: 1448,
    height: 1086,
  },
} as const satisfies Record<string, PhotoDef>;

export const imageDir = '/images/kito/';
