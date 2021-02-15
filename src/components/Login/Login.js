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
      const {
        accessToken,
        refreshToken
      } = result.data.UserLoginM
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }
  }
}

module.exports = Login
