// Despite the name, it expects a number converted to a string.
const hasRepeatedAdjacent = num => {
  for (let i = 0; i < num.length - 1; i++) {
    if (num[i] === num[i + 1]) {
      return true
    }
  }
  return false
}

// Despite the name, it expects a number converted to a string.
const doesNotDescend = num => {
  for (let i = 0; i < num.length - 1; i++) {
    if (num[i] > num[i + 1]) {
      return false
    }
  }
  return true
}

// Brute force it!
const min = 138241
const max = 674034
let totalPasswords = 0

for (let i = min; i <= max; i++) {
  // Convert to string...
  let num = i.toString()
  if (doesNotDescend(num) && hasRepeatedAdjacent(num)) {
    totalPasswords++
  }
}

console.log(`${totalPasswords} different password options`)
