<template lang="pug">
  .index
    report-filters(
      :filters="filters"
      @updateFilters="filters = $event"
    )
    entry-list(
      :entries="entries"
      :fetchMoreEntries="fetchMoreEntries"
      :fieldsToggleBoundaries="fieldsToggleBoundaries"
      :loading="loading"
    )
</template>

<script>
import {
  EntryFilterQ
} from '../apollo/queries'

const PageReport = {
  apollo: {
    entries: {
      query: EntryFilterQ,
      variables () {
        const limit = 24
        const offset = 0
        const {
          dateRange: [dateFrom, dateTo],
          tags,
          projects,
          users
        } = this.filters
        return {
          dateFrom,
          dateTo,
          tags,
          projects,
          users,
          limit,
          offset
        }
      },
      nextFetchPolicy: 'cache-only',
      update ({ EntryFilterQ: { docs, hasMore } }) {
        this.hasMore = hasMore
        return docs
      }
    }
  },
  data () {
    return {
      filters: {
        dateRange: [null, null],
        order: { createdAt: 'desc' },
        tags: [],
        projects: [],
        users: []
      },
      fieldsToggleBoundaries: {
        date: null,
        description: true,
        duration: null,
        project: null,
        tags: null,
        user: null
      },
      entries: [],
      loading: 0,
      hasMore: true
    }
  },
  methods: {
    fetchMoreEntries () {
      if (this.loading)
        return
      if (!this.hasMore)
        return
      const variables = {
        ...this.filters,
        offset: this.entries.length,
        limit: 24
      }
      this.$apollo.queries.entries.fetchMore({
        variables
      })
    }
  }
}

export default PageReport
</script>
