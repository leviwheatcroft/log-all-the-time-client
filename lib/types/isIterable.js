// https://stackoverflow.com/questions/18884249/checking-whether-something-is-iterable

export function isIterable (obj) {
  // checks for null and undefined
  if (obj == null)
    return false

  return typeof obj[Symbol.iterator] === 'function'
}
