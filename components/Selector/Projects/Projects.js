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
        variables: { projectPartial }
      })
      const { data: { ProjectPartialQ: projectSuggestions } } = result
      return projectSuggestions
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
