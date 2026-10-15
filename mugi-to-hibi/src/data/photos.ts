export type Tone = 'wheat' | 'cream' | 'sage' | 'crust';

export interface PhotoDef {
  /** public/images/mugi-to-hibi/ 内のファイル名(拡張子なし。webp/png/jpg/jpeg/avif を自動判定) */
  stem: string;
  /** object-position(被写体の位置に合わせたトリミング基準) */
  pos: string;
  alt: string;
  /** 撮影イメージ(画面には出さず、画像準備中の代替テキストにだけ使う) */
  shot: string;
  tone: Tone;
  /** 元画像の想定ピクセルサイズ(CLS防止用 intrinsic size) */
  width: number;
  height: number;
}

export const imageDir = '/images/mugi-to-hibi/';

export const photos = {
  hero: {
    stem: 'hero-bakery',
    pos: '42% 60%',
    alt: '木の棚にパンが並ぶ店内',
    shot: '店内のパン棚。朝の斜光、木の棚、並んだパン（横長 16:9）',
    tone: 'wheat',
    width: 1672,
    height: 941,
  },
  campagne: {
    stem: 'bread-campagne',
    pos: '50% 60%',
    alt: '天然酵母のカンパーニュ',
    shot: 'カンパーニュ。粉の質感とクープ（4:5）',
    tone: 'crust',
    width: 1122,
    height: 1402,
  },
  croissant: {
    stem: 'bread-croissant',
    pos: '50% 55%',
    alt: '発酵バタークロワッサン',
    shot: 'クロワッサン。層の断面が分かる寄り（4:5）',
    tone: 'cream',
    width: 1122,
    height: 1402,
  },
  anbutter: {
    stem: 'bread-anbutter',
    pos: '50% 55%',
    alt: '自家製あんバター',
    shot: 'あんバター。断面のあんとバター（4:5）',
    tone: 'wheat',
    width: 1122,
    height: 1402,
  },
  danish: {
    stem: 'bread-danish',
    pos: '50% 60%',
    alt: '季節のフルーツデニッシュ',
    shot: '季節のデニッシュ。果物の彩り（4:5）',
    tone: 'sage',
    width: 1122,
    height: 1402,
  },
  process: {
    stem: 'bakery-process',
    pos: '45% 55%',
    alt: '生地を成形する手元',
    shot: 'パン作りの手元。生地と粉と木の台（3:2）',
    tone: 'cream',
    width: 1536,
    height: 1024,
  },
  exterior: {
    stem: 'shop-exterior',
    pos: '50% 45%',
    alt: 'ベーカリーの外観',
    shot: '郊外の小規模ベーカリー外観。3:2',
    tone: 'sage',
    width: 1536,
    height: 1024,
  },
} satisfies Record<string, PhotoDef>;

export type PhotoKey = keyof typeof photos;
