import {
  isInteger
} from './isInteger'

export function isDateMs (_dateMs) {
  return (
    isInteger(_dateMs) &&
    _dateMs > 1262275200000 && // 01/01/10
    _dateMs < 2524579200000 // 31/12/50
  )
}
