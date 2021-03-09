// const {
//   mutations: {
//     UserLoginM
//   }
// } = require('../../apollo')
const {
  state,
  reduce
} = require('../../store')
const {
  IconLogOut
} = require('../../icons')

const Profile = {
  components: {
    IconLogOut
  },
  computed: {
    username () { return this.auth.user.username },
    email () { return this.auth.user.email }
  },
  data () {
    const {
      auth
    } = state
    const password = ''
    const confirmPassword = ''
    return {
      auth,
      password,
      confirmPassword
    }
  },
  methods: {
    logOut () {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      reduce({
        USER_LOG_OUT: {}
      })
      this.$router.push({ name: 'login' })
    }
    // async clickSubmit () {
    //   const {
    //     email,
    //     password
    //   } = this
    //   const result = await this.$apollo.mutate({
    //     mutation: UserLoginM,
    //     variables: {
    //       password,
    //       email
    //     }
    //   })
    //   console.log('result', result)
    //   const {
    //     accessToken,
    //     refreshToken
    //   } = result.data.UserLoginM
    //   localStorage.setItem('accessToken', accessToken)
    //   localStorage.setItem('refreshToken', refreshToken)
    // }
  }
}

module.exports = Profile
