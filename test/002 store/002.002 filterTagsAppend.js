const test = require('ava')

const {
  state,
  reduce
} = require('../../src/store')

test.beforeEach(() => {
  state.filters.tags = []
})

test.serial('filterTagsAppend 1', (t) => {
  const tagString = 'dummyTag'
  reduce({ FILTER_TAGS_APPEND: { tagString } })
  t.deepEqual(state.filters.tags, ['dummyTag'])
})
test.serial('filterTagsAppend 2', (t) => {
  const tagString = 'dummyTag'
  reduce({ FILTER_TAGS_APPEND: { tagString } })
  reduce({ FILTER_TAGS_APPEND: { tagString } })
  t.deepEqual(state.filters.tags, ['dummyTag', 'dummyTag'])
})
test.serial('filterTagsAppend 3', (t) => {
  const tagString = ['dummyTag']
  t.throws(
    () => {
      reduce({ FILTER_TAGS_APPEND: { tagString } })
    },
    {
      instanceOf: RangeError
    }
  )
})
