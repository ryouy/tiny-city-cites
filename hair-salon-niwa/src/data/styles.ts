// スタイルギャラリー(仕様書 §6)。関連メニューは本実装での対応付け(services.ts の id)。
import type { PhotoKey } from './photos';

export type StyleCategory = 'Short' | 'Bob' | 'Medium' | 'Long' | "Men's";

export interface HairStyle {
  id: string;
  name: string;
  category: StyleCategory;
  photo: PhotoKey;
  related: string[];
}

export const styleFilters: ('All' | StyleCategory)[] = ['All', 'Short', 'Bob', 'Medium', 'Long', "Men's"];

/** 画面に出す表記 */
export const categoryLabel: Record<'All' | StyleCategory, string> = {
  All: 'すべて', Short: 'ショート', Bob: 'ボブ', Medium: 'ミディアム', Long: 'ロング', "Men's": 'メンズ',
};

export const hairStyles: HairStyle[] = [
  { id: 'style01', name: 'やわらか丸みボブ', category: 'Bob', photo: 'style01', related: ['cut01', 'care01'] },
  { id: 'style02', name: '透け感ミディアム', category: 'Medium', photo: 'style02', related: ['cut01', 'color02'] },
  { id: 'style03', name: '大人のコンパクトショート', category: 'Short', photo: 'style03', related: ['cut01', 'set02'] },
  { id: 'style04', name: '艶感ロングレイヤー', category: 'Long', photo: 'style04', related: ['cut01', 'care01'] },
  { id: 'style05', name: 'センターパートショート', category: "Men's", photo: 'style05', related: ['cut01', 'care02'] },
  { id: 'style06', name: 'ニュアンスパーマ', category: "Men's", photo: 'style06', related: ['cut01', 'perm01'] },
];

export const featuredStyleIds = ['style01', 'style02', 'style03', 'style04'];

export const stylesNote = '仕上がりは髪質・状態により異なります。';
