const { scrapeDate } = require('./scrapeDate')
const { scrapeDuration } = require('./scrapeDuration')
const { scrapeTags } = require('./scrapeTags')
const { scrapeTime } = require('./scrapeTime')
const { whitespace } = require('./whitespace')

const scrapers = [
  scrapeDate,
  scrapeDuration,
  scrapeTags,
  scrapeTime,
  whitespace
]

module.exports = {
  scrapers
}
