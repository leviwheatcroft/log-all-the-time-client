// getCommaIndexes
// returns 0-based indexes

function getCommaIndexes (string) {
  const regExp = /,/g
  const indexes = []
  let result
  // eslint-disable-next-line no-cond-assign
  while ((result = regExp.exec(string)) !== null)
    indexes.push(result.index)

  return indexes
}

module.exports = {
  getCommaIndexes
}
