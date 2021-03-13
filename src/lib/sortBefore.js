function sortBefore (a, b, sort) {
  let isBefore
  // eslint-disable-next-line array-callback-return
  Object.entries(sort).some(([key, direction]) => {
    const _a = a[key].valueOf ? a[key].valueOf() : a[key]
    const _b = b[key].valueOf ? b[key].valueOf() : b[key]
    if (_a === _b)
      return false
    if (direction === 'desc')
      isBefore = _a > _b
    else
      isBefore = _a < _b
    return true
  })
  return isBefore
}

module.exports = {
  sortBefore
}
