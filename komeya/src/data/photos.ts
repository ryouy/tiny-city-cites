import type { PhotoKey } from './menu';

// public/images/komeya/ に「file」と同名(拡張子は webp / png / jpg / jpeg のどれでも可)のファイルを置くと、ビルド時に自動でプレースホルダーから実写へ切り替わります。
export interface PhotoDef {
  /** 拡張子なしのファイル名 */
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
    file: 'hero-karaage',
    alt: 'こめやの唐揚げ定食。揚げたての唐揚げに、ごはんと味噌汁を添えて',
    shoot: '唐揚げ定食の全景。味噌汁とお米、温かい光。',
    width: 1448,
    height: 1086,
    tone: 'tan',
  },
  katsudon: {
    file: 'sauce-katsudon',
    alt: '会津ソースカツ丼。厚切りのカツとキャベツがごはんの上に',
    shoot: '会津ソースカツ丼。肉とキャベツの質感。',
    width: 1448,
    height: 1086,
    tone: 'shu',
  },
  rice: {
    file: 'rice',
    alt: '羽釜からよそった炊きたてのごはんと立ちのぼる湯気',
    shoot: '羽釜からよそった炊きたてごはんと湯気。',
    width: 1448,
    height: 1086,
    tone: 'rice',
  },
  interior: {
    file: 'interior',
    alt: '木製のテーブルが並ぶ、小さな定食屋の店内',
    shoot: '木製テーブルと、小さな定食屋の店内。',
    width: 1448,
    height: 1086,
    tone: 'tan',
  },
  noren: {
    file: 'noren',
    alt: '「こめや」ののれんがかかる店の入口(架空デザイン)',
    shoot: '店のれんや外観(架空デザイン)。',
    width: 1672,
    height: 941,
    tone: 'green',
  },
  gingerPork: {
    file: 'ginger-pork',
    alt: '豚の生姜焼き定食。ごはん・味噌汁・小鉢つき',
    shoot: '生姜焼き定食。',
    width: 1448,
    height: 1086,
    tone: 'shu',
  },
};
