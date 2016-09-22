var generate = require('babel-generator').default,
    traverse = require('babel-traverse').default,
    T = require('babel-types'),
    babylon = require('babylon'),
    SourceMapConsumer = require('source-map').SourceMapConsumer

var code = 'a = 1'

var ast = babylon.parse(code, {
  allowReturnOutsideFunction: false,
  sourceType: 'script'
})

traverse(ast, {
  ExpressionStatement: {
    enter: function(path) {
      path.insertAfter(T.emptyStatement())
    }
  }
})


var regenerated = generate(ast, {
  compact: true,
  sourceMaps: 'inline',
  sourceFileName: 'foo.js'
}, code)

var map = regenerated.map

console.log('# original code:\n', code);
console.log('# regenerated code:\n', regenerated.code);
console.log('# maps:');
SourceMapConsumer(map).eachMapping(function(m) { console.log(m) })
