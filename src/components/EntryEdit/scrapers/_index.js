const { scrapeDate } = require('./scrapeDate')
const { scrapeDuration } = require('./scrapeDuration')
const { scrapeTags } = require('./scrapeTags')
const { scrapeTime } = require('./scrapeTime')

const scrapers = [
  scrapeDate,
  scrapeDuration,
  scrapeTags,
  scrapeTime
]

module.exports = {
  scrapers
}
