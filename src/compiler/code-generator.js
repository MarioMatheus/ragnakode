function generate(ast, symbolTable) {
  let code = '// Ragnakode\n\n'

  code += '/* Variable Declarations */\n'
  symbolTable.forEach(s => { if (s.production === 'declaration') code += `let ${s.identifier.value} = 0\n` })

  code += '\n/* Instructions */\n'
  ast.value.forEach(instruction => {
    if (instruction.name === 'store') code += `${ genStoreCode(instruction.value) }\n`
    if (instruction.name === 'print') code += `${ genPrintCode(instruction.value) }\n`
    if (instruction.name === 'operation') code += `${ genOperationCode(instruction.value) }\n`
  })

  return code
}

function genStoreCode(strStmt) {
  return `${strStmt.identifier.value} = ${strStmt.value.value}`
}

function genPrintCode(prtStmt) {
  return `console.log(${prtStmt.identifier.value})`
}

function genOperationCode(opStmt) {
  const operator = 
    opStmt.operation === 'sum' ? '+' : 
    opStmt.operation === 'sub' ? '-' :
    opStmt.operation === 'mul' ? '*' : '/'
  
  return `${opStmt.identifier.value} = ${opStmt.value1.value} ${operator} ${opStmt.value2.value}`
}

module.exports = { generate }
