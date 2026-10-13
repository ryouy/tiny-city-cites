import type { PhotoKey } from './menu';

// public/images/patisserie-lune/ に「base.(webp|png|jpg|jpeg|avif)」のいずれかを置くと、
// ビルド時に自動でプレースホルダーから実写へ切り替わります。
export interface PhotoDef {
  /** 拡張子を除いたファイル名(仕様書 §7) */
  base: string;
  alt: string;
  /** プレースホルダーに表示する撮影イメージ(仕様書 §6 の写真トーンに沿う) */
  shoot: string;
  /** 実写のとき <img> に指定する固有サイズ(推奨書き出しサイズ) */
  width: number;
  height: number;
  /** プレースホルダーの色面 */
  tone: 'blush' | 'cream' | 'cocoa' | 'butter' | 'mist' | 'rose';
  /** README 掲載用: 推奨比率と用途 */
  usage: string;
}

export const photos: Record<PhotoKey, PhotoDef> = {
  hero: {
    base: 'lune-hero',
    alt: '柔らかな窓光の中に並ぶ、ケーキと焼き菓子のスタイリング',
    shoot: '柔らかな窓光。淡い背景に、ケーキと焼き菓子を静かに並べた横長のスタイリング。',
    width: 1800, height: 1350, tone: 'blush', usage: 'ヒーロー(横長 4:3 推奨。モバイルは中央を切り出し)',
  },
  shop: {
    base: 'lune-shop',
    alt: '淡い光が差し込む、パティスリーの内観のイメージ',
    shoot: '架空店舗の内観、または抽象的なイメージ。淡い壁とショーケースの気配。',
    width: 1200, height: 1500, tone: 'cream', usage: 'ブランドストーリー(4:5)/ ホールケーキ導線',
  },
  shortcake: {
    base: 'lune-shortcake',
    alt: '旬の果実と生クリームを重ねた季節のショートケーキ',
    shoot: '季節のショートケーキ。断面が見える寄りの構図、窓光、淡い背景。',
    width: 1200, height: 1500, tone: 'blush', usage: '代表ケーキ No.01(4:5)/ メニュー',
  },
  tart: {
    base: 'lune-tart',
    alt: '季節の果物をのせたタルト・オ・フリュイ',
    shoot: 'タルト・オ・フリュイ。果物のつやと生地の質感を俯瞰で。',
    width: 1200, height: 1500, tone: 'butter', usage: '代表ケーキ No.02(4:5)/ メニュー',
  },
  chocolat: {
    base: 'lune-chocolat',
    alt: 'なめらかな断面のショコラ・ノワール',
    shoot: 'ショコラ・ノワール。カカオの艶と口溶けを伝える寄りの写真。',
    width: 1200, height: 1500, tone: 'cocoa', usage: '代表ケーキ No.03(4:5)/ メニュー',
  },
  wholeCake: {
    base: 'lune-whole-cake',
    alt: '苺をのせたホールケーキ',
    shoot: 'ホールケーキを俯瞰または斜めから。淡い背景に、飾りつけの質感がわかる構図。',
    width: 1500, height: 1500, tone: 'rose', usage: 'ホールケーキ導線(1:1 / 4:5)/ メニュー・予約ページ',
  },
  gift: {
    base: 'lune-gift',
    alt: '焼き菓子の詰め合わせギフト',
    shoot: 'フィナンシェやサブレの詰め合わせ。包みと焼き色の質感を寄りで。',
    width: 1500, height: 1200, tone: 'butter', usage: '焼き菓子・ギフト(5:4)/ メニュー',
  },
  baker: {
    base: 'lune-baker',
    alt: '生地を仕上げる手元。パティシエの手仕事のイメージ(演出)',
    shoot: '生地やクリームを仕上げる手元。顔は写さない、架空の演出。',
    width: 1200, height: 1500, tone: 'mist', usage: 'About ページ(4:5)',
  },
};

export const photoExts = ['webp', 'png', 'jpg', 'jpeg', 'avif'];
