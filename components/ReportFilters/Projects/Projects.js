import {
  assert
} from '../../../lib/types'
import {
  classes
} from '../../../componentMixins'

const Project = {
  data () {
    const {
      projects
    } = this.$store.state.reportFilters

    return {
      projects
    }
  },
  methods: {
    projectAddHandler (project) {
      assert('isProject', project)
      this.projects.push(project)
    },
    projectRemoveHandler (project) {
      assert('isProject', project)
      const idx = this.projects.findIndex((t) => t.id === project.id)
      this.projects.splice(idx, 1)
    },
    getValue () {
      return this.projects
    }
  },
  mixins: [classes],
  props: {}
}

export default Project
