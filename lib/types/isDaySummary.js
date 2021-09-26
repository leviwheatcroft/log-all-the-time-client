import { isInteger } from './isInteger'

export function isDaySummary (_daySummary) {
  Object.entries(_daySummary).every(([projectId, project]) => {
    return (
      isInteger(projectId) &&
      isInteger(project.id) &&
      isInteger(project.duration) &&
      typeof project.projectName === 'string'
    )
  })
}
