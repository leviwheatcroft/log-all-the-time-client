const { default: DatePicker } = require('vue2-datepicker')
const { reduce, state } = require('../../store')
const {
  queries: {
    TagPartialQ
  }
} = require('../../apollo')
const {
  stringOps: {
    replaceCursorSegmentCommaSep,
    getCursorSegmentCommaSep,
    asTagsString
  }
} = require('../../lib')

const ReportFilters = {
  components: {
    DatePicker
  },
  data () {
    const {
      filters: { dateFrom, dateTo, tags }
    } = state
    return {
      state,
      dateRange: [dateFrom, dateTo],
      tagsString: asTagsString(tags),
      suggestions: []
    }
  },
  watch: {
    'state.filters.dateFrom': function stateFiltersDateFrom () {
      this.dateRange.splice(0, 1, this.state.filters.dateFrom)
    },
    'state.filters.dateTo': function stateFiltersDateTo () {
      this.dateRange.splice(1, 1, this.state.filters.dateTo)
    },
    'state.filters.tags': function stateFiltersTags () {
      this.tagsString = asTagsString(this.state.filters.tags)
    }
  },
  methods: {
    clickSuggestion (tagId) {
      this.selectSuggestion(tagId)
    },
    selectSuggestion (tagId) {
      const tag = this.suggestions.find((s) => s.id === tagId)
      this.$data.suggestions = []
      const input = this.$el.querySelector('input.tags')
      const {
        selectionStart: cursor
      } = input
      const {
        tagsString
      } = this
      const replaced = [
        replaceCursorSegmentCommaSep(tagsString, cursor, tag.tag),
        cursor === tagsString.length ? ', ' : ''
      ].join('')
      this.tagsString = replaced
    },
    tagsKeydown (event) {
      if (event.keyCode !== 9)
        return
      event.preventDefault()
      this.selectSuggestion(this.suggestions[0].id)
    },
    async tagsInput ({ target }) {
      const {
        selectionStart: cursor
      } = target
      const {
        tagsString
      } = this
      const tagPartial = getCursorSegmentCommaSep(tagsString, cursor)
      if (tagPartial.length < 3)
        return
      const result = await this.$apollo.query({
        query: TagPartialQ,
        variables: {
          tagPartial
        }
      })
      const {
        data: {
          TagPartialQ: suggestions
        }
      } = result

      this.$data.suggestions = suggestions
    },
    apply () {
      const {
        dateRange: [dateFrom, dateTo]
      } = this
      const tagsString = this.$el.querySelector('input.tags').value
      reduce({
        FILTER_DATE_FROM: { dateFrom },
        FILTER_DATE_TO: { dateTo },
        FILTER_TAGS_REPLACE: { tagsString }
      })
    }
  }
}

module.exports = ReportFilters
