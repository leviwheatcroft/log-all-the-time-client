const { default: DatePicker } = require('vue2-datepicker')
const { default: TagSelector } = require('../TagSelector')
const {
  mutations: {
    EntryUpdateM
  },
  queries: {
    EntryQ
  }
} = require('../../apollo')
const {
  types: {
    isEntry,
    isTag
  }
} = require('../../lib')

const { resolvers: { resolve } } = require('../../lib')

const EntryInput = {
  components: {
    TagSelector,
    DatePicker
  },
  data () {
    const {
      id,
      date,
      duration,
      description,
      tags
    } = this.entry
    return {
      id,
      date,
      duration,
      description,
      tags
    }
  },
  props: {
    entry: {
      required: false,
      type: Object,
      validator (entry) {
        if (!entry)
          return
        return isEntry(entry)
      }
    }
  },
  methods: {
    tagAddHandler (tag) {
      if (!isTag(tag))
        throw new TypeError('tag is not tag')
      this.tags.push(tag)
    },
    tagRemoveHandler (tag) {
      if (!isTag(tag))
        throw new TypeError('tag is not tag')
      const idx = this.tags.findIndex((t) => t.id === tag.id)
      if (idx === -1)
        throw new RangeError('tag not in tags')
      this.tags.splice(idx, 1)
    },
    async submit () {
      const entry = resolve({
        id: this.entry.id,
        date: null,
        timeStart: null,
        timeEnd: null,
        duration: null,
        tags: [],
        raw: this.$data.raw,
        description: this.$data.raw
      })
      this.$emit('submit')
      await this.$apollo.mutate({
        mutation: EntryUpdateM,
        variables: {
          entry
        },
        update: (store, ctx) => {
          const {
            data: {
              EntryUpdateM: result
            }
          } = ctx

          const data = store.readQuery({ query: EntryQ })
          const idx = data.EntryQ.findIndex((c) => c.id === result.id)
          this.$set(data.EntryQ, idx, result)

          store.writeQuery({ query: EntryQ, data })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          EntryUpdateM: {
            __typename: 'Entry',
            ...entry,
            tags: entry.tags.map((tag) => ({
              __typename: 'Tag',
              id: -1,
              tag
            }))
          }
        }
      })
    }
  }
}

module.exports = EntryInput
