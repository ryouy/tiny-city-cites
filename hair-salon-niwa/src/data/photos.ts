// public/images/hair-salon-niwa/ に「base.(webp|png|jpg|jpeg|avif)」のいずれかを置くと、
// ビルド時に自動でプレースホルダーから実写へ切り替わります。
export const photoExts = ['webp', 'png', 'jpg', 'jpeg', 'avif'] as const;

export type PhotoKey =
  | 'hero' | 'interior' | 'hands'
  | 'style01' | 'style02' | 'style03' | 'style04' | 'style05' | 'style06';

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
}

export const photos: Record<PhotoKey, PhotoDef> = {
  hero: {
    base: 'niwa-hero', alt: 'ミラーと椅子が2席分並ぶサロンの内装',
    shoot: 'ミラー2面と椅子2脚。木の質感と自然光が入る、静かなサロン内装（横長）。',
    width: 1536, height: 1024, tone: 'sand', usage: 'トップ ヒーロー（3:2 横長）', spec: true,
  },
  interior: {
    base: 'niwa-interior', alt: 'ミラーと木の棚、窓のあるサロンの一角',
    shoot: 'ミラーの縁、木の棚、カーテン越しの自然光。人物は写さない。',
    width: 1122, height: 1402, tone: 'stone', usage: 'トップ About（4:5 縦長）', spec: true,
  },
  hands: {
    base: 'niwa-hands', alt: 'ブラシとドライヤーで髪を整える手元',
    shoot: 'ブラシとドライヤーで髪を整える手元のクローズアップ。本人を特定できない構図。',
    width: 1122, height: 1402, tone: 'clay', usage: 'メニュー（4:5 縦長）', spec: true,
  },
  style01: {
    base: 'niwa-style-01', alt: 'やわらか丸みボブのスタイル写真',
    shoot: '首元がすっきり見える丸みボブ。後ろ姿または横顔（縦長）。', width: 1086, height: 1448, tone: 'sand', usage: 'スタイル01（3:4 縦長）', spec: true,
  },
  style02: {
    base: 'niwa-style-02', alt: '透け感ミディアムのスタイル写真',
    shoot: '顔周りに軽さのあるミディアムレイヤー（縦長）。', width: 1086, height: 1448, tone: 'mist', usage: 'スタイル02（3:4 縦長）', spec: true,
  },
  style03: {
    base: 'niwa-style-03', alt: '大人のコンパクトショートのスタイル写真',
    shoot: 'ハンサムすぎない、まとまりのあるショート（縦長）。', width: 1087, height: 1447, tone: 'clay', usage: 'スタイル03（3:4 縦長）', spec: true,
  },
  style04: {
    base: 'niwa-style-04', alt: '艶感ロングレイヤーのスタイル写真',
    shoot: '毛先の動きと艶が見えるロングレイヤー（縦長）。', width: 1086, height: 1448, tone: 'stone', usage: 'スタイル04（3:4 縦長）', spec: true,
  },
  style05: {
    base: 'niwa-style-05', alt: 'センターパートショートのメンズスタイル写真',
    shoot: '清潔感のあるセンターパートのショート（縦長）。', width: 1086, height: 1448, tone: 'mist', usage: 'スタイル05（3:4 縦長）', spec: true,
  },
  style06: {
    base: 'niwa-style-06', alt: 'ニュアンスパーマのメンズスタイル写真',
    shoot: '柔らかい動きと立体感のあるパーマスタイル（縦長）。', width: 1086, height: 1448, tone: 'sand', usage: 'スタイル06（3:4 縦長）', spec: true,
  },
};
