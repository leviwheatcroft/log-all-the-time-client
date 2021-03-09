const {
  mutations: {
    UserLoginM
  }
} = require('../../apollo')
const {
  state,
  reduce
} = require('../../store')
const {
  IconUser,
  IconAtSign,
  IconKey,
  IconSave
} = require('../../icons')

const Profile = {
  components: {
    IconUser,
    IconAtSign,
    IconKey,
    IconSave
  },
  data () {
    const {
      auth: {
        username,
        email
      }
    } = state
    const password = ''
    const confirmPassword = ''
    return {
      username,
      email,
      password,
      confirmPassword
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

module.exports = Profile
