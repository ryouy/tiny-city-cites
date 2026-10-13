// 句点・読点で区切り、各句を nowrap の span に包む(見出しの不自然な改行を防ぐ)。
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const phrases = (text: string): string =>
  text
    .split(/(?<=[、。])|(?=「)/)
    .filter(Boolean)
    .map((p) => `<span class="nw">${esc(p)}</span>`)
    .join('');
