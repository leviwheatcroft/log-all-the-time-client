const { default: App } = require('./App')
const { default: PageDashboard } = require('./pages/PageDashboard')
const { default: PageReport } = require('./pages/PageReport')
const { default: PageLogin } = require('./pages/PageLogin')

// don't include components here to be consumed by other components, as that
// will create a circular reference.

const routes = [
  {
    path: '/',
    component: PageDashboard
  },
  {
    path: '/report',
    component: PageReport
  },
  {
    path: '/login',
    component: PageLogin
  }
]

module.exports = {
  routes,
  App
}
