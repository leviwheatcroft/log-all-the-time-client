import lex from 'pug-lexer'
// import purgecssFromJs from 'purgecss-from-js'

const purgecssFromPug = (content) => {
  // see:
  // https://github.com/pugjs/pug-lexer/blob/master/test/cases/classes.expected.json
  // for an example of what the lexer return structure looks like
  // see:
  // https://purgecss.com/extractors.html#creating-an-extractor
  // for details about extractors, as well as some examples.
  const tokens = lex(content)
  const selectors = []
  for (const token of tokens) {
    if (token.type === 'class')
      selectors.push(...token.val.split(' '))
    else if (
      token.type === 'attribute' &&
      (
        token.name === 'class' ||
        token.name === ':class' ||
        token.name === 'extraClasses' ||
        token.name === ':extraClasses' ||
        token.name === 'id'
      )
    )
      selectors.push(...(token.val.match(/[\w-/:]+(?<!:)/g) || []))
  }
  return selectors
}

export default {
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [],
  purge: {
    // defaultExtractor: content => content.match(/(?!:)[\w-/:]+(?<!:)/g) || [],
    options: {
      extractors: [
        {
          extractor: purgecssFromPug,
          extensions: ['pug']
        },
        // doesn't work. See:
        // https://github.com/FullHuman/purgecss-from-js/issues/7
        // use safelist instead
        // {
        //   extractor: purgecssFromJs,
        //   extensions: ['js']
        // }
      ]
    },
    safelist: [
      'icon',
      'inline',
      'mx-4',
      'pb-2',
      'border-b-2',
      'border-gray-800',
      'danger',
      'text-left',
      'w-20',
      'rounded',
      'whitespace-nowrap',
      'm-2',
      'p-2',
      'min-content',
      'background-blue'
    ],

    content: [
      'components/**/*.{vue,js,pug}',
      'layouts/**/*.{vue,js,pug}',
      'pages/**/*.{vue,js,pug}',
      'plugins/**/*.js',
      '/nuxt.config.js'
    ]
  }
}

// export default ({ rootDir, srcDir }) => {
//   return {
//     theme: {
//       extend: {}
//     },
//     variants: {
//       extend: {}
//     },
//     plugins: [],
//     purge: {
//       // defaultExtractor: content => content.match(/(?!:)[\w-/:]+(?<!:)/g) || [],
//       extractors: [
//         {
//           extractor: purgeFromPug,
//           extensions: ['pug']
//         }
//       ],
//       content: [
//         `${srcDir}/components/**/*.{vue,js,pug}`,
//         `${srcDir}/layouts/**/*.{vue,js,pug}`,
//         `${srcDir}/pages/**/*.{vue,js,pug}`,
//         `${srcDir}/plugins/**/*.js`,
//         `${rootDir}/nuxt.config.js`
//       ]
//     }
//   }
// }
