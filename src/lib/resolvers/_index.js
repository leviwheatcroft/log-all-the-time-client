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

module.exports = {
  resolvers
}
