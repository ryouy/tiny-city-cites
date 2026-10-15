// メニュー・価格(仕様書 §3、すべて税込)。名前・価格・説明は仕様書の原文どおり。
export interface Item { name: string; price: string; desc?: string }

export const lunch: Item[] = [
  { name: '本日のパスタランチ', price: '¥1,180', desc: '日替わりパスタ＋ミニサラダ＋ドリンク' },
  { name: '選べるパスタランチ', price: '¥1,380', desc: '定番パスタから選択＋ミニサラダ＋ドリンク' },
  { name: 'マルゲリータランチ', price: '¥1,480', desc: '小さめマルゲリータ＋ミニサラダ＋ドリンク' },
  { name: '週末まんぷくランチ', price: '¥1,780', desc: 'パスタまたはピッツァ＋前菜3種＋ドリンク＋ミニドルチェ。土日祝限定' },
  { name: 'お子さまプレート', price: '¥680', desc: 'ミニミートソース、サラダ、ジュース' },
];
export const lunchDrinks = 'コーヒー（HOT/ICE）、紅茶（HOT/ICE）、オレンジジュース';
export const lunchExample = '本日のパスタの例：きのことベーコンのクリームソース';

export const pasta: Item[] = [
  { name: '揚げなすとモッツァレラのトマトソース', price: '¥1,180', desc: 'ほどよい酸味とチーズのコク' },
  { name: 'きのことベーコンのクリームソース', price: '¥1,280', desc: '香ばしいきのこ、まろやかなソース' },
  { name: '海老とほうれん草のトマトクリーム', price: '¥1,380', desc: '海老の旨みが広がる人気の組み合わせ' },
  { name: '昔ながらのミートソース', price: '¥1,080', desc: 'じっくり煮込んだひき肉のソース' },
  { name: 'ペペロンチーノ', price: '¥980', desc: 'にんにくとオイルのシンプルな一皿' },
];
export const pastaNote = 'パスタ大盛り ＋¥200（お子さまプレートを除く）';

export const pizza: Item[] = [
  { name: 'マルゲリータ', price: '¥1,280', desc: 'トマト、モッツァレラ、バジル' },
  { name: 'クアトロフォルマッジ', price: '¥1,580', desc: '4種のチーズ、はちみつ別添え' },
  { name: 'ベーコンと季節野菜', price: '¥1,480', desc: '季節の野菜を色鮮やかに' },
  { name: '照り焼きチキン', price: '¥1,380', desc: '甘辛ソースと香ばしいチキン' },
];
export const pizzaNote = '直径約25cm。オーブンで焼いています。';

export const antipasti: Item[] = [
  { name: '前菜3種盛り合わせ', price: '¥780' },
  { name: '彩り野菜のグリーンサラダ', price: '¥680' },
  { name: 'フライドポテト ローズマリー風味', price: '¥480' },
  { name: '自家製ライスコロッケ（2個）', price: '¥620' },
  { name: 'ガーリックトースト', price: '¥380' },
];

export const dolce: Item[] = [
  { name: '自家製ティラミス', price: '¥520' },
  { name: '本日のジェラート', price: '¥420' },
  { name: 'パンナコッタ', price: '¥480' },
];
export const drink: Item[] = [
  { name: 'ブレンドコーヒー', price: '¥380' },
  { name: 'カフェラテ', price: '¥450' },
  { name: '自家製レモネード', price: '¥480' },
  { name: 'グラスワイン（赤・白）', price: '¥600' },
  { name: 'ノンアルコールスパークリング', price: '¥480' },
];

export const sharing = {
  name: 'まちの灯 おふたりセット',
  price: '¥4,200',
  unit: '税込・2名分',
  content: '前菜盛り合わせ＋選べるパスタ1皿＋選べるピッツァ1枚＋ソフトドリンク2杯',
  softDrinks: ['ブレンドコーヒー', 'カフェラテ', '自家製レモネード', 'ノンアルコールスパークリング'],
} as const;
