const { date } = require('./date')
const { duration } = require('./duration')
const { tags } = require('./tags')
const { time } = require('./time')
const { whitespace } = require('./whitespace')

const resolvers = [
  date,
  duration,
  tags,
  time,
  whitespace
]

function resolve (entry = '') {
  if (typeof entry === 'string')
    entry = { raw: entry, description: entry }
  resolvers.forEach((resolver) => {
    try {
      resolver(entry)
    } catch (err) {
      if (err.code === 'VALIDATION_ERROR')
        console.log('validation error')
      else
        throw err
    }
  })
  return entry
}

module.exports = {
  resolvers,
  resolve
}
