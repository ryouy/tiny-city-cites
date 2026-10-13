// メニュー(税込・架空価格)。仕様書 §3 の値をそのまま転記。IDは仕様書準拠。
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  label?: string;
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
      { id: 'ramen-01', name: '豪ラーメン', price: 950, description: '豚骨醤油スープ、チャーシュー、ほうれん草、海苔。基本の一杯。', label: '定番' },
      { id: 'ramen-02', name: '味玉ラーメン', price: 1080, description: '半熟味玉を追加した人気の一杯。', label: '人気' },
      { id: 'ramen-03', name: 'チャーシューメン', price: 1250, description: '肉の旨みを楽しむチャーシュー増量。' },
      { id: 'ramen-04', name: '特製 豪ラーメン', price: 1380, description: '味玉、増量チャーシュー、海苔増しの満足仕様。', label: 'おすすめ' },
      { id: 'ramen-05', name: '旨辛家系ラーメン', price: 1050, description: '豚骨醤油をベースに辛味を重ねた一杯。', label: '辛味' },
      { id: 'ramen-06', name: 'お子さまラーメン', price: 650, description: '小さめサイズ。辛味なし。', label: 'お子さま' },
    ],
  },
  {
    id: 'side',
    tab: 'ごはん・サイド',
    title: 'ごはん・サイド',
    items: [
      { id: 'side-01', name: 'ライス 小', price: 120, description: 'スープと一緒に楽しむごはん。' },
      { id: 'side-02', name: 'ライス 中', price: 180 },
      { id: 'side-03', name: 'ライス 大', price: 250 },
      { id: 'side-04', name: 'ネギチャーシュー丼', price: 380, description: '香味ネギとチャーシューの小丼。' },
      { id: 'side-05', name: '餃子 5個', price: 450, description: '焼きたての定番サイド。' },
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
