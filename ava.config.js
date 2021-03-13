// https://github.com/avajs/ava/blob/main/docs/06-configuration.md
export default {
  files: [
    'test/001 lib-stringOps/*',
    'test/002 store/*',
    'test/003 lib/*'
  ],
  concurrency: 5,
  verbose: true,
  require: [
    './test/setupBrowserEnv.js',
    './test/patchConsoleAssert.js'
  ]
}
