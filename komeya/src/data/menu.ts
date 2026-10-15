// お品書き。価格は税込(数値)。追加・変更はここだけ。画面は配列から自動生成されます。
export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  /** 補足タグ(例: 店頭で内容をご案内) */
  tag?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  /** カテゴリ見出し下の注記 */
  note?: string;
  items: MenuItem[];
}

export const menuNotes = {
  tax: '価格はすべて税込です。',
  set: '定食にはごはん・味噌汁・小鉢・漬物が付きます。',
  large: 'ごはんの大盛りは +¥100(定食)。',
} as const;

export const menu: MenuCategory[] = [
  {
    id: 'teishoku',
    title: '定食',
    note: 'ごはん・味噌汁・小鉢・漬物付き',
    items: [
      { name: 'こめやの唐揚げ定食', price: 980, description: '醤油と生姜の自家製だれに一晩漬け込んだ唐揚げ', tag: '看板' },
      { name: '豚の生姜焼き定食', price: 1050, description: '豚肉を甘辛い生姜だれで焼いたもの' },
      { name: '自家製ハンバーグ定食', price: 1180, description: '手ごねのハンバーグ' },
      { name: 'さばの味噌煮定食', price: 980, description: 'さばを味噌で煮たもの' },
      { name: 'ミックスフライ定食', price: 1280, description: '揚げ物の盛り合わせ' },
      { name: '日替わり定食', price: 900, description: 'その日のおかずの定食', tag: '内容は店頭でご案内' },
      { name: '会津産豚のとんかつ定食', price: 1380, description: '会津産豚のとんかつ' },
    ],
  },
  {
    id: 'don',
    title: '丼もの・ごはん',
    items: [
      { name: '会津ソースカツ丼', price: 1150, description: '自家製の甘辛ソースとキャベツ、会津産コシヒカリ', tag: '看板' },
      { name: '親子丼', price: 850, description: '卵と鶏肉の丼' },
      { name: 'カツカレー', price: 1100, description: 'カツをのせた特製カレー' },
      { name: '特製カレーライス', price: 800, description: '野菜入りのカレー' },
      { name: 'お子さま定食', price: 650, description: 'お子さま向けの定食', tag: 'お子さま向け' },
    ],
  },
  {
    id: 'ippin',
    title: '単品',
    items: [
      { name: '唐揚げ（5個）', price: 650 },
      { name: 'だし巻き玉子', price: 480 },
      { name: 'ポテトサラダ', price: 350 },
    ],
  },
];

export const takeout: MenuItem[] = [
  { name: 'こめやの唐揚げ弁当', price: 880 },
  { name: '生姜焼き弁当', price: 950 },
];

export interface Signature {
  menuName: string;
  photo: PhotoKey;
  copy: string;
}

export type PhotoKey = 'hero' | 'katsudon' | 'rice' | 'interior' | 'noren' | 'gingerPork';

export const signatures: Signature[] = [
  {
    menuName: 'こめやの唐揚げ定食',
    photo: 'hero',
    copy: '醤油と生姜の自家製だれに一晩漬け込み、注文を受けてから揚げます。',
  },
  {
    menuName: '会津ソースカツ丼',
    photo: 'katsudon',
    copy: '厚切りの豚カツに甘辛い自家製ソースをかけ、キャベツと会津産コシヒカリの上にのせています。',
  },
];

export const yen = (n: number): string => `¥${n.toLocaleString('en-US')}`;

export const findItem = (name: string): MenuItem => {
  const hit = menu.flatMap((c) => c.items).find((i) => i.name === name);
  if (!hit) throw new Error(`menu item not found: ${name}`);
  return hit;
};
