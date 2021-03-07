const {
  types: {
    isBoolean
  }
} = require('../../lib')

function fieldsSet (payload, state) {
  const {
    type,
    data: { fields }
  } = payload
  if (type !== 'ENTRY_LIST_FIELDS_SET')
    return
  Object.entries(fields).forEach(([key, value]) => {
    console.assert(
      key === 'date' ||
      key === 'duration' ||
      key === 'description' ||
      key === 'tags' ||
      key === 'user',
      {
        key,
        message: 'key is not: date, duration, description, tags, or user'
      }
    )
    console.assert(
      isBoolean(value),
      {
        value,
        message: 'value is not boolean'
      }
    )
    state.entryList.fieldsToggle[key] = value
  })
}

module.exports = {
  fieldsSet
}
