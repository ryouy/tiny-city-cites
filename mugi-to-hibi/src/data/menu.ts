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
  { id: 'campagne', name: '天然酵母のカンパーニュ', price: 580, category: '食事パン', description: '外は香ばしく、中はしっとり。小麦の風味が広がる定番の一品。', tags: ['人気'], photo: 'campagne' },
  { id: 'croissant', name: '発酵バタークロワッサン', price: 320, category: '食事パン', description: '層の軽さとバターの香りを楽しむ朝の定番。', tags: ['人気'], photo: 'croissant' },
  { id: 'walnut', name: 'くるみとレーズンのパン', price: 420, category: '食事パン', description: '香ばしいくるみと自然な甘みのレーズンをたっぷり。', tags: [] },
  { id: 'anbutter', name: '自家製あんバター', price: 350, category: '菓子パン', description: '小豆のやさしい甘さとバターの塩気。', tags: ['人気'], photo: 'anbutter' },
  { id: 'fig', name: '季節のフルーツデニッシュ', price: 380, category: '季節限定', description: '季節の果物を使った軽やかなデニッシュ。', tags: ['季節限定'], photo: 'danish' },
  { id: 'focaccia', name: 'ローズマリーフォカッチャ', price: 300, category: '惣菜パン', description: 'オリーブオイルの香りとほどよい塩気。', tags: [] },
  { id: 'curry', name: '焼きカレーパン', price: 360, category: '惣菜パン', description: 'スパイス香る自家製カレーを包み、カリッと焼き上げました。', tags: [] },
  { id: 'scone', name: '全粒粉スコーン', price: 280, category: '焼き菓子', description: 'ざくっとした食感。コーヒーにも紅茶にも。', tags: [] },
];

export const menuNote =
  'アレルゲン情報は掲載していません。';
