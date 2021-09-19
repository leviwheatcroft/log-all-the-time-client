import {
  assert
} from '../lib/types'
import {
  midnightUtc
} from '../lib/dates'

export const state = () => ({
  dateFrom: midnightUtc(new Date()),
  dateTo: midnightUtc(new Date()),
  project: null,
  tags: [],
  users: []
})

export const mutations = {
  tagsAppend (state, tag) {
    assert('isTag', tag)
    state.tags.push(tag)
  },
  tagsReplace (state, tags) {
    tags.every((t) => assert('isTag', t))
    state.tags = tags
  },
  usersAppend (state, user) {
    assert('isUser', user)
    state.users.push(user)
  },
  usersReplace (state, users) {
    users.every((u) => assert('isUser', u))
    state.users = users
  },
  dateFrom (state, dateFrom) {
    assert(['isNull', 'isDate'], dateFrom)
    state.dateFrom = dateFrom
  },
  dateTo (state, dateTo) {
    assert(['isNull', 'isDate'], dateTo)
    state.dateTo = dateTo
  },
  project (state, project) {
    assert('isProject', project)
    state.project = project
  }
}
