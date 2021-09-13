const {
  enumeration
} = require('./enumeration')

const ValidState = enumeration(
  'unchecked',
  'valid',
  'invalid'
)

module.exports = {
  ValidState
}
