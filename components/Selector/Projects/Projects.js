import {
  ProjectPartialQ
} from '../../../apollo/queries'
import {
  classes
} from '../../../componentMixins'

const Project = {
  data () {
    return {
      cacheBust: 0
    }
  },
  methods: {
    async projectsQuery (projectPartial) {
      this.cacheBust += 1
      const result = await this.$apollo.query({
        query: ProjectPartialQ,
        // fetchPolicy doesn't work
        // fetchPolicy: 'network-only',
        variables: {
          projectPartial,
          limit: 12,
          includeArchived: false,
          cacheBust: this.cacheBust
        }
      })
      const { data: { ProjectPartialQ: { docs: projectSuggestions } } } = result
      return projectSuggestions.map(({ id, name }) => ({ id, name }))
    }
  },
  mixins: [classes],
  props: {
    allowNewItem: {
      required: true,
      type: Boolean
    },
    isMultiItem: {
      required: true,
      type: Boolean
    },
    items: {
      required: true,
    },
    inputTabindex: {
      required: true,
      type: Number
    }
  }
}

export default Project
