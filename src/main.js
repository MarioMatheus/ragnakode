const Lexer = require('./compiler/lexer')
const Parser = require('./compiler/parser')
const SemanticAnalyser = require('./compiler/semantic')
const CodeGenerator = require('./compiler/code-generator')

const consoleElement = document.querySelector('#console')
const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  lineNumbers: true,
  mode: 'ragnakode',
  lineWrapping: true
})

console.oldLog = console.log
console.log = function(value) {
  console.oldLog(value)
  consoleElement.value += `${value}\n`
}

function compile(code) {
  try {
    const tokens = Lexer.tokenize(code)
    const { ast, symbolTable } = Parser.parse(tokens)
    SemanticAnalyser.analyze(ast, symbolTable)
    const outputFileData = CodeGenerator.generate(ast, symbolTable)
    eval(outputFileData)
  } catch (error) {
    console.log(error)
  }
}

window.compileAndRun = function() {
  const code = editor.getValue()
  consoleElement.value = ''
  if (!code || code.length === 0) {
    consoleElement.value = 'Type something'
  } else {
    compile(code)
  }
}
