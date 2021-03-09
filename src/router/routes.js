const { default: PageDashboard } = require('../components/pages/PageDashboard')
const { default: PageReport } = require('../components/pages/PageReport')
const { default: PageLogin } = require('../components/pages/PageLogin')
const { default: PageProfile } = require('../components/pages/PageProfile')

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: PageDashboard
  },
  {
    path: '/report',
    name: 'report',
    component: PageReport
  },
  {
    path: '/login',
    name: 'login',
    component: PageLogin
  },
  {
    path: '/profile',
    name: 'profile',
    component: PageProfile
  }
]

module.exports = {
  routes
}
