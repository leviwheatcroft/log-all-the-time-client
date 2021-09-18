import {
  isInteger
} from './isInteger'

export function isDateMs (_dateMs) {
  return (
    isInteger(_dateMs) &&
    _dateMs > 1517443200000 && // 01/01/18
    _dateMs < 1975881600000 // 31/12/25
  )
}
