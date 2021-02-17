function whitespace (entry) {
  const {
    description
  } = entry

  entry.description = description.replace(/ {2,}/g, ' ')
}

module.exports = {
  whitespace
}
