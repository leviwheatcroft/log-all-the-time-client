const test = require('ava')

const {
  state,
  reduce
} = require('../../src/store')

test.beforeEach(() => {
  state.filters.tags = []
})

test.serial('filterTagsAppend 1', (t) => {
  const tag = {
    id: '',
    tagName: 'testTag'
  }
  reduce({ FILTER_TAGS_APPEND: { tag } })
  t.deepEqual(state.filters.tags, [tag])
})
test.serial('filterTagsAppend 2', (t) => {
  const tag = {
    id: '',
    tagName: 'dummyTag'
  }
  reduce({ FILTER_TAGS_APPEND: { tag } })
  reduce({ FILTER_TAGS_APPEND: { tag } })
  t.deepEqual(state.filters.tags, [tag, tag])
})
test.serial('filterTagsAppend 3', (t) => {
  const tag = {
    tagName: 'testTag'
  }
  t.throws(
    () => {
      reduce({ FILTER_TAGS_APPEND: { tag } })
    },
    {
      instanceOf: TypeError
    }
  )
})
