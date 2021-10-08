
const NavBar = {
  computed: {
    name () {
      return this.$store.state.user.name
    },
    gravatar () {
      return this.$store.state.user.gravatar
    }
  }
}

export default NavBar
