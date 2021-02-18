const { default: App } = require('./App')
const { default: PageDashboard } = require('./PageDashboard')
const { default: PageReport } = require('./PageReport')

// don't include components here to be consumed by other components, as that
// will create a circular reference.

const routes = [
  {
    path: '/',
    component: PageDashboard
  },
  {
    path: '/report',
    component: PageReport,
    props: {

    }
  }
]

module.exports = {
  routes,
  App
}
