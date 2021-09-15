const isIterable = require('./isIterable')

function getValidatorOr (...typeChecks) {
  return function validatorOr (value) {
    const pass = typeChecks.some((tC) => tC(value))
    if (!pass) {
      console.error(
        'Bad Type',
        typeChecks.map((t) => t.name).join(' | '),
        isIterable(value) ? { ...value } : value,
      )
    }
    return pass
  }
}

module.exports = { getValidatorOr }
