// 商品マスター(仕様書 §4。税込価格)。UI には直書きせず、ここから描画する。
export type PhotoKey = 'hero' | 'shop' | 'shortcake' | 'tart' | 'chocolat' | 'wholeCake' | 'gift' | 'baker';

export interface CutCake {
  id: string;
  name: string;
  price: number;
  desc: string;
  allergens: string;
  photo?: PhotoKey;
}

export interface WholeCake {
  id: string;
  /** 商品グループ(configurator の商品選択) */
  group: 'ichigo' | 'choco' | 'tart';
  name: string;
  size: string;
  price: number;
  note: string;
}

export interface BakedGood {
  id: string;
  name: string;
  price: number;
  desc: string;
}

export const cutCakes: CutCake[] = [
  { id: 'cake01', name: '季節のショートケーキ', price: 680, desc: '季節の果実と生クリームのショートケーキ', allergens: '乳・卵・小麦', photo: 'shortcake' },
  { id: 'cake02', name: 'タルト・オ・フリュイ', price: 760, desc: 'タルト生地に季節の果物をのせたタルト', allergens: '乳・卵・小麦・アーモンド', photo: 'tart' },
  { id: 'cake03', name: 'ショコラ・ノワール', price: 720, desc: 'チョコレートのケーキ', allergens: '乳・卵・小麦', photo: 'chocolat' },
  { id: 'cake04', name: 'レアチーズ・シトロン', price: 650, desc: 'レモン風味のレアチーズケーキ', allergens: '乳・卵・小麦' },
  { id: 'cake05', name: '和栗のモンブラン', price: 820, desc: '和栗のクリームをのせたモンブラン。秋季限定', allergens: '乳・卵・小麦' },
  { id: 'cake06', name: 'なめらかプリン', price: 480, desc: '卵と牛乳のプリン。カラメル付き', allergens: '乳・卵' },
];

export const wholeCakes: WholeCake[] = [
  { id: 'whole01', group: 'ichigo', name: '苺のデコレーション', size: '4号（12cm）', price: 3600, note: '約2〜4名' },
  { id: 'whole02', group: 'ichigo', name: '苺のデコレーション', size: '5号（15cm）', price: 4600, note: '約4〜6名' },
  { id: 'whole03', group: 'ichigo', name: '苺のデコレーション', size: '6号（18cm）', price: 5800, note: '約6〜8名' },
  { id: 'whole04', group: 'choco', name: '生チョコデコレーション', size: '4号（12cm）', price: 3900, note: '約2〜4名' },
  { id: 'whole05', group: 'choco', name: '生チョコデコレーション', size: '5号（15cm）', price: 4900, note: '約4〜6名' },
  { id: 'whole06', group: 'tart', name: 'フルーツタルト', size: '5号（15cm）', price: 5200, note: '季節の果実' },
];

export const wholeGroups: { key: WholeCake['group']; name: string }[] = [
  { key: 'ichigo', name: '苺のデコレーション' },
  { key: 'choco', name: '生チョコデコレーション' },
  { key: 'tart', name: 'フルーツタルト' },
];

export const bakedGoods: BakedGood[] = [
  { id: 'bake01', name: '焦がしバターフィナンシェ', price: 280, desc: 'バターとアーモンドの焼き菓子' },
  { id: 'bake02', name: '発酵バターサブレ', price: 240, desc: '発酵バターを使ったサブレ' },
  { id: 'bake03', name: '季節のパウンドケーキ', price: 360, desc: '果実とスパイス入りのパウンドケーキ' },
  { id: 'bake04', name: '焼き菓子ギフト6点', price: 1850, desc: '焼き菓子6点の詰め合わせ' },
  { id: 'bake05', name: '焼き菓子ギフト10点', price: 3100, desc: '焼き菓子10点の詰め合わせ' },
];

/** 税込価格の表記を統一(例: 1,850円) */
export const yen = (n: number) => `${n.toLocaleString('en-US')}円`;
