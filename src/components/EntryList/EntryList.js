const _throttle = require('lodash/throttle')
const { default: EntryListItem } = require('./EntryListItem')
const { default: Fields } = require('./Fields')
const { state } = require('../../store')
const {
  IconLoader,
  IconMeh
} = require('../../icons')
const {
  types: {
    isEntries
  }
} = require('../../lib')

const EntryList = {
  components: {
    EntryListItem,
    Fields,
    IconLoader,
    IconMeh
  },
  data () {
    return {
      stateFieldsToggle: state.entryList.fieldsToggle
    }
  },
  computed: {
    fieldsToggle () {
      const fieldsToggle = Object.fromEntries(
        Object.entries(this.stateFieldsToggle).map(([key, value]) => {
          const boundary = this.fieldsToggleBoundaries[key]
          return boundary === null ? [key, value] : [key, boundary]
        })
      )
      return fieldsToggle
    }
  },
  methods: {
    onResize: _throttle(function onResize () {
      this.viewportHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      )
    }, 250),
    onScroll: _throttle(function onScroll () {
      if (this.loading)
        return
      const {
        bottom
      } = this.$el.getBoundingClientRect()
      // console.log(`bottom: ${bottom}, vpHeight: ${this.viewportHeight}`)
      if ((bottom - this.viewportHeight) < this.viewportHeight)
        this.fetchMoreEntries()
    }, 250)
  },
  props: {
    entries: {
      // entries is an apollo query result, will be undefined if query has
      // not yet run
      required: false,
      type: Array,
      validator (entries) {
        console.assert(
          isEntries(entries),
          { entries, msg: 'entries is not entries' }
        )
        return true
      }
    },
    clickTagHandler: {
      required: true,
      type: Function
    },
    clickDateHandler: {
      required: true,
      type: Function
    },
    clickUserHandler: {
      required: false,
      type: Function
    },
    fieldsToggleBoundaries: {
      required: true,
      type: Object
    },
    fetchMoreEntries: {
      required: false,
      type: Function
    },
    loading: {
      required: false,
      type: Number
    }
  },
  updated () {
    // this.$nextTick(this.onResize.bind(this))
  },
  mounted () {
    const vm = this
    this.onResize()
    document.addEventListener(
      'scroll',
      vm.onScroll
    )
    window.addEventListener('resize', vm.onResize.bind(vm))
  }
}

module.exports = EntryList
