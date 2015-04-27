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
        plugins: { 'jsx': true, 'flow': true },
        features: {
            'es6.parameters.rest': true,
            'es6.parameters.default': true
        }
    });
    program.comments = comments;
    return program;
};