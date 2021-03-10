const serveStatic = require('serve-static')
const finalhandler = require('finalhandler')
// eslint-disable-next-line import/no-extraneous-dependencies
const http = require('http')

const serve = serveStatic('build')

function start () {
  const server = http.createServer((req, res) => {
    serve(req, res, finalhandler)
  })
  server.listen({ port: 3000 }, () => {
    // eslint-disable-next-line no-console
    console.log('Listening on port 3000')
  })
}

start()
