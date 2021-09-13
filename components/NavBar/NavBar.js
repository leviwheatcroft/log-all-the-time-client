
const NavBar = {
  computed: {
    username () {
      return this.$store.state.user.username
    }
  }
}

export default NavBar
