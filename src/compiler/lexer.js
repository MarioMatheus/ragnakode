const LANG_TOKENS = require('../util/tokens')

function readToken (str) {
  let i = Infinity
  let token
  Object.values(LANG_TOKENS).forEach((langToken) => {
    const r = str.match(langToken.pattern)
    if (!r || r == null) return null
    else if (str.indexOf(r[0]) < i) {
      i = str.indexOf(r[0])
      token = { value: r[0], tokenPattern: langToken }
    }
  })
  return [token, i]
}

function tokenize (input) {
  const tokens = []
  for (let i = 0; i < input.length;) {
    const t = readToken(input.slice(i))
    if (t == null || t[0] === undefined) break
    tokens.push(t[0])
    i += t[0].value.length + t[1]
  }
  return tokens
}

module.exports = { tokenize }
