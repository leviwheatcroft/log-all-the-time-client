const test = require('ava')

const {
  state,
  reduce
} = require('../../src/store')

test.serial('filterTagsReplace 1', (t) => {
  state.filters.tags = [{
    id: '',
    tagName: 'testTag1'
  }]
  const tags = [{
    id: '',
    tagName: 'testTag2'
  }]
  reduce({ FILTER_TAGS_REPLACE: { tags } })
  t.deepEqual(state.filters.tags, tags)
})
test.serial('filterTagsReplace 6', (t) => {
  state.filters.tags = [{
    id: '',
    tagName: 'testTag1'
  }]
  const tags = [{
    tagName: 'testTag2'
  }]
  t.throws(
    () => {
      reduce({ FILTER_TAGS_REPLACE: { tags } })
    },
    {
      instanceOf: TypeError
    }
  )
})
