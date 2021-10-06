import { isArray } from './isArray'
import { isBoolean } from './isBoolean'
import { isDate } from './isDate'
import { isDateMs } from './isDateMs'
import { isEmptyString } from './isEmptyString'
import { isEntries } from './isEntries'
import { isEntry } from './isEntry'
import { isFalse } from './isFalse'
import { isFunction } from './isFunction'
import { isInteger } from './isInteger'
import { isItem } from './isItem'
import { isItems } from './isItems'
import { isIterable } from './isIterable'
import { isMidnightUtc } from './isMidnightUtc'
import { isMidnightUtcMs } from './isMidnightUtcMs'
import { isMidnightUtcMsRange } from './isMidnightUtcMsRange'
import { isNewProject } from './isNewProject'
import { isNewTag } from './isNewTag'
import { isNull } from './isNull'
import { isProject } from './isProject'
import { isTag } from './isTag'
import { isUndefined } from './isUndefined'
import { isUser } from './isUser'
import { isValidState } from './isValidState'
import { isEntryListField } from './isEntryListField'
import { isDaySummary } from './isDaySummary'
import { isString } from './isString'
import { isUsers } from './isUsers'
// import { isDaySummaries } from './isDaySummaries'

const typeChecks = {
  isArray,
  isBoolean,
  isDaySummary,
  // isDaySummaries,
  isDate,
  isDateMs,
  isEmptyString,
  isEntries,
  isEntry,
  isFalse,
  isFunction,
  isInteger,
  isItem,
  isItems,
  isIterable,
  isMidnightUtc,
  isMidnightUtcMs,
  isMidnightUtcMsRange,
  isNewProject,
  isNewTag,
  isNull,
  isProject,
  isTag,
  isUndefined,
  isUser,
  isValidState,
  isEntryListField,
  isString,
  isUsers
}

function getValidator (typeCheckNames) {
  if (!isArray(typeCheckNames))
    typeCheckNames = [typeCheckNames]

  return function is (value) {
    if (!typeCheckNames.some((tCN) => typeChecks[tCN](value))) {
      console.error(
        'Bad Type',
        typeCheckNames.join(' || '),
        isIterable(value) ? { ...value } : value,
      )
      return false
    } else {
      return true
    }
  }
}

function assert (typeCheckNames, value) {
  if (!isArray(typeCheckNames))
    typeCheckNames = [typeCheckNames]
  const pass = typeCheckNames.some((tCN) => typeChecks[tCN](value))
  if (!pass) {
    console.error(
      'Bad Type',
      typeCheckNames.join(' || '),
      isIterable(value) ? { ...value } : value,
    )
    throw new Error('assertion failed')
  }
  return value
}

function validator (...params) {
  console.warn('validator deprecated')
  return assert(...params)
}

export {
  getValidator,
  assert,
  validator,
  isArray,
  isBoolean,
  isDate,
  isDateMs,
  isEmptyString,
  isEntries,
  isEntry,
  isFalse,
  isFunction,
  isInteger,
  isItem,
  isItems,
  isIterable,
  isMidnightUtc,
  isMidnightUtcMs,
  isNewProject,
  isNewTag,
  isNull,
  isProject,
  isTag,
  isUndefined,
  isUser,
  isValidState,
  isString
}
