import {
  isDate
} from './isDate'

export function isMidnightUtc (_date) {
  if (!isDate(_date))
    return false
  return (
    _date.getUTCHours() === 0 &&
    _date.getUTCMinutes() === 0 &&
    _date.getUTCSeconds() === 0 &&
    _date.getUTCMilliseconds() === 0
  )
}
