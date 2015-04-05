module.exports = function () {
    return {
        app: {
            options: {
                banner: "(function (window, document, navigator, undefined) {\n" +
                    '"use strict";\n' +
                    "var localStorage = window.localStorage || window.mozLocalStorage || window.webkitLocalStorage,\n" +
                    "requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem || window.mozRequestFileSystem,\n" +
                    "URL = window.URL || window.webkitURL || window.mozURL,\n" +
                    "Blob = window.Blob || window.webkitBlob || window.mozBlob,\n" +
                    "documentEngines = {},\n" +
                    "documentFormats = [],\n" +
                    "copy,\n" +
                    "libsRoot = {},\n" +
                    "clone = function (obj) {\n" +
                    "return copy({}, obj);\n" +
                    "};\n",
                footer: "\ncopy = Object.assign;" +
                    "\n}(window, document, navigator));"
            },
            src: [
                'build/partials/core.js'
            ],
            dest: 'build/jdoc.<%= version %>.js'
        }
    };
};