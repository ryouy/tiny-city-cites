// メニューデータ(仕様書 §3。すべて税込)。価格・説明の変更はこのファイルだけで完結します。
export type Category = 'burgers' | 'sides' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  /** 税込価格(円) */
  price: number;
  desc?: string;
  badge?: string;
  /** バーガーのみ: セット対象か(キッズプレートは対象外) */
  setEligible?: boolean;
}

export const categories: { id: Category; label: string; ja: string }[] = [
  { id: 'burgers', label: 'バーガー', ja: 'バーガー' },
  { id: 'sides', label: 'サイド', ja: 'サイド' },
  { id: 'drinks', label: 'ドリンク', ja: 'ドリンク' },
];

export const burgers: MenuItem[] = [
  { id: 'classic', name: 'クラシック・スマッシュ', price: 980, desc: 'パティ、チェダー、レタス、トマト、オリジナルソース', badge: '定番', setEligible: true },
  { id: 'double', name: 'ダブルチーズ・スタック', price: 1380, desc: 'パティ2枚、チーズ2枚', badge: '人気No.1', setEligible: true },
  { id: 'bacon', name: 'スモーキーベーコン', price: 1280, desc: 'ベーコン、BBQソース', setEligible: true },
  { id: 'spicy', name: 'ホットチリ・スタック', price: 1250, desc: '辛いソース、ハラペーニョ', badge: '辛口', setEligible: true },
  { id: 'avo', name: 'アボカド・チーズ', price: 1300, desc: 'アボカド入り', setEligible: true },
  { id: 'kids', name: 'キッズバーガープレート', price: 780, desc: '小さめのバーガー、ポテト、ジュース', badge: 'お子さま', setEligible: false },
];

export const sides: MenuItem[] = [
  { id: 'fries', name: 'フライドポテト', price: 350, desc: '細切り、塩味' },
  { id: 'cheese-fries', name: 'チーズポテト', price: 520, desc: 'チーズソースがけ' },
  { id: 'onion', name: 'オニオンリング', price: 480, desc: '衣をつけて揚げたもの' },
  { id: 'slaw', name: 'コールスロー', price: 300, desc: 'キャベツのサラダ' },
];

export const drinks: MenuItem[] = [
  { id: 'lemonade', name: '自家製レモネード', price: 450 },
  { id: 'ginger', name: 'クラフトジンジャーエール', price: 480 },
  { id: 'cola', name: 'コーラ', price: 320 },
  { id: 'coffee', name: 'アイスコーヒー', price: 380 },
  { id: 'orange', name: 'オレンジジュース', price: 320 },
];

export const itemsByCategory: Record<Category, MenuItem[]> = { burgers, sides, drinks };

export const menuNotes = {
  tax: 'すべて税込価格です。',
};

// セット・追加(仕様書 §3 SETS & ADD-ONS)
export const setOption = {
  price: 480,
  label: 'ポテト＋ドリンクのセット',
  drinks: ['コーラ', 'オレンジジュース', 'アイスコーヒー'],
  excluded: 'キッズバーガープレートはセット対象外です。',
};
export const largeFries = { id: 'large', label: 'ポテト大盛り', price: 150 };
export const toppings = [
  { id: 'cheese', label: 'チーズ追加', price: 150 },
  { id: 'patty', label: 'パティ追加', price: 350 },
  { id: 'bacon', label: 'ベーコン追加', price: 200 },
  { id: 'jalapeno', label: 'ハラペーニョ追加', price: 100 },
];

export const yen = (n: number) => `¥${n.toLocaleString('en-US')}`;
