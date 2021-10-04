import {
  isMidnightUtcMs
} from './isMidnightUtcMs'
import {
  isDateMs
} from './isDateMs'
export function isEntry (_entry) {
  const {
    id,
    date,
    duration,
    description,
    createdAt,
    tags
  } = _entry
  return (
    (
      typeof id === 'number' ||
      id === 'newId'
    ) &&
    isMidnightUtcMs(date) &&
    (
      createdAt === undefined ||
      isDateMs(createdAt)
    ) &&
    typeof duration === 'number' && duration % 1 === 0 &&
    typeof description === 'string' &&
    Array.isArray(tags)
  )
}
