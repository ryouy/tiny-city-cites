// public/images/trattoria-machi/ に「base.(webp|png|jpg|jpeg|avif)」のいずれかを置くと、
// ビルド時に自動でプレースホルダーから実写へ切り替わります。画像内に価格・ロゴ・店名を入れないこと(仕様書 §7)。
export type PhotoKey = 'hero' | 'pastaTomato' | 'pastaCream' | 'pizza' | 'antipasti' | 'tiramisu' | 'interior';
export const photoExts = ['webp', 'png', 'jpg', 'jpeg', 'avif'] as const;

export interface PhotoDef {
  base: string;
  alt: string;
  shoot: string;
  width: number;
  height: number;
  tone: 'tomato' | 'olive' | 'mustard' | 'wood' | 'cream';
  /** README 掲載用 */
  ratioLabel: string;
  usage: string;
  /** 被写体に合わせた object-position の既定値 */
  pos: string;
}

export const photos: Record<PhotoKey, PhotoDef> = {
  hero: {
    base: 'hero-table',
    alt: '木のテーブルに並んだパスタ、ピッツァ、サラダ',
    shoot: '木のテーブルにパスタ、ピッツァ、サラダを並べた食卓。',
    width: 1672, height: 941, tone: 'wood', ratioLabel: '16:9', usage: 'トップ ヒーロー', pos: '50% 68%',
  },
  pastaTomato: {
    base: 'pasta-tomato',
    alt: '揚げなすとモッツァレラのトマトソースパスタ',
    shoot: '揚げなすとモッツァレラのトマトソース。真上に近い角度。',
    width: 1122, height: 1402, tone: 'tomato', ratioLabel: '4:5', usage: 'お品書き(パスタ)', pos: '50% 55%',
  },
  pastaCream: {
    base: 'pasta-cream',
    alt: 'きのことベーコンのクリームパスタ',
    shoot: 'きのことベーコンのクリームパスタ。少し斜めから。',
    width: 1122, height: 1402, tone: 'cream', ratioLabel: '4:5', usage: 'お品書き(ランチ)', pos: '50% 58%',
  },
  pizza: {
    base: 'pizza-margherita',
    alt: 'マルゲリータ',
    shoot: 'マルゲリータ。真上から。',
    width: 1122, height: 1402, tone: 'mustard', ratioLabel: '4:5', usage: 'お品書き(ピッツァ)', pos: '50% 52%',
  },
  antipasti: {
    base: 'antipasti',
    alt: '前菜3種の盛り合わせ',
    shoot: '前菜3種の盛り合わせ。',
    width: 1122, height: 1402, tone: 'olive', ratioLabel: '4:5', usage: 'お品書き(前菜)', pos: '50% 55%',
  },
  tiramisu: {
    base: 'tiramisu',
    alt: 'ティラミス',
    shoot: 'ティラミス。断面が見える角度。',
    width: 1122, height: 1402, tone: 'wood', ratioLabel: '4:5', usage: 'お品書き(ドルチェとドリンク)', pos: '50% 58%',
  },
  interior: {
    base: 'interior',
    alt: '木製のテーブルが並ぶ店内',
    shoot: '木製テーブルの店内。2人席と4人席が見える構図。',
    width: 1536, height: 1024, tone: 'cream', ratioLabel: '3:2', usage: 'トップ(お店のこと)', pos: '40% 60%',
  },
};
