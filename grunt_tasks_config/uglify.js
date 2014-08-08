module.exports = function () {
    return {
        options: {
            compress: true,
            report:   false
        },
        js:      {
            'src':  'src/build/jdoc.<%= version %>.js',
            'dest': 'src/build/jdoc.<%= version %>.min.js'
        }
    };
};