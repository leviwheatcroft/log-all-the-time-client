
function scrapeTags (entry) {
  const regExps = [
    /\s?#(\S*)/g,
    /\s?\((.*?)\)\s?/g
  ]

  const {
    raw
  } = entry
  let {
    description
  } = entry

  const tags = []

  regExps.forEach((re) => {
    description = description.replace(re, '')
    let match
    // eslint-disable-next-line no-cond-assign
    while ((match = re.exec(raw)) !== null)
      tags.push(match[1])
  })

  entry.description = description
  entry.tags = tags
}

module.exports = { scrapeTags }
