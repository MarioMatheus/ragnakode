const Lexer = require('./compiler/lexer')
const Parser = require('./compiler/parser')
const SemanticAnalyser = require('./compiler/semantic')
const CodeGenerator = require('./compiler/code-generator')

console.oldLog = console.log
console.log = function(value) {
  console.oldLog(value)
  return value
}

const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
  lineNumbers: true,
  mode: 'ragnakode',
  lineWrapping: true
})

function compile(code) {
  let output = ''
  try {
    const tokens = Lexer.tokenize(code)
    console.oldLog(tokens)
    const { ast, symbolTable } = Parser.parse(tokens)
    SemanticAnalyser.analyze(ast, symbolTable)
    const outputFileData = CodeGenerator.generate(ast, symbolTable)

    output = eval(outputFileData)
  } catch (error) {
    output = console.log(error)
  }
  return output
}

window.compileAndRun = function() {
  const code = editor.getValue()
  output = (!code || code.length === 0) ? 'Type something' : compile(code)
  document.querySelector('#console').value = output
}
