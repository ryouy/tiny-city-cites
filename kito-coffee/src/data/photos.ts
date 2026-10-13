export type Tone = 'dark' | 'deep' | 'mid' | 'light' | 'warm';

export interface PhotoDef {
  /** public/images/kito/ 内のファイル名 */
  file: string;
  alt: string;
  /** 撮影イメージ(プレースホルダーのキャプション) */
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
    file: 'hero.png',
    alt: '自然光が差し込む、木のカウンターのあるカフェの店内',
    shot: 'カフェ全景。自然光と木のカウンター（横長）',
    label: 'The Room',
    tone: 'dark',
    width: 2400,
    height: 1350,
  },
  pourOver: {
    file: 'pour-over.png',
    alt: 'ドリッパーにお湯を注ぐ手元',
    shot: '手注ぎドリップの寄り',
    label: 'Pour-over',
    tone: 'deep',
    width: 2000,
    height: 1333,
  },
  blend: {
    file: 'blend.png',
    alt: '陶器のカップに注がれたコーヒー',
    shot: '陶器カップのコーヒー',
    label: 'The Cup',
    tone: 'mid',
    width: 1600,
    height: 1600,
  },
  cheesecake: {
    file: 'cheesecake.png',
    alt: '香ばしく焼き上げたバスクチーズケーキ',
    shot: 'バスクチーズケーキ',
    label: 'Basque Cheesecake',
    tone: 'warm',
    width: 1800,
    height: 1350,
  },
  interior: {
    file: 'interior.png',
    alt: '木の温もりと自然光に包まれた店内の様子',
    shot: '空間の引き写真',
    label: 'Interior',
    tone: 'light',
    width: 1600,
    height: 2000,
  },
  sweets: {
    file: 'sweets.png',
    alt: '焼き菓子とカフェラテ',
    shot: '焼き菓子とカフェラテ',
    label: 'Sweets & Latte',
    tone: 'mid',
    width: 1600,
    height: 1200,
  },
} as const satisfies Record<string, PhotoDef>;

export const imageDir = '/images/kito/';
