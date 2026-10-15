import type { PhotoKey } from './menu';

// public/images/soda-biyori/ に「base.(webp|png|jpg|jpeg|avif)」のいずれかを置くと、
// ビルド時に自動でプレースホルダーから実写へ切り替わります。
export interface PhotoDef {
  /** 拡張子を除いたファイル名(仕様書 §7) */
  base: string;
  alt: string;
  /** プレースホルダーに表示する撮影イメージ */
  shoot: string;
  /** 実写のとき <img> に指定する固有サイズ(推奨書き出しサイズ) */
  width: number;
  height: number;
  /** プレースホルダーの色面 */
  tone: 'mint' | 'pink' | 'blue' | 'orange' | 'butter' | 'brown';
  /** README 掲載用: 推奨比率と用途 */
  usage: string;
  /** 仕様書に明記されたファイルか(false は本実装での追加) */
  spec: boolean;
}

export const photos: Record<PhotoKey, PhotoDef> = {
  hero: {
    base: 'hero-cream-soda',
    alt: '緑色のメロンクリームソーダ。丸いバニラアイスとチェリーをのせた、脚付きグラス',
    shoot: '透明感のある緑のメロンソーダ、丸いバニラアイスとチェリー、脚付きグラス。温かな午後の光。',
    width: 1122, height: 1402, tone: 'mint', usage: 'ヒーロー(4:5)/ギャラリー', spec: true,
  },
  melon: {
    base: 'hero-cream-soda',
    alt: '緑色のメロンクリームソーダ。丸いバニラアイスとチェリーをのせた、脚付きグラス',
    shoot: 'メロンクリームソーダ。緑のソーダ、バニラアイス、チェリー。',
    width: 1122, height: 1402, tone: 'mint', usage: 'カラーセレクター(メロン。ヒーローと同じファイル)', spec: true,
  },
  ichigo: {
    base: 'soda-ichigo',
    alt: 'ピンク色のいちごクリームソーダ',
    shoot: 'ピンクのいちごクリームソーダ。',
    width: 1122, height: 1402, tone: 'pink', usage: 'カラーセレクター/ギャラリー(4:5)', spec: true,
  },
  aozora: {
    base: 'soda-aozora',
    alt: '青色の青空クリームソーダ',
    shoot: '青のクリームソーダ。',
    width: 1122, height: 1402, tone: 'blue', usage: 'カラーセレクター/ギャラリー(4:5)', spec: true,
  },
  yuyake: {
    base: 'soda-yuyake',
    alt: 'オレンジ色のゆうやけクリームソーダ',
    shoot: 'オレンジのクリームソーダ。',
    width: 1122, height: 1402, tone: 'orange', usage: 'カラーセレクター/ギャラリー(4:5)', spec: true,
  },
  kisetsu: {
    base: 'soda-kisetsu',
    alt: '季節のクリームソーダ',
    shoot: '季節のクリームソーダ。色・味は季節で変わる設定。',
    width: 1122, height: 1402, tone: 'butter', usage: '季節のクリームソーダ(4:5)(仕様書に指定なし。任意の追加)', spec: false,
  },
  pudding: {
    base: 'pudding',
    alt: '固めプリン。カラメルがかかり、ホイップとチェリーが添えられている',
    shoot: '固めプリン、カラメル、チェリーとホイップ。',
    width: 1402, height: 1122, tone: 'orange', usage: 'プリン特集(5:4)/ギャラリー', spec: true,
  },
  napolitan: {
    base: 'napolitan',
    alt: '熱い鉄板にのった昔ながらのナポリタン',
    shoot: '昔ながらのナポリタン、熱い鉄板。',
    width: 1402, height: 1122, tone: 'orange', usage: '喫茶ごはん(5:4)/ギャラリー', spec: true,
  },
  omelette: {
    base: 'omelette-rice',
    alt: 'ふんわり卵がのった喫茶店のオムライス',
    shoot: '喫茶オムライス。ケチャップライスとふんわり卵。',
    width: 1254, height: 1254, tone: 'butter', usage: '喫茶ごはん(1:1)/ギャラリー', spec: true,
  },
  interior: {
    base: 'shop-interior',
    alt: 'ミント色の椅子とレトロな照明がある、明るい喫茶店の店内',
    shoot: 'ミント色の椅子、レトロ照明、清潔で明るい内装。',
    width: 1402, height: 1122, tone: 'mint', usage: 'コンセプト(4:5)/ギャラリー(横長)', spec: true,
  },
};

export const photoExts = ['webp', 'png', 'jpg', 'jpeg', 'avif'];
