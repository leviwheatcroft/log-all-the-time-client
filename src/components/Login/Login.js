const {
  mutations: {
    UserLoginM
  }
} = require('../../apollo')

const Login = {
  data () {
    return {
      email: 'email@address.com',
      password: 'foo'
    }
  },
  methods: {
    async clickSubmit () {
      const {
        email,
        password
      } = this
      const result = await this.$apollo.mutate({
        mutation: UserLoginM,
        variables: {
          password,
          email
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
