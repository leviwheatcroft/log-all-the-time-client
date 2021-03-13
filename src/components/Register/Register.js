const {
  mutations: {
    UserRegisterM
  },
  queries: {
    SelfQ
  }
} = require('../../apollo')
const {
  IconAtSign,
  IconKey,
  IconLogIn,
  IconLoader,
  IconUser
} = require('../../icons')
const {
  reduce
} = require('../../store')

const Register = {
  components: {
    IconAtSign,
    IconKey,
    IconLogIn,
    IconLoader,
    IconUser
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: false
    }
  },
  methods: {
    async clickSubmit () {
      this.error = false
      const {
        confirmPassword,
        email,
        password,
        username,
      } = this
      let logInResult
      if (!username)
        this.error = { message: 'Username is required.' }
      if (!email)
        this.error = { message: 'Email is required.' }
      if (!password)
        this.error = { message: 'Password is required.' }
      if (!confirmPassword)
        this.error = { message: 'Password Confirmation is required.' }
      if (password !== confirmPassword)
        this.error = { message: 'Password & Confirmation must match' }
      if (this.error)
        return
      try {
        logInResult = await this.$apollo.mutate({
          mutation: UserRegisterM,
          variables: {
            email,
            password,
            username
          }
        })
      } catch (err) {
        this.error = err
        return
      }
      const {
        accessToken,
        refreshToken
      } = logInResult.data.UserRegisterM
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      const userResult = await this.$apollo.query({
        query: SelfQ,
        fetchPolicy: 'network-only'
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

module.exports = Register
