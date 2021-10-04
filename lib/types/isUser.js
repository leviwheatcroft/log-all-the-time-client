export function isUser (_user) {
  const {
    id,
    username,
    gravatar
  } = _user
  return (
    typeof id === 'number' &&
    typeof username === 'string' &&
    typeof gravatar === 'string'
  )
}
