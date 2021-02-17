const { ValidationError } = require('./ValidationError')

class MultiDateError extends ValidationError {
  constructor (...params) {
    super('MULTI_DATE', ...params)
  }
}

module.exports = {
  MultiDateError
}
