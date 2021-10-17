import { gql } from 'graphql-tag'
import {
  ProjectPartialQ
} from '../../../apollo/queries'
import {
  ProjectUpdateM
} from '../../../apollo/mutations'

const Projects = {
  apollo: {
    projects: {
      query: ProjectPartialQ,
      variables () {
        const {
          projectPartial
        } = this
        return {
          limit: 24,
          offset: 0,
          projectPartial
        }
      },
      update ({ ProjectPartialQ: { docs, hasMore } }) {
        this.hasMore = hasMore
        return docs
      },
    }
  },
  data () {
    return {
      projectPartial: ''
    }
  },
  methods: {
    async toggleArchived (project) {
      const {
        id,
        name,
        archived
      } = project
      await this.$apollo.mutate({
        mutation: ProjectUpdateM,
        variables: {
          project: {
            id,
            name,
            archived: !archived
          }
        },
        update: (store, ctx) => {
          const {
            data: {
              ProjectUpdateM: updatedProject
            }
          } = ctx
          store.writeFragment({
            id: `Project:${project.id}`,
            fragment: gql`
              fragment UpdatedProject on Project {
                id
                name
                archived
              }
            `,
            data: updatedProject
          })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          ProjectUpdateM: {
            __typename: 'Project',
            ...project,
            archived: !project.archived
          }
        }
      })
    }
  }
}

export default Projects
