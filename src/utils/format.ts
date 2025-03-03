/**
 * 秒数をxx:xxの形式にフォーマットする
 * @param second {number}
 * @returns {string} xx:xx
 */
export function formatDuration(second: number) {
  const numberFormat = new Intl.NumberFormat('en', { minimumIntegerDigits: 2 })
  const minutes = numberFormat.format(Math.floor(second / 60))
  const secs = numberFormat.format(second % 60)

  return `${minutes}:${secs}`
}
