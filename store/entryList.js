import {
  assert
} from '../lib/types'

export const state = () => ({
  fieldsToggle: {
    date: true,
    description: true,
    duration: true,
    project: true,
    tags: true,
    user: true
  }
})

export const mutations = {
  fieldsSet (state, fields) {
    Object.entries(fields).forEach(([key, value]) => {
      assert('isEntryListField', key)
      assert('isBoolean', value)
      state.fieldsToggle[key] = value
    })
  }
}
