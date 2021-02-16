const { MultiDateError } = require('../../error')

function scrapeDate (entry) {
  const {
    raw
  } = entry

  const regExp = / ?(\d{2}[/.-]\d{2}[/.-]\d{2,4}) ?/g

  const result = regExp.exec(raw)

  if (!result)
    return

  // validation
  if (regExp.exec(raw))
    throw new MultiDateError('Entries can only have one date')

  entry.date = new Date(result[1])
}

module.exports = { scrapeDate }
