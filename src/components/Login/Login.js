const {
  mutations: {
    UserLoginM
  },
  queries: {
    SelfQ
  }
} = require('../../apollo')
const {
  IconAtSign,
  IconKey,
  IconLogIn
} = require('../../icons')
const {
  reduce
} = require('../../store')

const Login = {
  components: {
    IconAtSign,
    IconKey,
    IconLogIn
  },
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
      const logInResult = await this.$apollo.mutate({
        mutation: UserLoginM,
        variables: {
          password,
          email
        }
      })
      const {
        accessToken,
        refreshToken
      } = logInResult.data.UserLoginM
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      const userResult = await this.$apollo.query({
        query: SelfQ
      })
      const {
        data: { SelfQ: user }
      } = userResult
      reduce({
        USER_LOG_IN: { user }
      })
      this.$router.push({ name: 'dashboard' })
    }
  }
}

module.exports = Login
