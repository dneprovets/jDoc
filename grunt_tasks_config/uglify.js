module.exports = function () {
    return {
        options: {
            compress: true,
            report:   false
        },
        js:      {
            'src':  'build/jdoc.<%= version %>.js',
            'dest': 'build/jdoc.<%= version %>.min.js'
        }
    };
};