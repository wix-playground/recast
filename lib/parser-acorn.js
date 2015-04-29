var acorn = require('babel-core/lib/acorn');

exports.parse = function (input, options) {
    var comments = [];
    var program = acorn.parse(input, {
        locations: true,
        ranges: options.range,
        comment: true,
        //tolerant: options.tolerant,
        sourceType: 'module',
        onComment: comments,
        ecmaVersion: 6,

        allowReturnOutsideFunction: true,
        plugins: options.plugins || { 'jsx': true, 'flow': true },
        features: options.features || {
            'es6.parameters.rest': true,
            'es6.parameters.default': true,
            'es7.classProperties': true
        }
    });
    program.comments = comments;

    // Adjust the Program node 'loc' to fit the behavior of esprima-fb
    if(program.body.length>0) {
        program.loc.start = program.body[0].loc.start;
        program.loc.end = program.body[program.body.length-1].loc.end;
    }

    return program;
};