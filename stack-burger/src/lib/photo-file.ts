import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { photos, photoExts, type PhotoKey } from '../data/photos';

/** public/images/stack-burger/ に実ファイルがあればファイル名を返す(無ければ undefined) */
export function photoFile(name: PhotoKey): string | undefined {
  const def = photos[name];
  return photoExts
    .map((e) => `${def.base}.${e}`)
    .find((f) => existsSync(join(process.cwd(), 'public', 'images', 'stack-burger', f)));
}
