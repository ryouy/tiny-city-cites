import type { PhotoKey } from './photos';

export interface MenuItem {
  id: string;
  name: string;
  /** 数値(円・税込) */
  price: number;
  /** true なら「700〜」のように下限表示 */
  from?: boolean;
  desc: string;
}
export interface MenuCategory {
  id: string;
  label: string;
  /** このカテゴリで添える写真(順に表示) */
  photos: readonly { key: PhotoKey; pos: string }[];
  items: readonly MenuItem[];
}

export const menu: readonly MenuCategory[] = [
  {
    id: 'sumibi',
    label: '炭火料理',
    photos: [],
    items: [
      { id: 'yakitori5', name: '炭火焼き鳥五本盛り', price: 1200, desc: 'その日のおすすめの部位を炭火で焼いた串五本。' },
      { id: 'atsuyage', name: '炭焼き厚揚げ', price: 650, desc: '炭火で焼いた厚揚げ。薬味つき。' },
      { id: 'pork', name: '会津産豚の炭火焼き', price: 1480, desc: '会津産の豚肉を炭火で焼いたもの。' },
      { id: 'mushroom', name: '季節野菜の炭焼き盛り', price: 880, desc: '季節の野菜を炭火で焼いたもの。' },
    ],
  },
  {
    id: 'seasonal',
    label: '季節の一品',
    photos: [
      { key: 'basashi', pos: '50% 52%' },
      { key: 'donabe', pos: '50% 55%' },
    ],
    items: [
      { id: 'basashi', name: '会津馬刺し', price: 1680, desc: '会津の馬刺し。' },
      { id: 'dashi', name: 'だし巻き玉子', price: 780, desc: '出汁を入れた卵焼き。' },
      { id: 'salad', name: '季節の小鉢三種', price: 780, desc: '季節の小鉢を三種。' },
      { id: 'donabe', name: '季節の土鍋ごはん', price: 1480, desc: '土鍋で炊いたごはん。' },
    ],
  },
  {
    id: 'drink',
    label: 'お飲み物',
    photos: [],
    items: [
      { id: 'sake3', name: '会津地酒 飲み比べ三種', price: 1500, desc: '会津の日本酒三種の飲み比べ。' },
      { id: 'sakeglass', name: '日本酒 グラス', price: 700, from: true, desc: '銘柄・仕入れ状況により変わります。' },
      { id: 'beer', name: '生ビール', price: 650, desc: '' },
      { id: 'soft', name: '自家製ジンジャーエール', price: 550, desc: '生姜を使った自家製のジンジャーエール。' },
    ],
  },
];

export const yen = (n: number) => `¥${n.toLocaleString('en-US')}`;
