import _throttle from 'lodash/throttle'
import {
  isProject,
  isNewProject,
  isFalse
} from '../../../lib/types'
import {
  ProjectPartialQ
} from '../../../apollo/queries'

const Project = {
  data () {
    return {
      itemPartial: '',
      itemSuggestions: []
    }
  },
  computed: {
    selectedItems () {
      return this.project ? [this.project] : []
    }
  },
  methods: {
    inputItemPartialHandler (itemPartial) {
      this.itemPartial = itemPartial

      const {
        itemSuggestions,
        lastItemPartial,
        loading
      } = this

      // don't send if we don't have enough text to generate meaningful results
      if (itemPartial.length < 3)
        return

      // don't send if there's already a query in flight
      if (loading)
        return

      // send if we haven't done the query at least once since reset
      if (!lastItemPartial)
        return this.itemSuggestionsQuery()

      // send if we have any suggests from the last query
      // even if there's only one remaining suggestion, we still need to query
      // again in case the additional text excludes the one suggestion we have
      if (itemSuggestions.length)
        return this.itemSuggestionsQuery()

      // send if the tagPartial sent with the last query is not included
      // in the current tagPartial. This accounts for deleting text.
      if (!itemPartial.includes(lastItemPartial))
        return this.itemSuggestionsQuery()
    },
    // itemSuggestionsQuery can't be included as an apollo smartQuery from
    // vue-apollo because we need to micro-manage whether the query will be
    // sent, and the skip() functionality doesn't work for this use case
    itemSuggestionsQuery: _throttle(async function itemSuggestionsQuery () {
      this.lastItemPartial = this.itemPartial
      this.loading += 1
      const result = await this.$apollo.query({
        query: ProjectPartialQ,
        loadingKey: 'loading',
        variables: { projectPartial: this.itemPartial }
      })
      let { data: { ProjectPartialQ: itemSuggestions } } = result
      itemSuggestions = itemSuggestions.map((i) => {
        return {
          ...i,
          itemName: i.projectName
        }
      })
      this.itemSuggestions = itemSuggestions
      this.loading -= 1
    }, 500),
    resetHandler () {}
  },
  mounted () {
    // eslint-disable-next-line
    console.log(this.inputTabindex)
  },
  props: {
    project: {
      required: true,
      validator (project) {
        console.assert(
          isProject(project) || isNewProject(project) || isFalse(project),
          'project is not isProject or isNewProject'
        )
        return true
      }
    },
    projectAddHandler: {
      required: true,
      type: Function
    },
    projectRemoveHandler: {
      required: true,
      type: Function
    },
    inputTabindex: {
      required: true,
      type: Number
    }
  }
}

export default Project
