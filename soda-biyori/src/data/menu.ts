// メニュー・価格は仕様書 §3 のとおり(税込)。変更する場合は仕様書も合わせて更新すること。
export type PhotoKey =
  | 'hero'
  | 'melon'
  | 'ichigo'
  | 'aozora'
  | 'yuyake'
  | 'kisetsu'
  | 'pudding'
  | 'napolitan'
  | 'omelette'
  | 'interior';

export interface Soda {
  id: string;
  name: string;
  /** 表示用の価格(税込) */
  price: string;
  /** 仕様書「色・内容」を ／ で分割したもの */
  notes: string[];
  badge: string;
  /** セレクターの色見本・ヒーローアクセント色 */
  color: string;
  /** 色名(色だけに意味を依存させないためのラベル) */
  colorName: string;
  photo: PhotoKey;
}

export const sodas: Soda[] = [
  { id: 'soda-01', name: 'メロンクリームソーダ', price: '680円', notes: ['鮮やかな緑', 'バニラアイス', 'チェリー'], badge: '定番', color: '#2ea84a', colorName: 'メロン', photo: 'melon' },
  { id: 'soda-02', name: 'いちごクリームソーダ', price: '720円', notes: ['ピンク', '甘酸っぱいいちご'], badge: '人気', color: '#e8607a', colorName: 'いちご', photo: 'ichigo' },
  { id: 'soda-03', name: '青空クリームソーダ', price: '720円', notes: ['ブルー', '爽やかなシトラス風味'], badge: '写真映え', color: '#2a8fe0', colorName: '青空', photo: 'aozora' },
  { id: 'soda-04', name: 'ゆうやけクリームソーダ', price: '750円', notes: ['オレンジ', '柑橘系ソーダ'], badge: 'おすすめ', color: '#f08a1c', colorName: 'ゆうやけ', photo: 'yuyake' },
  { id: 'soda-05', name: '季節のクリームソーダ', price: '780円', notes: ['季節で色・味が変わる'], badge: '期間限定', color: '#a58bd6', colorName: '季節', photo: 'kisetsu' },
];

export interface Item {
  id: string;
  name: string;
  price: string;
  desc: string;
  badge?: string;
}

export const sweets: Item[] = [
  { id: 'sweet-01', name: '昔ながらの固めプリン', price: '580円', desc: '卵の風味とほろ苦カラメル、ホイップとチェリー付き' },
  { id: 'sweet-02', name: 'プリン・ア・ラ・モード', price: '980円', desc: 'プリンにフルーツとアイスを盛り付け' },
  { id: 'sweet-03', name: '季節のショートケーキ', price: '650円', desc: '季節の果物を使ったケーキ' },
  { id: 'sweet-04', name: 'チョコレートパフェ', price: '880円', desc: 'チョコアイスとバナナ、ホイップ' },
  { id: 'sweet-05', name: 'クリームあんみつ', price: '750円', desc: 'あんこ・寒天・黒蜜・アイス' },
];

export const foods: Item[] = [
  { id: 'food-01', name: '鉄板ナポリタン', price: '1,080円', desc: '熱々の鉄板に、もちもち麺とトマトソース' },
  { id: 'food-02', name: '厚焼きたまごサンド', price: '880円', desc: 'ふんわり厚焼き玉子とトースト' },
  { id: 'food-03', name: '喫茶店のオムライス', price: '1,180円', desc: 'ケチャップライス、ふんわり卵' },
  { id: 'food-04', name: 'ピザトースト', price: '780円', desc: 'チーズと野菜をのせて焼き上げ' },
  { id: 'food-05', name: '懐かしのホットケーキ', price: '850円', desc: 'バターとメープル風シロップの2枚重ね' },
];

export const drinks: { name: string; price: string }[] = [
  { name: 'ブレンドコーヒー', price: '500円' },
  { name: 'アイスコーヒー', price: '520円' },
  { name: 'カフェオレ（HOT/ICE）', price: '580円' },
  { name: '紅茶（HOT/ICE）', price: '500円' },
  { name: 'ココア（HOT/ICE）', price: '600円' },
];

export const setNote = 'フードに対象ドリンクを付けると、ドリンク代から150円引き（クリームソーダは対象外）。';
export const menuDisclaimer = 'アレルゲン情報は掲載していません。';
export const menuTaxNote = '価格はすべて税込です。';

