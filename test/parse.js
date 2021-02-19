const {
  readFile,
  writeFile
} = require('fs').promises

const {
  resolvers: { resolve }
} = require('../src/lib')

async function parse () {
  const raw = await readFile('./entries.txt')
  const lines = raw.toString().split(/\n/)
  const resolved = lines.map((line) => {
    if (line.length === 0)
      return
    return JSON.stringify(resolve(line))
  })
  const json = `[${resolved.join(',')}]`
  await writeFile('./entries.json', json)
}

parse()
