function asRgb (str) {
  // primes avoid collisions
  // https://en.wikipedia.org/wiki/List_of_prime_numbers
  const primes = [71, 173, 281]
  const min = 128 // min value for r, g, and b. higher = lighter
  const range = 96 // distribution of r, g, and b. max will be min + range
  const hash = Math.abs(str.padEnd(4, 'zyxw').split('').reduce((_, c) => {
    return (c.charCodeAt(0) + ((_ << 5) - _)) | 0
  }, 0))
  const rgb = primes.map((p) => Math.floor(((hash % p) / p) * range) + min)
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
}

module.exports = { asRgb }
