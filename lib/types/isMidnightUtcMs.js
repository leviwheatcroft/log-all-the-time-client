import {
  isInteger
} from './isInteger'

export function isMidnightUtcMs (_date) {
  if (!isInteger(_date))
    return false
  return _date % 100000 === 0
}
