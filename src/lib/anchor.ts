/** Same output as WordPress sanitize_title(), prefixed, so jump links match the old site. */
export function anchor(text: string): string {
  const slug = text
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&[a-z0-9#]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
  return 'sec-' + (slug || 'section');
}
