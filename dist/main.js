!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports={number:{type:"NUMBER",pattern:/-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/},points:{type:"POINTS",pattern:/:/},str:{type:"STR",pattern:/STR/},sum:{type:"SUM",pattern:/SUM/},sub:{type:"SUB",pattern:/SUB/},mul:{type:"MUL",pattern:/MUL/},div:{type:"DIV",pattern:/DIV/},print:{type:"PRINT",pattern:/PRT/},identifier:{type:"IDENTIFIER",pattern:/[_]*[a-zA-Z][a-zA-Z0-9_]*/}}},function(module,exports,__webpack_require__){const Lexer=__webpack_require__(2),Parser=__webpack_require__(3),SemanticAnalyser=__webpack_require__(4),CodeGenerator=__webpack_require__(5);console.oldLog=console.log,console.log=function(e){return console.oldLog(e),e};const editor=CodeMirror.fromTextArea(document.getElementById("editor"),{lineNumbers:!0,mode:"ragnakode",lineWrapping:!0});window.compileAndRun=function(){const code=editor.getValue(),tokens=Lexer.tokenize(code),{ast:ast,symbolTable:symbolTable}=Parser.parse(tokens);SemanticAnalyser.analyze(ast,symbolTable);const outputFileData=CodeGenerator.generate(ast,symbolTable),output=eval(outputFileData);console.log(typeof output)}},function(e,t,n){const r=n(0);function o(e){let t,n=1/0;return Object.values(r).forEach(r=>{const o=e.match(r.pattern);if(!o||null==o)return null;e.indexOf(o[0])<n&&(n=e.indexOf(o[0]),t={value:o[0],tokenPattern:r})}),[t,n]}e.exports={tokenize:function(e){const t=[];for(let n=0;n<e.length;){const r=o(e.slice(n));if(null==r||void 0===r[0])break;t.push(r[0]),n+=r[0].value.length+r[1]}return t}}},function(e,t,n){const r=n(0);function o(e,t,n){const o=e[0],i=e[1];if(o.tokenPattern.type!==r.identifier.type)throw"Expected an identifier";if(i.tokenPattern.type!==r.number.type)throw"Expected a number";return{instruction:{name:"store",value:{identifier:o,value:i}},symbol:t.map(e=>e.identifier.value).includes(o.value)?{identifier:o,value:i,production:"assignment",commandIndex:n}:{identifier:o,value:i,production:"declaration",commandIndex:n}}}function i(e,t,n){const o=e[0];if(o.tokenPattern.type!==r.identifier.type)throw"Expected an identifier";return{instruction:{name:"print",value:{identifier:o}},symbol:{identifier:o,production:"prints",commandIndex:n}}}function a(e,t,n,o){const i=e[0],a=e[1],u=e[2];if(i.tokenPattern.type!==r.identifier.type)throw"Expected an identifier";if(a.tokenPattern.type!==r.identifier.type&&a.tokenPattern.type!==r.number.type)throw"Expected identifier or number";if(u.tokenPattern.type!==r.identifier.type&&u.tokenPattern.type!==r.number.type)throw"Expected identifier or number";const l={name:"operation",value:{identifier:i,operation:t,value1:a,value2:u}};return{instruction:l,symbol:n.map(e=>e.identifier.value).includes(i.value)?{identifier:i,instruction:l,production:"assignment",commandIndex:o}:{identifier:i,instruction:l,production:"declaration",commandIndex:o}}}e.exports={parse:function(e){let t={name:"program",value:[]},n=[],u=0;for(let l=0;l<e.length;){if(e[l].tokenPattern.type!==r.identifier.type)throw"Expected a variable name";if(e[l+1].tokenPattern.type!==r.points.type)throw"Expected two points character";const c=e[l+2];if(c.tokenPattern.type===r.str.type){const r=[e[l],e[l+3]],{instruction:i,symbol:a}=o(r,n,u++);t.value.push(i),n.push(a),l+=4}else if(c.tokenPattern.type===r.print.type){const r=[e[l]],{instruction:o,symbol:a}=i(r,n,u++);t.value.push(o),n.push(a),l+=3}else{if(c.tokenPattern.type!==r.sum.type&&c.tokenPattern.type!==r.sub.type&&c.tokenPattern.type!==r.mul.type&&c.tokenPattern.type!==r.div.type)throw"Unexpected command";{const r=[e[l],e[l+3],e[l+4]],{instruction:o,symbol:i}=a(r,c.tokenPattern.type.toLowerCase(),n,u++);t.value.push(o),n.push(i),l+=5}}}return{ast:t,symbolTable:n}}}},function(e,t,n){const r=n(0);e.exports={analyze:function(e,t){e.value.forEach((e,n)=>{"print"===e.name&&function(e,t,n){const r=e.identifier;if(!t.filter((e,t)=>"declaration"===e.production&&t<n).map(e=>e.identifier.value).includes(r.value))throw`Error at instruction ${n+1}: Variable ${r.value} not declared`}(e.value,t,n),"operation"===e.name&&function(e,t,n){const o=e.value1,i=e.value2,a=t.filter((e,t)=>"declaration"===e.production&&t<n).map(e=>e.identifier.value);if(o.tokenPattern.type===r.identifier.type&&!a.includes(o.value))throw`Error at instruction ${n+1}: Variable ${o.value} not declared`;if(i.tokenPattern.type===r.identifier.type&&!a.includes(i.value))throw`Error at instruction ${n+1}: Variable ${i.value} not declared`}(e.value,t,n)})}}},function(e,t){e.exports={generate:function(e,t){let n="// Ragnakode\n\n";return n+="/* Variable Declarations */\n",t.forEach(e=>{"declaration"===e.production&&(n+=`let ${e.identifier.value} = 0\n`)}),n+="\n/* Instructions */\n",e.value.forEach(e=>{"store"===e.name&&(n+=`${function(e){return`${e.identifier.value} = ${e.value.value}`}(e.value)}\n`),"print"===e.name&&(n+=`${function(e){return`console.log(${e.identifier.value})`}(e.value)}\n`),"operation"===e.name&&(n+=`${function(e){const t="sum"===e.operation?"+":"sub"===e.operation?"-":"mul"===e.operation?"*":"/";return`${e.identifier.value} = ${e.value1.value} ${t} ${e.value2.value}`}(e.value)}\n`)}),n}}}]);