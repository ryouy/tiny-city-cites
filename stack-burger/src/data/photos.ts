// public/images/stack-burger/ に「base.(webp|png|jpg|jpeg|avif)」のいずれかを置くと、
// ビルド時に自動でプレースホルダーから画像へ切り替わります(仕様書 §7 のファイル名)。
export const photoExts = ['webp', 'png', 'jpg', 'jpeg', 'avif'] as const;

export type PhotoKey = 'hero' | 'signature' | 'classic' | 'bacon' | 'fries' | 'griddle' | 'interior';

export interface PhotoDef {
  /** 拡張子を除いたファイル名 */
  base: string;
  alt: string;
  /** プレースホルダーに表示する撮影イメージ */
  shoot: string;
  /** 推奨書き出しサイズ */
  width: number;
  height: number;
  tone: 'red' | 'mustard' | 'ink' | 'cream' | 'green';
  usage: string;
}

export const photos: Record<PhotoKey, PhotoDef> = {
  hero: {
    base: 'hero-burger', alt: '肉の焼き目と溶けたチーズが見える、ダブルチーズ・スタックのバーガー',
    shoot: 'ダブルチーズバーガーの接写。肉の焼き目、溶けたチーズ、バンズが見える縦構図。',
    width: 1200, height: 1500, tone: 'red', usage: 'ヒーロー(4:5)。Signature でも同じファイルをクローズアップで使用',
  },
  signature: {
    base: 'hero-burger', alt: '重ねたパティとチーズのクローズアップ',
    shoot: '重なったパティ2枚とチーズ2枚の断面に寄った構図。',
    width: 1200, height: 1500, tone: 'ink', usage: 'Signature(hero-burger を拡大表示)',
  },
  classic: {
    base: 'classic', alt: 'クラシック・スマッシュ',
    shoot: 'クラシックバーガー単品。チェダー、レタス、トマトが見える。',
    width: 1200, height: 1500, tone: 'mustard', usage: 'メニュー BURGERS(4:5)',
  },
  bacon: {
    base: 'bacon', alt: 'スモーキーベーコン',
    shoot: 'ベーコンバーガー単品。ベーコンとBBQソースが見える。',
    width: 1200, height: 1500, tone: 'green', usage: 'メニュー BURGERS(4:5)',
  },
  fries: {
    base: 'fries', alt: 'フライドポテト',
    shoot: '細切りのフライドポテト。紙のバスケットに山盛り。',
    width: 1200, height: 1500, tone: 'mustard', usage: 'メニュー SIDES(4:5)',
  },
  griddle: {
    base: 'griddle', alt: '熱い鉄板でパティを焼く手元',
    shoot: '熱い鉄板にパティを押しつけて焼く手元。ヘラと立ちのぼる湯気。',
    width: 1800, height: 1200, tone: 'ink', usage: 'OUR STYLE(3:2)',
  },
  interior: {
    base: 'interior', alt: '明るく賑やかな小さなダイナーの店内',
    shoot: 'カウンター6席とテーブル席が並ぶ、明るく賑やかな小さなダイナー。',
    width: 1920, height: 1080, tone: 'cream', usage: 'ABOUT(16:9)',
  },
};
