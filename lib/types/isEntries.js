import {
  isEntry
} from './isEntry'

export function isEntries (_entries) {
  return _entries.every(isEntry)
}
