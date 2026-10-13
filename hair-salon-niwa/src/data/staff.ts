// スタイリスト(仕様書 §5。完全に架空の人物)
export interface Staff {
  id: string;
  name: string;
  en: string;
  role: string;
  career: string;
  strengths: string[];
  message: string;
  photo: 'staffSaeki' | 'staffTakano';
}

export const staff: Staff[] = [
  {
    id: 'saeki',
    name: '佐伯 まどか',
    en: 'Madoka Saeki',
    role: 'Owner Stylist',
    career: '美容師歴12年（架空）',
    strengths: ['骨格に馴染むショート・ボブ', '柔らかなカラー'],
    message: '髪を整えることが、毎日の気持ちを少し前向きにする。そんな時間をお届けできたらうれしいです。',
    photo: 'staffSaeki',
  },
  {
    id: 'takano',
    name: '高野 悠',
    en: 'Yu Takano',
    role: 'Stylist',
    career: '美容師歴7年（架空）',
    strengths: ['ナチュラルなレイヤー', 'メンズカット', '頭皮ケア'],
    message: 'がんばりすぎない、自然な似合わせを一緒に探しましょう。',
    photo: 'staffTakano',
  },
];

export const staffNote = 'スタッフの名前・経歴・メッセージはすべて創作（架空の人物）です。実在の人物とは関係ありません。';
