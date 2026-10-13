// public/images/hair-salon-niwa/ に「base.(webp|png|jpg|jpeg|avif)」のいずれかを置くと、
// ビルド時に自動でプレースホルダーから実写へ切り替わります。
export const photoExts = ['webp', 'png', 'jpg', 'jpeg', 'avif'] as const;

export type PhotoKey =
  | 'hero' | 'interior' | 'hands'
  | 'style01' | 'style02' | 'style03' | 'style04' | 'style05' | 'style06'
  | 'staffSaeki' | 'staffTakano';

export interface PhotoDef {
  /** 拡張子を除いたファイル名 */
  base: string;
  alt: string;
  /** プレースホルダーに表示する撮影イメージ */
  shoot: string;
  /** 実写のときの固有サイズ(推奨書き出しサイズ) */
  width: number;
  height: number;
  tone: 'sand' | 'stone' | 'clay' | 'mist';
  /** README 掲載用 */
  usage: string;
  /** 仕様書に明記されたファイルか(false は本実装での追加) */
  spec: boolean;
  person?: boolean;
}

export const photos: Record<PhotoKey, PhotoDef> = {
  hero: {
    base: 'niwa-hero', alt: '2席だけの、静かなサロンの内装',
    shoot: 'ミラー2面と椅子2脚。木の質感と自然光が入る、静かなサロン内装（横長）。',
    width: 1800, height: 1200, tone: 'sand', usage: 'ヒーロー（3:2 横長）', spec: true,
  },
  interior: {
    base: 'niwa-interior', alt: 'ミラー、木材、窓からの自然光が並ぶサロンの一角',
    shoot: 'ミラーの縁、木の棚、カーテン越しの自然光。人物は写さない。',
    width: 1200, height: 1500, tone: 'stone', usage: 'About / 初回来店（4:5 縦長）', spec: true,
  },
  hands: {
    base: 'niwa-hands', alt: '髪をブローしながら整える、スタイリングの手元',
    shoot: 'ブラシとドライヤーで髪を整える手元のクローズアップ。本人を特定できない構図。',
    width: 1200, height: 1500, tone: 'clay', usage: 'メニュー / スタッフ（4:5 縦長）', spec: true,
  },
  style01: {
    base: 'niwa-style-01', alt: 'やわらか丸みボブのスタイル写真',
    shoot: '首元がすっきり見える丸みボブ。後ろ姿または横顔（縦長）。', width: 1200, height: 1600, tone: 'sand', usage: 'スタイル01（3:4 縦長）', spec: true,
  },
  style02: {
    base: 'niwa-style-02', alt: '透け感ミディアムのスタイル写真',
    shoot: '顔周りに軽さのあるミディアムレイヤー（縦長）。', width: 1200, height: 1600, tone: 'mist', usage: 'スタイル02（3:4 縦長）', spec: true,
  },
  style03: {
    base: 'niwa-style-03', alt: '大人のコンパクトショートのスタイル写真',
    shoot: 'ハンサムすぎない、まとまりのあるショート（縦長）。', width: 1200, height: 1600, tone: 'clay', usage: 'スタイル03（3:4 縦長）', spec: true,
  },
  style04: {
    base: 'niwa-style-04', alt: '艶感ロングレイヤーのスタイル写真',
    shoot: '毛先の動きと艶が見えるロングレイヤー（縦長）。', width: 1200, height: 1600, tone: 'stone', usage: 'スタイル04（3:4 縦長）', spec: true,
  },
  style05: {
    base: 'niwa-style-05', alt: 'センターパートショートのメンズスタイル写真',
    shoot: '清潔感のあるセンターパートのショート（縦長）。', width: 1200, height: 1600, tone: 'mist', usage: 'スタイル05（3:4 縦長）', spec: true,
  },
  style06: {
    base: 'niwa-style-06', alt: 'ニュアンスパーマのメンズスタイル写真',
    shoot: '柔らかい動きと立体感のあるパーマスタイル（縦長）。', width: 1200, height: 1600, tone: 'sand', usage: 'スタイル06（3:4 縦長）', spec: true,
  },
  staffSaeki: {
    base: 'niwa-staff-saeki', alt: 'スタイリスト 佐伯 まどか（架空の人物）',
    shoot: 'スタッフ写真が提供された場合のみ差し替え。未提供時はシルエット表示。', width: 1000, height: 1250, tone: 'sand', usage: 'スタッフ(4:5)※任意', spec: false, person: true,
  },
  staffTakano: {
    base: 'niwa-staff-takano', alt: 'スタイリスト 高野 悠（架空の人物）',
    shoot: 'スタッフ写真が提供された場合のみ差し替え。未提供時はシルエット表示。', width: 1000, height: 1250, tone: 'stone', usage: 'スタッフ(4:5)※任意', spec: false, person: true,
  },
};
