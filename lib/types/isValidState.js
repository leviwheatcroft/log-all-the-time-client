const {
  ValidState
} = require('../enums')

function isValidState (_validState) {
  return Object.values(ValidState).some((vs) => vs === _validState)
}

module.exports = {
  isValidState
}
