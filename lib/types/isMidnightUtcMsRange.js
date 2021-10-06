import {
  isMidnightUtcMs
} from './isMidnightUtcMs'
import {
  isNull
} from './isNull'

export function isMidnightUtcMsRange (midnightUtcMsRange) {
  return (
    midnightUtcMsRange.every((i) => isNull(i)) ||
    midnightUtcMsRange.every((i) => isMidnightUtcMs(i))
  )
}
