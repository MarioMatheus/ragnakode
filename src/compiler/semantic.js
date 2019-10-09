const LANG_TOKENS = require('../util/tokens')

function analyze(ast, symbolTable) {
  ast.value.forEach((instruction, index) => {
    if (instruction.name === 'print') analysePrint(instruction.value, symbolTable, index)
    if (instruction.name === 'operation') analyseOperation(instruction.value, symbolTable, index)
  })
}

function analysePrint(prtStmt, symbolTable, instructionIndex) {
  const prtValue = prtStmt.identifier
  const declaredSymbols = symbolTable
    .filter((s, i) => s.production === 'declaration' && i < instructionIndex)
    .map(s => s.identifier.value)

  if (!declaredSymbols.includes(prtValue.value)) {
    throw `Error at instruction ${instructionIndex + 1}: Variable ${prtValue.value} not declared`
  }
}

function analyseOperation(opStmt, symbolTable, instructionIndex) {
  const value1 = opStmt.value1
  const value2 = opStmt.value2
  const declaredSymbols = symbolTable
    .filter((s, i) => s.production === 'declaration' && i < instructionIndex)
    .map(s => s.identifier.value)
  
  if (value1.tokenPattern.type === LANG_TOKENS.identifier.type && !declaredSymbols.includes(value1.value))
    throw `Error at instruction ${instructionIndex + 1}: Variable ${value1.value} not declared`
  if (value2.tokenPattern.type === LANG_TOKENS.identifier.type && !declaredSymbols.includes(value2.value))
    throw `Error at instruction ${instructionIndex + 1}: Variable ${value2.value} not declared`
}

module.exports = { analyze }
