export interface MenuItem {
  name: string;
  price: number;
  /** 「¥650〜」のように価格の後ろに付ける記号 */
  priceSuffix?: string;
  description?: string;
}
export interface MenuCategory {
  id: string;
  title: string;
  ja: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    id: 'coffee',
    title: 'COFFEE',
    ja: 'コーヒー',
    items: [
      { name: 'ハンドドリップ（本日の豆）', price: 550, description: '日替わりの豆の魅力を、一杯ずつ丁寧に' },
      { name: 'KITOブレンド', price: 500, description: 'チョコレートのようなコク、ナッツの香ばしさ。中深煎り' },
      { name: 'シングルオリジン', price: 650, priceSuffix: '〜', description: '産地ごとに異なる香りと味わい' },
      { name: 'カフェラテ（HOT / ICE）', price: 600, description: 'エスプレッソとミルクのやさしい調和' },
      { name: 'カプチーノ', price: 600, description: 'きめ細かなフォームミルク' },
      { name: 'エスプレッソ', price: 400, description: '豆の旨みを凝縮した一杯' },
      { name: 'コールドブリュー', price: 580, description: 'ゆっくり抽出した、すっきりとした後味' },
    ],
  },
  {
    id: 'other-drinks',
    title: 'OTHER DRINKS',
    ja: 'コーヒー以外のドリンク',
    items: [
      { name: '自家製レモネード', price: 550 },
      { name: 'チャイラテ', price: 620 },
      { name: '抹茶ラテ', price: 600 },
      { name: 'オーガニックアップルジュース', price: 450 },
    ],
  },
  {
    id: 'sweets',
    title: 'HOMEMADE SWEETS',
    ja: '手づくりのお菓子',
    items: [
      { name: 'バスクチーズケーキ', price: 580, description: '香ばしい表面となめらかな中心' },
      { name: '季節のフルーツタルト', price: 650, description: '季節の果実を使ったタルト' },
      { name: 'キャロットケーキ', price: 550, description: 'スパイスがほのかに香る' },
      { name: 'スコーン（プレーン）', price: 350, description: 'さっくりした手づくりスコーン' },
      { name: '自家製プリン', price: 480, description: 'ほろ苦いカラメルとなめらかな食感' },
    ],
  },
];

export const menuNotes = {
  tax: '価格はすべて税込です。',
  set: 'セット：ケーキ＋ドリンクの合計額から¥100引き',
  fiction: '季節の商品を含め、メニューはすべて創作設定です。',
} as const;

export const formatPrice = (n: number) => `¥${n.toLocaleString('ja-JP')}`;
