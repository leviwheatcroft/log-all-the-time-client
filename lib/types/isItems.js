import {
  isItem
} from './isItem'

export function isItems (_items) {
  return _items.every(isItem)
}
