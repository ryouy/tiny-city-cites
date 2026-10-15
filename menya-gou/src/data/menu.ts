// メニュー(税込)。価格・品名は仕様書 §3 のとおり。説明は平易な文に書き換え、ラベルは載せない。IDは仕様書準拠。
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}
export interface MenuCategory {
  id: 'ramen' | 'side' | 'topping';
  tab: string;
  title: string;
  items: MenuItem[];
}

export const yen = (n: number) => `${n.toLocaleString('en-US')}円`;

export const menu: MenuCategory[] = [
  {
    id: 'ramen',
    tab: 'ラーメン',
    title: 'ラーメン',
    items: [
      { id: 'ramen-01', name: '豪ラーメン', price: 950, description: '豚骨醤油スープ、チャーシュー、ほうれん草、海苔。' },
      { id: 'ramen-02', name: '味玉ラーメン', price: 1080, description: '豪ラーメンに半熟の味玉をのせたもの。' },
      { id: 'ramen-03', name: 'チャーシューメン', price: 1250, description: 'チャーシューを増やしたラーメン。' },
      { id: 'ramen-04', name: '特製 豪ラーメン', price: 1380, description: '味玉、チャーシュー増量、海苔増しのラーメン。' },
      { id: 'ramen-05', name: '旨辛家系ラーメン', price: 1050, description: '豚骨醤油スープに辛味を加えたラーメン。' },
      { id: 'ramen-06', name: 'お子さまラーメン', price: 650, description: '小さめサイズ。辛味なし。' },
    ],
  },
  {
    id: 'side',
    tab: 'ごはん・サイド',
    title: 'ごはん・サイド',
    items: [
      { id: 'side-01', name: 'ライス 小', price: 120 },
      { id: 'side-02', name: 'ライス 中', price: 180 },
      { id: 'side-03', name: 'ライス 大', price: 250 },
      { id: 'side-04', name: 'ネギチャーシュー丼', price: 380, description: 'ネギとチャーシューの小丼。' },
      { id: 'side-05', name: '餃子 5個', price: 450, description: '焼き餃子5個。' },
    ],
  },
  {
    id: 'topping',
    tab: 'トッピング',
    title: 'トッピング',
    items: [
      { id: 'top-01', name: '味付玉子', price: 130 },
      { id: 'top-02', name: '海苔増し', price: 120 },
      { id: 'top-03', name: 'ほうれん草増し', price: 150 },
      { id: 'top-04', name: 'チャーシュー増し', price: 300 },
      { id: 'top-05', name: '白髪ねぎ', price: 150 },
      { id: 'top-06', name: '麺大盛り', price: 150 },
    ],
  },
];

export type PhotoKey = 'hero' | 'soup' | 'noodle' | 'rice' | 'interior';
