export const gqlErrorManager = {
  data () {
    return {
      managedErrorNames: [],
      gqlErrors: {}
    }
  },
  methods: {
    hasError (errorName) {
      if (!this.managedErrorNames.includes(errorName))
        throw new Error(`${errorName} is not a managed error`)
      return this.gqlErrors[errorName]
    },
    clearError (errorName) {
      if (!this.managedErrorNames.includes(errorName))
        throw new Error(`${errorName} is not a managed error`)
      this.gqlErrors[errorName] = undefined
    },
    manageErrors (gqlErrors) {
      this.gqlErrors = Object.fromEntries(
        gqlErrors
          .filter((e) => this.managedErrorNames.includes(e.name))
          .map((e) => [e.name, e])
      )
      if (Object.keys(this.gqlErrors).length === gqlErrors.length)
        return
      const unmanaged =
        gqlErrors.filter((e) => !this.managedErrorNames.includes(e.name))
      const error = new Error('Unmanaged graphql errors')
      error.graphQLErrors = unmanaged
      throw error
    }
  }
}
