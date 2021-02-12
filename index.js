const { default: Vue } = require('vue')
const { Demo } = require('./src/components')

/* eslint-disable no-new */
// new Vue({
//   el: '#root',
//   // template: '<Demo/>',
//   render (h) {
//     return h('div', Demo)
//   },
//   components: { Demo }
// })
console.log(Demo)

new Vue({
  render (h) { return h(Demo) }
  // render: function (h) { return h(Demo) }
}).$mount('#app')
