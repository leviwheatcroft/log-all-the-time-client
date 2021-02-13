const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './index.js',
  target: 'web',
  output: {
    filename: 'timelog.js'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'raw-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'assets' }]
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      // jquery: 'jquery/src/jquery'
    },
    extensions: ['.js', '.less', '.html', '.vue', '.gql'],
    mainFiles: ['index', '_index']
  }
}
