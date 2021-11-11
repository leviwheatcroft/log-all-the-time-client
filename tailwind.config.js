import lex from 'pug-lexer'
import purgecssFromJs from 'purgecss-from-js'

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
        {
          extractor: purgecssFromJs,
          extensions: ['js']
        }
      ]
    },
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
