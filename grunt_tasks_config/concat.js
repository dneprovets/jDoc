module.exports = function (grunt) {
    var enginesPaths = grunt.config.get('enginesPaths'),
        code = "\nvar engineData;\n";

    code += enginesPaths.map(function (path) {
        var code = "engineData = require('" + path.replace(/^src/, '.') + "')['default'];\n" +
                "window.jDoc.defineEngine(engineData.name, engineData.formats, engineData.value);\n";

        return code;
    }).join('\n');

    return {
        partials: {
            options: {
                footer: "\n" + code + "\n",
                process: function (src, path) {
                    if (path.indexOf('polyfills/object.js') >= 0) {
                        src += '\ncopy = Object.assign;\n';
                    }

                    return src;
                }
            },
            src: [
                'build/partials/libs/**/*.js',
                'src/index.js'
            ],
            dest: 'build/partials/index.js'
        },
        app: {
            options: {
                banner: '\n(function (window, document) {\n' +
                    'var libsRoot = {},\n' +
                    'localStorage = window.localStorage || window.mozLocalStorage || window.webkitLocalStorage,\n' +
                    'requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem || window.mozRequestFileSystem,\n' +
                    'URL = window.URL || window.webkitURL || window.mozURL,\n' +
                    'Blob = window.Blob || window.webkitBlob || window.mozBlob,\n' +
                    'documentEngines = {},\n' +
                    'documentFormats = [],\n' +
                    'copy,\n' +
                    'clone = function (obj) {\n' +
                    '    return copy({}, obj);\n' +
                    '};\n',
                footer: '\n} (window, document));'
            },
            src: ['build/jdoc.<%= version %>.js'],
            dest: 'build/jdoc.<%= version %>.js'
        }
    };
};