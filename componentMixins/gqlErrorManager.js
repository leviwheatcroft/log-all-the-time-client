import {
  ValidState
} from '../lib/enums'

export const gqlErrorManager = {
  data () {
    return {
      managedErrors: {},
      gqlErrors: {}
    }
  },
  methods: {
    hasError (errorName) {
      return this.gqlErrors[errorName]
    },
    clearError (errorName) {
      this.gqlErrors[errorName] = undefined
    },
    clearValidState (invalidKey) {
      if (this[invalidKey] === ValidState.unchecked)
        return
      Object.entries(this.managedErrors)
        .filter(([_, errorInvalidKey]) => errorInvalidKey === invalidKey)
        .forEach(([errorName]) => {
          this.gqlErrors[errorName] = undefined
        })
      this[invalidKey] = ValidState.unchecked
    },
    manageErrors (gqlErrors) {
      const {
        managedErrors
      } = this
      const unmanagedErrors = []
      this.gqlErrors = gqlErrors.reduce((acc, e) => {
        if (Object.keys(managedErrors).includes(e.name))
          acc[e.name] = e
        else
          unmanagedErrors.push(e)
        return acc
      }, {})
      Object.keys(this.gqlErrors).forEach((e) => {
        this[this.managedErrors[e]] = ValidState.invalid
      })
      if (!unmanagedErrors.length)
        return
      const error = new Error('Unmanaged graphql errors')
      error.graphQLErrors = unmanagedErrors
      throw error
    }
  }
}
