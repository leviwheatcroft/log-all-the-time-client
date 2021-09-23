
const NavBar = {
  computed: {
    username () {
      return this.$store.state.user.username
    },
    gravatar () {
      return this.$store.state.user.gravatar
    }
  }
}

export default NavBar
