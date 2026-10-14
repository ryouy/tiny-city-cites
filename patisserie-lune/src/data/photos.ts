import type { PhotoKey } from './menu';

// public/images/patisserie-lune/ に「base.(webp|png|jpg|jpeg|avif)」のいずれかを置くと、
// ビルド時に自動でプレースホルダーから実写へ切り替わります。
export interface PhotoDef {
  /** 拡張子を除いたファイル名(仕様書 §7) */
  base: string;
  alt: string;
  /** <img> に指定する固有サイズ(CLS 対策。実ファイルと同じ比率にする) */
  width: number;
  height: number;
  /** README 掲載用: 推奨比率と用途 */
  usage: string;
}

export const photos: Record<PhotoKey, PhotoDef> = {
  hero: {
    base: 'lune-hero',
    alt: '窓辺の光の中に、苺のケーキとマドレーヌ、マカロンが並ぶ',
    width: 1448, height: 1086, usage: 'トップのヒーロー(横長 4:3)',
  },
  shop: {
    base: 'lune-shop',
    alt: 'アーチ窓から光が入る、ショーケースのある店内のイメージ',
    width: 1122, height: 1402, usage: 'トップ・店舗案内(4:5)',
  },
  shortcake: {
    base: 'lune-shortcake',
    alt: '苺と生クリームを重ねた季節のショートケーキ',
    width: 1122, height: 1402, usage: 'トップ・メニュー(4:5)',
  },
  tart: {
    base: 'lune-tart',
    alt: '苺やキウイ、ブルーベリーをのせたタルト・オ・フリュイ',
    width: 1122, height: 1402, usage: 'トップ・メニュー(4:5)',
  },
  chocolat: {
    base: 'lune-chocolat',
    alt: 'つやのあるチョコレートがけのショコラ・ノワール',
    width: 1122, height: 1402, usage: 'トップ・メニュー(4:5)',
  },
  wholeCake: {
    base: 'lune-whole-cake',
    alt: '苺と生クリームで飾った丸いホールケーキ',
    width: 1254, height: 1254, usage: 'トップ・メニュー・ご予約(1:1)',
  },
  gift: {
    base: 'lune-gift',
    alt: 'フィナンシェ、マドレーヌ、サブレを詰めた焼き菓子の箱',
    width: 1402, height: 1122, usage: 'トップ・メニュー(5:4)',
  },
  baker: {
    base: 'lune-baker',
    alt: 'パレットナイフでケーキにクリームを塗る手元(演出写真)',
    width: 1122, height: 1402, usage: '店舗案内(4:5)',
  },
};

export const photoExts = ['webp', 'png', 'jpg', 'jpeg', 'avif'];
