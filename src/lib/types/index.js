const { isEntry } = require('./isEntry')
const { isTag } = require('./isTag')
const { isUser } = require('./isUser')
const { isNewTag } = require('./isNewTag')
const { isMidnightUtc } = require('./isMidnightUtc')
const { isArray } = require('./isArray')
const { isFalse } = require('./isFalse')
const { isFunction } = require('./isFunction')
const { isUndefined } = require('./isUndefined')
const { isDate } = require('./isDate')
const { isNull } = require('./isNull')

module.exports = {
  isDate,
  isEntry,
  isTag,
  isUser,
  isNewTag,
  isMidnightUtc,
  isArray,
  isFalse,
  isFunction,
  isUndefined,
  isNull
}
