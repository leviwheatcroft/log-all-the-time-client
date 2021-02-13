const {
  mutations: {
    UserLoginM
  }
} = require('../../apollo')

const Login = {
  methods: {
    async login () {
      const result = await this.$apollo.mutate({
        mutation: UserLoginM,
        variables: {
          password: 'foo',
          email: 'email@address.com'
        }
      })
      console.log('result', result)
    }
  }
}

module.exports = Login
