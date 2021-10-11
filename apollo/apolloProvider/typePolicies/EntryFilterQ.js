const {
  sortBefore
} = require('../../../lib')

const EntryFilterQ = {
  keyArgs: [
    'sort',
    'dateFrom',
    'dateTo',
    'projects',
    'tags',
    'users'
  ],
  merge (existing, incoming, ctx) {
    // this fn does need to be aware of sort order, but does not need to sort
    // everything every time.
    // the only case in which an entry should be prepended to docs is in the
    // case of a new entry, where incoming.docs.length will always be 1
    // of course, incoming.docs.length will also be 1 if theres only 1 doc
    // in the page
    // so in cases where incoming.docs.length is 1 we just need to decide
    // to prepend or append it to existing docs
    // in all other cases incoming docs can be appended

    const {
      variables: { sort },
      readField
    } = ctx

    if (!existing)
      return incoming

    let { hasMore } = existing
    if (incoming.hasMore !== undefined)
      hasMore = incoming.hasMore

    let prepend = false
    if (
      existing.docs.length > 0 && // don't bother if there's no existing docs
      incoming.docs.length === 1 // only when single doc from mutation
    ) {
      // annoyingly, docs are just references at this time, so you need
      // to extract the fields we need
      const incomingDoc = {
        createdAt: readField('createdAt', incoming.docs[0]),
        date: readField('date', incoming.docs[0])
      }
      const firstExistingDoc = {
        createdAt: readField('createdAt', existing.docs[0]),
        date: readField('date', existing.docs[0])
      }
      prepend = sortBefore(incomingDoc, firstExistingDoc, sort)
    }
    const docs = [
      ...prepend ? incoming.docs : [],
      ...existing.docs,
      ...!prepend ? incoming.docs : []
    ]

    const cache = {
      ...incoming,
      docs,
      hasMore
    }

    return cache
  }
}

module.exports = {
  EntryFilterQ
}
