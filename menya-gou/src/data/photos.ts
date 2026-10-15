import type { PhotoKey } from './menu';

// public/images/menya-gou/ に同じベース名のファイルを置くと、ビルド時に自動でプレースホルダーから実写へ切り替わります。
// 拡張子は webp / png / jpg / jpeg / avif のいずれでも可(Photo.astro が build 時に探索)。
export interface PhotoDef {
  /** ベース名(拡張子なし) */
  base: string;
  /** 仕様書上の推奨ファイル名 */
  file: string;
  alt: string;
  /** プレースホルダーに表示する撮影イメージ */
  shoot: string;
  width: number;
  height: number;
  tone: 'ink' | 'red' | 'gold';
}

export const photoExts = ['webp', 'png', 'jpg', 'jpeg', 'avif'] as const;

export const photos: Record<PhotoKey, PhotoDef> = {
  hero: {
    base: 'hero-ramen',
    file: 'hero-ramen.webp',
    alt: '海苔・ほうれん草・チャーシュー・鶏油がのった、湯気の立つ家系ラーメン',
    shoot: '海苔・ほうれん草・チャーシュー・鶏油が見える家系ラーメン。湯気と立体感、横位置。',
    width: 1448,
    height: 1086,
    tone: 'ink',
  },
  soup: {
    base: 'soup-detail',
    file: 'soup-detail.webp',
    alt: '豚骨醤油スープの質感を接写した写真',
    shoot: '豚骨醤油スープの質感の接写。',
    width: 1254,
    height: 1254,
    tone: 'red',
  },
  noodle: {
    base: 'noodle-lift',
    file: 'noodle-lift.webp',
    alt: '箸で持ち上げた中太ストレート麺',
    shoot: '箸で持ち上げた中太麺。',
    width: 1122,
    height: 1402,
    tone: 'gold',
  },
  rice: {
    base: 'rice-pairing',
    file: 'rice-pairing.webp',
    alt: 'ライスと海苔、ラーメンを並べた一膳',
    shoot: 'ライス+海苔+ラーメンの取り合わせ。',
    width: 1448,
    height: 1086,
    tone: 'red',
  },
  interior: {
    base: 'shop-interior',
    file: 'shop-interior.webp',
    alt: '清潔なカウンター席が並ぶ店内',
    shoot: '清潔なカウンター席。実在の看板や人物の分かるものは写さない。',
    width: 1448,
    height: 1086,
    tone: 'ink',
  },
};
