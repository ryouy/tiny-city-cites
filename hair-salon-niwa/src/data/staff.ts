// スタイリスト(仕様書 §5)
export interface Staff {
  id: string;
  name: string;
  role: string;
  career: string;
  strengths: string[];
}

export const staff: Staff[] = [
  {
    id: 'saeki',
    name: '佐伯 まどか',
    role: 'オーナースタイリスト',
    career: '美容師歴12年',
    strengths: ['骨格に馴染むショート・ボブ', '柔らかなカラー'],
  },
  {
    id: 'takano',
    name: '高野 悠',
    role: 'スタイリスト',
    career: '美容師歴7年',
    strengths: ['ナチュラルなレイヤー', 'メンズカット', '頭皮ケア'],
  },
];
