export function isProject (_project) {
  const {
    id,
    projectName
  } = _project
  return (
    typeof id === 'number' &&
    typeof projectName === 'string'
  )
}
