const { default: DatePicker } = require('vue2-datepicker')
const check = require('check-types')
const { reduce, state } = require('../../store')
const { default: TagSelector } = require('../TagSelector')
// const {
//   queries: {
//     TagPartialQ
//   }
// } = require('../../apollo')
// const {
//   stringOps: {
//     replaceCursorSegmentCommaSep,
//     getCursorSegmentCommaSep,
//     asTagsString
//   }
// } = require('../../lib')

const ReportFilters = {
  components: {
    DatePicker,
    TagSelector
  },
  data () {
    const {
      filters: { dateFrom, dateTo, tags }
    } = state
    return {
      state,
      dateRange: [dateFrom, dateTo],
      tags: [...tags]
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
      this.tags = [...this.state.filters.tags]
    }
  },
  methods: {
    tagAddHandler (tag) {
      this.tags.push(tag)
    },
    tagRemoveHandler (tag) {
      const idx = this.tags.findIndex((t) => t.id === tag.id)
      check.assert.greater(idx, -1)
      this.tags.splice(idx, 1)
    },
    // clickSuggestion (tagId) {
    //   this.selectSuggestion(tagId)
    // },
    // selectSuggestion (tagId) {
    //   const tag = this.suggestions.find((s) => s.id === tagId)
    //   this.$data.suggestions = []
    //   const input = this.$el.querySelector('input.tags')
    //   const {
    //     selectionStart: cursor
    //   } = input
    //   const {
    //     tagsString
    //   } = this
    //   const replaced = [
    //     replaceCursorSegmentCommaSep(tagsString, cursor, tag.tag),
    //     cursor === tagsString.length ? ', ' : ''
    //   ].join('')
    //   this.tagsString = replaced
    //   input.focus()
    //   input.setSelectionRange(replaced.length, replaced.length)
    // },
    // tagsKeydown (event) {
    //   if (event.keyCode !== 9)
    //     return
    //   event.preventDefault()
    //   this.selectSuggestion(this.suggestions[0].id)
    // },
    // async tagsInput ({ target }) {
    //   const {
    //     selectionStart: cursor
    //   } = target
    //   const {
    //     tagsString
    //   } = this
    //   const tagPartial = getCursorSegmentCommaSep(tagsString, cursor)
    //   if (tagPartial.length < 3)
    //     return
    //   const result = await this.$apollo.query({
    //     query: TagPartialQ,
    //     variables: {
    //       tagPartial
    //     }
    //   })
    //   const {
    //     data: {
    //       TagPartialQ: suggestions
    //     }
    //   } = result
    //
    //   this.$data.suggestions = suggestions
    // },
    apply () {
      const {
        dateRange: [dateFrom, dateTo],
        tags
      } = this
      reduce({
        FILTER_DATE_FROM: { dateFrom },
        FILTER_DATE_TO: { dateTo },
        FILTER_TAGS_REPLACE: { tags }
      })
    }
  }
}

module.exports = ReportFilters
