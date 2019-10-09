const LANG_TOKENS = {
  number: { type: 'NUMBER', pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/ },
  points: { type: 'POINTS', pattern: /:/ },
  str: { type: 'STR', pattern: /STR/ },
  sum: { type: 'SUM', pattern: /SUM/ },
  sub: { type: 'SUB', pattern: /SUB/ },
  mul: { type: 'MUL', pattern: /MUL/ },
  div: { type: 'DIV', pattern: /DIV/ },
  print: { type: 'PRINT', pattern: /PRT/ },
  identifier: { type: 'IDENTIFIER', pattern: /[_]*[a-zA-Z][a-zA-Z0-9_]*/ }
}

module.exports = LANG_TOKENS
