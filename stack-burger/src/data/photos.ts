// public/images/stack-burger/ に「base.(webp|png|jpg|jpeg|avif)」のいずれかを置くと、
// ビルド時に自動でプレースホルダーから画像へ切り替わります(仕様書 §7 のファイル名)。
export const photoExts = ['webp', 'png', 'jpg', 'jpeg', 'avif'] as const;

export type PhotoKey = 'hero' | 'signature' | 'classic' | 'bacon' | 'fries' | 'griddle' | 'interior';

export interface PhotoDef {
  /** 拡張子を除いたファイル名 */
  base: string;
  alt: string;
  /** 書き出しサイズ(CLS対策の width/height 属性) */
  width: number;
  height: number;
  /** 画像が無いときの単色面 */
  tone: 'red' | 'ink' | 'green' | 'cream';
  usage: string;
}

export const photos: Record<PhotoKey, PhotoDef> = {
  hero: { base: 'hero-burger', alt: '肉の焼き目と溶けたチーズが見える、ダブルチーズ・スタック', width: 1200, height: 1500, tone: 'red', usage: 'Hero(全幅。縦構図4:5でも横長に切り出して表示)' },
  signature: { base: 'hero-burger', alt: '重ねたパティとチーズのクローズアップ', width: 1200, height: 1500, tone: 'ink', usage: 'Signature(hero-burger を全幅で再利用)' },
  classic: { base: 'classic', alt: 'クラシック・スマッシュ', width: 1200, height: 1500, tone: 'ink', usage: 'メニュー下の写真列(4:5)。3枚そろうと表示' },
  bacon: { base: 'bacon', alt: 'スモーキーベーコン', width: 1200, height: 1500, tone: 'ink', usage: 'メニュー下の写真列(4:5)' },
  fries: { base: 'fries', alt: 'フライドポテト', width: 1200, height: 1500, tone: 'ink', usage: 'メニュー下の写真列(4:5)' },
  griddle: { base: 'griddle', alt: '熱い鉄板でパティを焼く手元', width: 1800, height: 1200, tone: 'green', usage: 'OUR STYLE(全幅・3:2)' },
  interior: { base: 'interior', alt: '明るく賑やかな小さなダイナーの店内', width: 1920, height: 1080, tone: 'cream', usage: 'お店について(16:9)' },
};
