function enumeration (...members) {
  const memberValues = {}
  members.forEach((member) => {
    if (typeof member === 'string') {
      memberValues[member] = Object.freeze({ value: member })
    } else if (typeof member === 'object') {
      const [key, value] = Object.keys(member)[0]
      memberValues[key] = Object.freeze({ value })
    }
  })
  return Object.freeze(memberValues)
}

module.exports = {
  enumeration
}
