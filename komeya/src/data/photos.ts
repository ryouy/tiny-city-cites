import type { PhotoKey } from './menu';

// public/images/komeya/ に同名ファイルを置くと、ビルド時に自動でプレースホルダーから実写へ切り替わります。
export interface PhotoDef {
  file: string;
  /** 実写があるときの alt */
  alt: string;
  /** プレースホルダーに表示する撮影イメージ */
  shoot: string;
  width: number;
  height: number;
  tone: 'tan' | 'rice' | 'shu' | 'green';
}

export const photos: Record<PhotoKey, PhotoDef> = {
  hero: {
    file: 'hero-karaage.png',
    alt: 'こめやの唐揚げ定食。揚げたての唐揚げに、ごはんと味噌汁を添えて',
    shoot: '唐揚げ定食の全景。味噌汁とお米、温かい光。',
    width: 1200,
    height: 900,
    tone: 'tan',
  },
  katsudon: {
    file: 'sauce-katsudon.png',
    alt: '会津ソースカツ丼。厚切りのカツとキャベツがごはんの上に',
    shoot: '会津ソースカツ丼。肉とキャベツの質感。',
    width: 1200,
    height: 900,
    tone: 'shu',
  },
  rice: {
    file: 'rice.png',
    alt: '羽釜からよそった炊きたてのごはんと立ちのぼる湯気',
    shoot: '羽釜からよそった炊きたてごはんと湯気。',
    width: 1200,
    height: 900,
    tone: 'rice',
  },
  interior: {
    file: 'interior.png',
    alt: '木製のテーブルが並ぶ、小さな定食屋の店内',
    shoot: '木製テーブルと、小さな定食屋の店内。',
    width: 1200,
    height: 900,
    tone: 'tan',
  },
  noren: {
    file: 'noren.png',
    alt: '「こめや」ののれんがかかる店の入口(架空デザイン)',
    shoot: '店のれんや外観(架空デザイン)。',
    width: 1200,
    height: 900,
    tone: 'green',
  },
  gingerPork: {
    file: 'ginger-pork.png',
    alt: '豚の生姜焼き定食。ごはん・味噌汁・小鉢つき',
    shoot: '生姜焼き定食。',
    width: 1200,
    height: 900,
    tone: 'shu',
  },
};
