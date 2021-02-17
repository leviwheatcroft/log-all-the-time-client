class ValidationError extends Error {
  constructor (type, ...params) {
    super(...params)

    this.code = 'VALIDATION_ERROR'
    this.type = type
  }
}

module.exports = {
  ValidationError
}
