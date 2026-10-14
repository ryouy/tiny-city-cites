export interface Course {
  id: string;
  name: string;
  price: number;
  items: readonly string[];
  condition: string;
}

export const courses: readonly Course[] = [
  {
    id: 'season',
    name: '灯の季節コース',
    price: 5000,
    items: ['前菜三種', '季節のお造り', '炭火焼き二皿', '温物', '土鍋ごはん', '甘味'],
    condition: '2名から／2日前までの予約を想定',
  },
  {
    id: 'omakase',
    name: '炭火おまかせコース',
    price: 6500,
    items: ['前菜', '旬菜', '炭火焼き三皿', '箸休め', '土鍋ごはん', '甘味'],
    condition: '2名から／2日前までの予約を想定',
  },
];

export const courseNote = 'コース内容は季節や仕入れで変わります。';
