// メニュー(税込)。仕様書 §3。価格は数値で持ち、画面側で ¥ と「税込」を付ける。
// photo を指定した商品のみ写真枠を表示(キーは photos.ts)。未指定は文字だけの枠。
import type { PhotoKey } from './photos';

export const categories = ['すべて', '食事パン', '菓子パン', '惣菜パン', '季節限定', '焼き菓子'] as const;
export type Category = Exclude<(typeof categories)[number], 'すべて'>;

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  tags: string[];
  photo?: PhotoKey;
}

export const products: Product[] = [
  { id: 'campagne', name: '天然酵母のカンパーニュ', price: 580, category: '食事パン', description: '天然酵母で焼いた丸い食事パン。', tags: ['人気'], photo: 'campagne' },
  { id: 'croissant', name: '発酵バタークロワッサン', price: 320, category: '食事パン', description: 'バターを折り込んだクロワッサン。', tags: ['人気'], photo: 'croissant' },
  { id: 'walnut', name: 'くるみとレーズンのパン', price: 420, category: '食事パン', description: 'くるみとレーズンを入れた食事パン。', tags: [] },
  { id: 'anbutter', name: '自家製あんバター', price: 350, category: '菓子パン', description: '小豆あんとバターを挟んだパン。', tags: ['人気'], photo: 'anbutter' },
  { id: 'fig', name: '季節のフルーツデニッシュ', price: 380, category: '季節限定', description: '季節の果物をのせたデニッシュ。', tags: ['季節限定'], photo: 'danish' },
  { id: 'focaccia', name: 'ローズマリーフォカッチャ', price: 300, category: '惣菜パン', description: 'ローズマリーとオリーブオイルのフォカッチャ。', tags: [] },
  { id: 'curry', name: '焼きカレーパン', price: 360, category: '惣菜パン', description: '自家製カレーを包んで焼いたパン。', tags: [] },
  { id: 'scone', name: '全粒粉スコーン', price: 280, category: '焼き菓子', description: '全粒粉のスコーン。', tags: [] },
];

export const menuNote =
  'アレルゲン情報は掲載していません。';
