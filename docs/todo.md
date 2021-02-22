## [ ] export css in prodn

export css to separate file

https://vue-loader.vuejs.org/guide/extract-css.html#webpack-4

## [ ] css-loader support

presently webpack includes a workaround...

```
{
  test: /\.css$/,
  use: [
    'vue-style-loader',
    {
      loader: 'css-loader',
      options: {
        esModule: false
      }
    }
  ]
}
```

https://github.com/vuejs/vue-style-loader/issues/50

## [ ] auth

 - [ ] redirect to /login if not logged in
 - [ ] show notification if not logged in due to refresh token expiry

## [ ] dateLocales

see dateLocales.md

## [ ] EntryNew Recent Tags

getting recent entries

```
computed: {
  recentTags () {
    // TODO how often does this run?
    console.log('compute recentTags')
    const { cache } = this.$apollo.getClient()
    const { EntryQ: entries } = cache.readQuery({ query: EntryQ })
    const recentTags = []
    entries.some((entry) => {
      entry.tags.some((t) => {
        if (recentTags.findIndex((_t) => t.tag === _t.tag) === -1)
          recentTags.push(t)
        if (recentTags.length === 6)
          return true
        return false
      })
      if (recentTags.length === 6)
        return true
      return false
    })
    return recentTags
  }
},
```


## [ ] EntryNew Sticky Tags
