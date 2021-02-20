const test = require('ava')

const {
  state,
  reduce
} = require('../../src/store')

test.serial('filterTagsReplace 1', (t) => {
  state.filters.tags = ['originalTag']
  const tagsString = 'dummyTag'
  reduce({ FILTER_TAGS_REPLACE: { tagsString } })
  t.deepEqual(state.filters.tags, ['dummyTag'])
})
test.serial('filterTagsReplace 2', (t) => {
  state.filters.tags = ['originalTag']
  const tagsString = 'dummyTag, otherTag'
  reduce({ FILTER_TAGS_REPLACE: { tagsString } })
  t.deepEqual(state.filters.tags, ['dummyTag', 'otherTag'])
})
test.serial('filterTagsReplace 3', (t) => {
  state.filters.tags = ['originalTag']
  const tagsString = 'dummyTag,otherTag'
  reduce({ FILTER_TAGS_REPLACE: { tagsString } })
  t.deepEqual(state.filters.tags, ['dummyTag', 'otherTag'])
})
test.serial('filterTagsReplace 4', (t) => {
  state.filters.tags = ['originalTag']
  const tagsString = 'dummyTag, otherTag, '
  reduce({ FILTER_TAGS_REPLACE: { tagsString } })
  t.deepEqual(state.filters.tags, ['dummyTag', 'otherTag'])
})
test.serial('filterTagsReplace 5', (t) => {
  state.filters.tags = ['originalTag']
  const tagsString = ''
  reduce({ FILTER_TAGS_REPLACE: { tagsString } })
  t.deepEqual(state.filters.tags, [])
})
test.serial('filterTagsReplace 6', (t) => {
  state.filters.tags = ['originalTag']
  const tagsString = ['dummyTag']
  t.throws(
    () => {
      reduce({ FILTER_TAGS_REPLACE: { tagsString } })
    },
    {
      instanceOf: RangeError
    }
  )
})
