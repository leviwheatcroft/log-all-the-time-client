export function isTag (tag) {
  const {
    id,
    tagName
  } = tag
  return (
    typeof id === 'number' &&
    typeof tagName === 'string'
  )
}
