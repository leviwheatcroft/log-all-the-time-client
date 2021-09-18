export function isNewProject (_newProject) {
  const {
    id,
    projectName
  } = _newProject
  return (
    id === false &&
    typeof projectName === 'string'
  )
}
