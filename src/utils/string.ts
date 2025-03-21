/**
 * 文字列の後ろから任意の文字を探索し、最初に発見したところまでの文字列を取得する
 * @param text 探査される文字列
 * @param segment 探査する文字
 * @returns 後ろからsegmentまで切り取った文字列
 */
export function getLastTextSegment(text: string, segment: '/'): string {
  const lastSlashIndex = text.lastIndexOf(segment) // 最後の `/` の位置を取得
  return lastSlashIndex !== -1 ? text.slice(lastSlashIndex + 1) : text // `/` の次から最後までを取得
}
