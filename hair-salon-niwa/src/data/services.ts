// メニュー・税込価格(仕様書 §4)。表示文字列は仕様書の表記のまま保持する。
export type CategoryKey = 'Cut' | 'Color' | 'Perm' | 'Care' | 'Set';

export interface Service {
  id: string;
  category: CategoryKey;
  name: string;
  /** 税込・表示用(「〜」を含む) */
  price: string;
  /** 所要時間の目安(表示用) */
  duration: string;
  note: string;
}

export const categories: { key: CategoryKey; ja: string }[] = [
  { key: 'Cut', ja: 'カット' },
  { key: 'Color', ja: 'カラー' },
  { key: 'Perm', ja: 'パーマ' },
  { key: 'Care', ja: 'ケア' },
  { key: 'Set', ja: 'セットメニュー' },
];

export const services: Service[] = [
  { id: 'cut01', category: 'Cut', name: 'カット', price: '5,500円', duration: '60分', note: 'シャンプー・ブロー込み' },
  { id: 'cut02', category: 'Cut', name: '前髪カット', price: '1,100円', duration: '15分', note: '単品可' },
  { id: 'cut03', category: 'Cut', name: '学生カット（大学生まで）', price: '4,400円', duration: '60分', note: '学生証提示想定' },
  { id: 'color01', category: 'Color', name: 'リタッチカラー', price: '6,600円〜', duration: '90分', note: 'カット別' },
  { id: 'color02', category: 'Color', name: 'フルカラー', price: '7,700円〜', duration: '120分', note: 'カット別・長さで変動' },
  { id: 'color03', category: 'Color', name: 'デザインカラー', price: '11,000円〜', duration: '150〜210分', note: 'ブリーチ料金別' },
  { id: 'perm01', category: 'Perm', name: 'ナチュラルパーマ', price: '8,800円〜', duration: '120分', note: 'カット別' },
  { id: 'care01', category: 'Care', name: '3stepトリートメント', price: '3,300円', duration: '30分', note: '単品時シャンプー・ブロー別' },
  { id: 'care02', category: 'Care', name: 'アロマヘッドスパ', price: '4,400円', duration: '40分', note: '単品時シャンプー・ブロー別' },
  { id: 'set01', category: 'Set', name: 'カット＋カラー', price: '12,100円〜', duration: '150分', note: 'カラーの内容で変動' },
  { id: 'set02', category: 'Set', name: 'カット＋トリートメント', price: '8,250円〜', duration: '90分', note: 'トリートメント種類で変動' },
];

export const byId = (id: string) => services.find((s) => s.id === id);

/** トップのメニュー抜粋 */
export const previewIds = ['cut01', 'color02', 'perm01', 'care01', 'set01'];

export const menuNotes = [
  '料金は税込です。',
  '「〜」の付いた料金は、施術内容により追加料金がかかる場合があります。',
  '所要時間は目安です。髪の状態や施術内容により前後します。',
];

export const priceRange = 'カット5,000円台〜、カラー7,000円台〜';
