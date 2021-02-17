function scrapeDuration (entry) {
  const formats = [
    {
      // example: "1h" or "123h"
      regExp: /(?:^|\s)(\d+)h(?:$|\s)/,
      parse: ([_, n]) => Number.parseInt(n, 10) * 60
    },
    {
      // example: "1.5h" or "123.45h"
      regExp: /(?:^|\s)(\d+\.\d*)h(?:$|\s)/,
      parse: ([_, n]) => Number.parseFloat(n, 10) * 60
    },
    {
      // example: "1h" or "123h"
      regExp: /(?:^|\s)(\d+)m(?:$|\s)/,
      parse: ([_, n]) => Number.parseInt(n, 10)
    }
  ]

  const {
    raw
  } = entry
  let {
    description
  } = entry

  let duration = 0
  formats.forEach((format) => {
    const match = format.regExp.exec(raw)
    if (!match)
      return
    duration += format.parse(match)
    description = description.replace(format.regExp, ' ')
  })

  entry.duration = duration
  entry.description = description
}

module.exports = { scrapeDuration }
