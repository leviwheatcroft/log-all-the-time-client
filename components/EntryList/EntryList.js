import _throttle from 'lodash/throttle'
import {
  assert
} from '../../lib/types'

const EntryList = {
  computed: {
    fieldsToggle () {
      return Object.fromEntries(
        Object.entries(this.$state.entryList.fieldsToggle)
          .map(([key, value]) => {
            const boundary = this.fieldsToggleBoundaries[key]
            return boundary === null ? [key, value] : [key, boundary]
          })
      )
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
      validator (entries) { return assert('isEntries', entries) }
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

export default EntryList
