export interface MenuItem {
  name: string;
  price: number;
  /** 「¥650〜」のように価格の後ろに付ける記号 */
  priceSuffix?: string;
  description?: string;
  /** トップページの抜粋に載せる */
  featured?: boolean;
}
export interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    id: 'coffee',
    title: 'コーヒー',
    items: [
      { featured: true, name: 'ハンドドリップ（本日の豆）', price: 550, description: '日替わりの豆を一杯ずつ淹れます' },
      { featured: true, name: 'KITOブレンド', price: 500, description: '中深煎り。チョコレートとナッツの風味' },
      { name: 'シングルオリジン', price: 650, priceSuffix: '〜', description: '単一産地の豆' },
      { featured: true, name: 'カフェラテ（HOT / ICE）', price: 600, description: 'エスプレッソとミルク' },
      { name: 'カプチーノ', price: 600, description: 'フォームミルクをのせたエスプレッソ' },
      { name: 'エスプレッソ', price: 400 },
      { featured: true, name: 'コールドブリュー', price: 580, description: '水出しコーヒー' },
    ],
  },
  {
    id: 'other-drinks',
    title: 'その他のドリンク',
    items: [
      { name: '自家製レモネード', price: 550 },
      { name: 'チャイラテ', price: 620 },
      { name: '抹茶ラテ', price: 600 },
      { name: 'オーガニックアップルジュース', price: 450 },
    ],
  },
  {
    id: 'sweets',
    title: 'お菓子',
    items: [
      { featured: true, name: 'バスクチーズケーキ', price: 580, description: '表面を焦がして焼いたチーズケーキ' },
      { featured: true, name: '季節のフルーツタルト', price: 650, description: '季節の果物のタルト' },
      { name: 'キャロットケーキ', price: 550, description: 'スパイス入り' },
      { featured: true, name: 'スコーン（プレーン）', price: 350, description: '手づくりのスコーン' },
      { name: '自家製プリン', price: 480, description: 'カラメルソース付き' },
    ],
  },
];

export const menuNotes = {
  tax: '価格はすべて税込です。',
  set: 'セット：ケーキ＋ドリンクの合計額から¥100引き',
} as const;

export const formatPrice = (n: number) => `¥${n.toLocaleString('ja-JP')}`;
