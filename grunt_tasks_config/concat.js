module.exports = function () {
    var basePath = 'src/build/';

    return {
        app: {
            options: {
                banner: "(function (window, document, navigator, undefined) {\n" +
                    '"use strict";\n' +
                    "var localStorage = window.localStorage || window.mozLocalStorage || window.webkitLocalStorage;\n" +
                    "window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem || window.mozRequestFileSystem;\n" +
                    "window.URL = window.URL || window.webkitURL || window.mozURL;\n" +
                    "window.Blob = window.Blob || window.webkitBlob || window.mozBlob;",
                footer: 'if (typeof define === "function" && define.amd ) {' +
                            'define( "jDoc", [], function() {return jDoc;});' +
                        '} else {\n' +
                            'window.jDoc = jDoc;\n' +
                        '}\n' +
                        "}(window, document, navigator));"
            },
            src: [
                'src/var.js',
                'src/libs/**/*.js',
                'src/*/private/**/*.js',
                basePath + 'dom.js',
                basePath + 'events.js',
                basePath + 'main.js',
                basePath + 'unit.js',
                basePath + 'fileData.js',
                basePath + 'engine.js',
                basePath + 'engines/*.js'
            ],
            dest: 'src/build/jdoc.<%= version %>.js'
        }
    };
};