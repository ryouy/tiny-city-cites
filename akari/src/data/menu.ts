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
    photos: [{ key: 'hero', pos: '78% 60%' }],
    items: [
      { id: 'yakitori5', name: '炭火焼き鳥五本盛り', price: 1200, desc: 'その日のおすすめを、炭火で香ばしく。' },
      { id: 'atsuyage', name: '炭焼き厚揚げ', price: 650, desc: '外は香ばしく、中はふっくら。薬味を添えて。' },
      { id: 'pork', name: '会津産豚の炭火焼き', price: 1480, desc: '脂の甘みを引き立てる丁寧な火入れ。' },
      { id: 'mushroom', name: '季節野菜の炭焼き盛り', price: 880, desc: '旬の野菜を香ばしく焼き上げます。' },
    ],
  },
  {
    id: 'seasonal',
    label: '季節の一品',
    photos: [
      { key: 'basashi', pos: '50% 50%' },
      { key: 'donabe', pos: '50% 60%' },
    ],
    items: [
      { id: 'basashi', name: '会津馬刺し', price: 1680, desc: '赤身の旨みを味わう一皿。' },
      { id: 'dashi', name: 'だし巻き玉子', price: 780, desc: '出汁を含ませ、ふっくら焼き上げました。' },
      { id: 'salad', name: '季節の小鉢三種', price: 780, desc: '旬を映す、少しずつの味わい。' },
      { id: 'donabe', name: '季節の土鍋ごはん', price: 1480, desc: '炊きたてを分け合う、締めの一品。' },
    ],
  },
  {
    id: 'drink',
    label: 'お飲み物',
    photos: [{ key: 'sake', pos: '42% 60%' }],
    items: [
      { id: 'sake3', name: '会津地酒 飲み比べ三種', price: 1500, desc: '風味の異なる三杯を少しずつ。' },
      { id: 'sakeglass', name: '日本酒 グラス', price: 700, from: true, desc: '銘柄・仕入れ状況により変わります（架空の目安）。' },
      { id: 'beer', name: '生ビール', price: 650, desc: 'お食事の最初の一杯に。' },
      { id: 'soft', name: '自家製ジンジャーエール', price: 550, desc: '生姜の風味を感じる一杯。' },
    ],
  },
];

export const yen = (n: number) => `¥${n.toLocaleString('en-US')}`;
