class AssertionError extends Error {
  constructor (detail) {
    super(detail.message)
    this.name = 'ASSERTION_ERROR'
  }
}

console.assert = function assert (truthy, detail) {
  // console.log('ass', truthy, detail)
  if (!truthy)
    throw new AssertionError(detail)
}
