import { isDaySummary } from './isDaySummary'
import { isMidnightUtcMs } from './isMidnightUtcMs'

export function isDaySummaries (_daySummaries) {
  return Object.entries(_daySummaries).every(([day, daySummary]) => {
    return (
      isMidnightUtcMs(day) &&
      isDaySummary(daySummary)
    )
  })
}
