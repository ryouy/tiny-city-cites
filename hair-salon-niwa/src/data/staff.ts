// スタイリスト(仕様書 §5)
export interface Staff {
  id: string;
  name: string;
  en: string;
  role: string;
  career: string;
  strengths: string[];
  message: string;
}

export const staff: Staff[] = [
  {
    id: 'saeki',
    name: '佐伯 まどか',
    en: 'Madoka Saeki',
    role: 'Owner Stylist',
    career: '美容師歴12年',
    strengths: ['骨格に馴染むショート・ボブ', '柔らかなカラー'],
    message: '髪を整えることが、毎日の気持ちを少し前向きにする。そんな時間をお届けできたらうれしいです。',
  },
  {
    id: 'takano',
    name: '高野 悠',
    en: 'Yu Takano',
    role: 'Stylist',
    career: '美容師歴7年',
    strengths: ['ナチュラルなレイヤー', 'メンズカット', '頭皮ケア'],
    message: 'がんばりすぎない、自然な似合わせを一緒に探しましょう。',
  },
];
