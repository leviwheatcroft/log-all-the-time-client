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
  IconLogIn,
  IconLoader
} = require('../../icons')
const {
  reduce
} = require('../../store')

const Login = {
  components: {
    IconAtSign,
    IconKey,
    IconLogIn,
    IconLoader
  },
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    async clickSubmit () {
      this.error = false
      const {
        email,
        password
      } = this
      let logInResult
      try {
        logInResult = await this.$apollo.mutate({
          mutation: UserLoginM,
          variables: {
            password,
            email
          }
        })
      } catch (err) {
        this.error = err
        return
      }
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
