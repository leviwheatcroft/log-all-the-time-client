const browserEnv = require('browser-env')

// browserEnv() will just create all globals. You can specify what you want:
browserEnv(['localStorage'], {
  testEnvironment: 'node',
  url: 'http://localhost:3000'
})
