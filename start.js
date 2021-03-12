const serveStatic = require('serve-static')
const finalhandler = require('finalhandler')
// eslint-disable-next-line import/no-extraneous-dependencies
const http = require('http')

const serve = serveStatic('build')

function start () {
  const server = http.createServer((req, res) => {
    serve(req, res, finalhandler)
  })
  server.on('error', (err) => console.error(err))
  server.listen({ host: '0.0.0.0', port: 3000 }, () => {
    const {
      address,
      port
    } = server.address()
    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at http://${address}:${port}`)
  })
}

start()
