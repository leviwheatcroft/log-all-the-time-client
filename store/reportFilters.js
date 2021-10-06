import {
  assert
} from '../lib/types'

export const state = () => {
  const dateRange = [null, null]
  const projects = []
  const tags = []
  const users = []
  return {
    dateRange,
    projects,
    tags,
    users,
  }
}

export const mutations = {
  apply (state, reportFilters) {
    const {
      dateRange,
      // projects,
      // tags,
      // users
    } = reportFilters

    assert('isMidnightUtcMsRange', dateRange)
    state.dateRange = dateRange

    // projects.forEach((p) => assert('isProject', p))
    // state.projects = projects
    //
    // tags.forEach((t) => assert('isTag', t))
    // state.tags = tags
    //
    // users.forEach((u) => assert('isUser', u))
    // state.users = users
  }
}
