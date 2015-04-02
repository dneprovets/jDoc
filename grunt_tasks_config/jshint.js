var options = require('./../package.json').jshintConfig;
options.reporter = require('jshint-stylish');

module.exports = function () {
    return {
        options: options,
        src: [
            'src/**/*.js',
            '!src/libs/zip/**/*.js'
        ]
    };
};