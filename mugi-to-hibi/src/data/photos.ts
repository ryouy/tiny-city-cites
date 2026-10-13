export type Tone = 'wheat' | 'cream' | 'sage' | 'crust';

export interface PhotoDef {
  /** public/images/mugi-to-hibi/ 内のファイル名 */
  file: string;
  alt: string;
  /** 撮影イメージ(プレースホルダーの可視キャプション) */
  shot: string;
  /** プレースホルダーの英字ラベル */
  label: string;
  tone: Tone;
  /** 元画像の想定ピクセルサイズ(CLS防止用 intrinsic size) */
  width: number;
  height: number;
}

export const imageDir = '/images/mugi-to-hibi/';

export const photos = {
  hero: {
    file: 'hero-bakery.png',
    alt: '朝の光が差し込む、木の棚にパンが並ぶ店内',
    shot: '店内のパン棚。朝の斜光、木の棚、並んだパン（横長 16:9）',
    label: 'The Shelves',
    tone: 'wheat',
    width: 2400,
    height: 1350,
  },
  campagne: {
    file: 'bread-campagne.png',
    alt: '粉をまとった天然酵母のカンパーニュ',
    shot: 'カンパーニュ。粉の質感とクープ（4:5）',
    label: 'Campagne',
    tone: 'crust',
    width: 1600,
    height: 2000,
  },
  croissant: {
    file: 'bread-croissant.png',
    alt: '焼きたての発酵バタークロワッサン',
    shot: 'クロワッサン。層の断面が分かる寄り（4:5）',
    label: 'Croissant',
    tone: 'cream',
    width: 1600,
    height: 2000,
  },
  anbutter: {
    file: 'bread-anbutter.png',
    alt: 'あんことバターを挟んだ自家製あんバター',
    shot: 'あんバター。断面のあんとバター（4:5）',
    label: 'Anbutter',
    tone: 'wheat',
    width: 1600,
    height: 2000,
  },
  danish: {
    file: 'bread-danish.png',
    alt: '季節の果物をのせたフルーツデニッシュ',
    shot: '季節のデニッシュ。果物の彩り（4:5）',
    label: 'Seasonal Danish',
    tone: 'sage',
    width: 1600,
    height: 2000,
  },
  process: {
    file: 'bakery-process.png',
    alt: '生地を成形するパン職人の手元',
    shot: 'パン作りの手元。生地と粉と木の台（3:2）',
    label: 'The Workshop',
    tone: 'cream',
    width: 1800,
    height: 1200,
  },
  exterior: {
    file: 'shop-exterior.png',
    alt: '郊外の住宅地にある小さなベーカリーの外観（架空の店舗）',
    shot: '郊外の小規模ベーカリー外観。架空のロゴ・看板のみ（3:2）',
    label: 'The Shop',
    tone: 'sage',
    width: 1800,
    height: 1200,
  },
} satisfies Record<string, PhotoDef>;

export type PhotoKey = keyof typeof photos;
