import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'

dayjs.extend(customParseFormat)
dayjs.extend(duration)

function plugin (_, inject) {
  inject('dayjs', dayjs)
}

export default plugin
