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