// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

CodeMirror.defineSimpleMode('ragnakode', {
  start: [
    {regex: /(?:STR|PRT|SUM|SUB|MUL|DIV)\b/, token: 'keyword'},
    {regex: /:/, token: 'atom'},
    {regex: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/i, token: 'number'},
    {regex: /[_]*[a-zA-Z][a-zA-Z0-9_]*/, token: 'variable-2'},
  ]
})
