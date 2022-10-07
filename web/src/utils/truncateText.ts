export function truncateText(text: string, maxSize: number) {
  const response =
    text.split(' ').length <= maxSize
      ? text
      : text.split(' ').slice(0, maxSize).join(' ') + '...'

  return response
}
