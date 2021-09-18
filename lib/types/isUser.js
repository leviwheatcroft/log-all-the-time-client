export function isUser (_user) {
  const {
    id,
    username
  } = _user
  return (
    typeof id === 'string' &&
    typeof username === 'string'
  )
}
