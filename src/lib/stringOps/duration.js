const regExps = [
  {
    // strings like:
    // 30m 45m 90m
    regExp: /^(\d{1,3})m$/,
    parser (match) {
      return parseInt(match[1], 10)
    }
  },
  {
    // strings like:
    // 1h 10h
    regExp: /^(\d{1,2})h$/,
    parser (match) {
      return parseInt(match[1], 10) * 60
    }
  },
  {
    // strings like:
    // 1.1h 10.25h 0.25h
    regExp: /^(\d{0,2}\.\d{1,2})h$/,
    parser (match) {
      return parseFloat(match[1]) * 60
    }
  },
  {
    // strings like:
    // 1.1 10.25 0.25
    regExp: /^(\d{0,2}\.\d{1,2})$/,
    parser (match) {
      return parseFloat(match[1]) * 60
    }
  }
]

function parseHumanDuration (humanDurationString) {
  let parsed
  regExps.some(({ regExp, parser }) => {
    const match = regExp.exec(humanDurationString)
    if (match)
      parsed = parser(match)
    return match
  })
  return parsed
}

function durationAsHHMM (duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}:${`0${minutes}`.slice(-2)}`
}

function durationFromHHMM (HHMM) {
  const regExp = /^(\d{1,3}):(\d{2})$/
  const match = regExp.exec(HHMM)
  if (!match)
    throw new RangeError('HHMM doesn\'t match HH:MM format')
  const duration = (parseInt(match[1], 10) * 60) + parseInt(match[2], 10)
  return duration
}

module.exports = {
  parseHumanDuration,
  durationAsHHMM,
  durationFromHHMM
}
