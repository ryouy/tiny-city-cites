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
  hero: { base: 'hero-burger', alt: 'ダブルチーズ・スタック', width: 1122, height: 1402, tone: 'red', usage: 'Hero(縦構図4:5。デスクトップは右半分に大きく、スマホは上に配置)' },
  signature: { base: 'double', alt: 'ダブルチーズ・スタックとポテト', width: 1122, height: 1402, tone: 'red', usage: 'Signature(縦構図4:5を左に大きく)' },
  classic: { base: 'classic', alt: 'クラシック・スマッシュ', width: 1122, height: 1402, tone: 'ink', usage: 'メニュー下の写真列(4:5)。3枚そろうと表示' },
  bacon: { base: 'bacon', alt: 'スモーキーベーコン', width: 1122, height: 1402, tone: 'ink', usage: 'メニュー下の写真列(4:5)' },
  fries: { base: 'fries', alt: 'フライドポテト', width: 1122, height: 1402, tone: 'ink', usage: 'メニュー下の写真列(4:5)' },
  griddle: { base: 'griddle', alt: '熱い鉄板でパティを焼く手元', width: 1536, height: 1024, tone: 'ink', usage: 'OUR STYLE(全幅の横長に切り出し。手元と鉄板の道具が主役)' },
  interior: { base: 'interior', alt: '店内の様子', width: 1672, height: 941, tone: 'cream', usage: 'お店について(16:9)' },
};
