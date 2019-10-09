const LANG_TOKENS = require('../util/tokens')

function parse(tokens) {
  let ast = { name: 'program', value: [] }
  let symbolTable = []
  let commandIndex = 0

  for (let i = 0; i < tokens.length;) {
    if (tokens[i].tokenPattern.type !== LANG_TOKENS.identifier.type) throw 'Expected a variable name'
    if (tokens[i + 1].tokenPattern.type !== LANG_TOKENS.points.type) throw 'Expected two points character'

    const command = tokens[i + 2]
    if (command.tokenPattern.type === LANG_TOKENS.str.type) {
      const strTokens = [tokens[i], tokens[i + 3]]
      const { instruction, symbol } = parseStr(strTokens, symbolTable, commandIndex++)
      ast.value.push(instruction)
      symbolTable.push(symbol)
      i += 4
    } else if (command.tokenPattern.type === LANG_TOKENS.print.type) {
      const prtTokens = [tokens[i]]
      const { instruction, symbol } = parsePrt(prtTokens, symbolTable, commandIndex++)
      ast.value.push(instruction)
      symbolTable.push(symbol)
      i += 3
    } else if (
        command.tokenPattern.type === LANG_TOKENS.sum.type ||
        command.tokenPattern.type === LANG_TOKENS.sub.type ||
        command.tokenPattern.type === LANG_TOKENS.mul.type ||
        command.tokenPattern.type === LANG_TOKENS.div.type
      ) {
      const opTokens = [tokens[i], tokens[i + 3], tokens[i + 4]]
      const { instruction, symbol } = parseOp(opTokens, command.tokenPattern.type.toLowerCase(), symbolTable, commandIndex++)
      ast.value.push(instruction)
      symbolTable.push(symbol)
      i += 5
    } else {
      throw 'Unexpected command'
    }
  }
  
  return { ast, symbolTable }
}

function parseStr(tokens, symbolTable, commandIndex) {
  const identifier = tokens[0]
  const value = tokens[1]
  if (identifier.tokenPattern.type !== LANG_TOKENS.identifier.type) throw 'Expected an identifier'
  if (value.tokenPattern.type !== LANG_TOKENS.number.type) throw 'Expected a number'

  const symbol = symbolTable.map(s => s.identifier.value).includes(identifier.value) ?
    { identifier, value, production: 'assignment', commandIndex } :
    { identifier, value, production: 'declaration', commandIndex }

  return { instruction: { name: 'store', value: { identifier, value } }, symbol }
}

function parsePrt(tokens, symbolTable, commandIndex) {
  const identifier = tokens[0]
  if (identifier.tokenPattern.type !== LANG_TOKENS.identifier.type) throw 'Expected an identifier'

  const instruction = { name: 'print', value: { identifier } }
  const symbol = { identifier, production: 'prints', commandIndex }

  return { instruction, symbol }
}

function parseOp(tokens, operation, symbolTable, commandIndex) {
  const identifier = tokens[0]
  const value1 = tokens[1]
  const value2 = tokens[2]
  if (identifier.tokenPattern.type !== LANG_TOKENS.identifier.type) throw 'Expected an identifier'
  if (value1.tokenPattern.type !== LANG_TOKENS.identifier.type &&
      value1.tokenPattern.type !== LANG_TOKENS.number.type) throw 'Expected identifier or number'
  if (value2.tokenPattern.type !== LANG_TOKENS.identifier.type &&
      value2.tokenPattern.type !== LANG_TOKENS.number.type) throw 'Expected identifier or number'

  const instruction = { name: 'operation', value: { identifier, operation, value1, value2 } }
  const symbol = symbolTable.map(s => s.identifier.value).includes(identifier.value) ?
    { identifier, instruction, production: 'assignment', commandIndex } : 
    { identifier, instruction, production: 'declaration', commandIndex }

  return { instruction, symbol }
}

module.exports = { parse }
