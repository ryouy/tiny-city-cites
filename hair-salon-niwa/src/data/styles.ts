// スタイルギャラリー(仕様書 §6。サンプルデータ)。関連メニューは本実装での対応付け(services.ts の id)。
import type { PhotoKey } from './photos';

export type StyleCategory = 'Short' | 'Bob' | 'Medium' | 'Long' | "Men's";

export interface HairStyle {
  id: string;
  name: string;
  category: StyleCategory;
  comment: string;
  photo: PhotoKey;
  related: string[];
}

export const styleFilters: ('All' | StyleCategory)[] = ['All', 'Short', 'Bob', 'Medium', 'Long', "Men's"];

export const hairStyles: HairStyle[] = [
  { id: 'style01', name: 'やわらか丸みボブ', category: 'Bob', comment: '首元がすっきり見えるナチュラルなボブ', photo: 'style01', related: ['cut01', 'care01'] },
  { id: 'style02', name: '透け感ミディアム', category: 'Medium', comment: '顔周りに軽さを出したレイヤー', photo: 'style02', related: ['cut01', 'color02'] },
  { id: 'style03', name: '大人のコンパクトショート', category: 'Short', comment: '乾かすだけで形がまとまりやすいショート', photo: 'style03', related: ['cut01', 'set02'] },
  { id: 'style04', name: '艶感ロングレイヤー', category: 'Long', comment: '重さを残しながら動きをつける', photo: 'style04', related: ['cut01', 'care01'] },
  { id: 'style05', name: 'センターパートショート', category: "Men's", comment: '清潔感のあるナチュラルスタイル', photo: 'style05', related: ['cut01', 'care02'] },
  { id: 'style06', name: 'ニュアンスパーマ', category: "Men's", comment: '柔らかい動きと立体感をプラス', photo: 'style06', related: ['cut01', 'perm01'] },
];

export const featuredStyleIds = ['style01', 'style02', 'style03', 'style04'];

export const stylesNote = 'スタイルはサンプルデータです。仕上がりや効果をお約束するものではありません。髪質・状態により再現性は異なります。';
