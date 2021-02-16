const dayjs = require('dayjs')
const CustomParseFormat = require('dayjs/plugin/customParseFormat')
const { MultiDateError } = require('../../error')

dayjs.extend(CustomParseFormat)

function scrapeDate (entry) {
  const {
    raw
  } = entry
  let {
    description
  } = entry

  const regExp = / ?(\d{2}[/.-]\d{2}[/.-]\d{2,4}) ?/g

  const result = regExp.exec(raw)

  if (!result)
    return

  // validation
  if (regExp.exec(raw))
    throw new MultiDateError('Entries can only have one date')

  regExp.lastIndex = 0

  description = description.replace(regExp, '')

  const formats = [
    'DD/MM/YY',
    'DD/MM/YYYY',
    'DD.MM.YY',
    'DD.MM.YYYY',
    'DD-MM-YY',
    'DD-MM-YYYY'
  ]
  entry.description = description
  entry.date = dayjs(result[1], formats).toDate()
}

module.exports = { scrapeDate }
