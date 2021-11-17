import {
  ProjectPartialQ
} from '../../../apollo/queries'
import {
  classes
} from '../../../componentMixins'

const Project = {
  methods: {
    async projectsQuery (projectPartial) {
      const result = await this.$apollo.query({
        query: ProjectPartialQ,
        fetchPolicy: 'no-cache',
        variables: {
          projectPartial,
          limit: 12,
          includeArchived: false
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
