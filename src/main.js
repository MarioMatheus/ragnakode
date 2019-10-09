// const { inspect } = require('util')

const Lexer = require('./compiler/lexer')
const Parser = require('./compiler/parser')
const SemanticAnalyser = require('./compiler/semantic')
const CodeGenerator = require('./compiler/code-generator')

const ragnakode = `
  ragna: STR 5
  ragna: MUL ragna 2
  kode: DIV ragna 10
  kode: PRT
`

window.compileAndRun = function() {
  const code = document.querySelector('#editor').value

  console.log('\nTOKENIZING')
  const tokens = Lexer.tokenize(code)
  // console.log(tokens)

  console.log('\nPARSING')
  const { ast, symbolTable } = Parser.parse(tokens)
  // console.log(inspect(ast, {showHidden: false, depth: null}))

  console.log('\nAnalysing')
  SemanticAnalyser.analyze(ast, symbolTable)

  console.log('\nJS CODE')
  const outputFileData = CodeGenerator.generate(ast, symbolTable)
  // console.log(outputFileData)

  console.log('\nCODE EXECUTION OUTPUT')
  eval(outputFileData)
}

// const tokens = Lexer.tokenize(ragnakode)
// const { ast, symbolTable } = Parser.parse(tokens)
// console.log(symbolTable)
// SemanticAnalyser.analyze(ast, symbolTable)
// const compiledProgram = CodeGenerator.generate(ast, symbolTable)
// console.log(/*inspect(*/compiledProgram/*, true, null, true)*/)
