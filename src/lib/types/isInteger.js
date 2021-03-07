function isInteger (_integer) {
  return typeof _integer === 'number' && _integer % 1 === 0
}

module.exports = {
  isInteger
}
