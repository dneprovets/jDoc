module.exports = function () {
    return {
        app: {
            options: {
                banner: "(function (window, document) {\n" +
                    "window.localStorage = window.localStorage || window.mozLocalStorage || window.webkitLocalStorage;\n" +
                    "window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem || window.mozRequestFileSystem;\n" +
                    "window.URL = window.URL || window.webkitURL || window.mozURL;\n" +
                    "window.Blob = window.Blob || window.webkitBlob || window.mozBlob;",
                footer: "window.jDoc = jDoc;\n" +
                        "}(window, document));"
            },
            src: [
                'src/browser.js',

                'src/main.js',
                'src/parsedFile.js',

                'src/utils/*.js',

                'src/utils/DOM/*.js',

                'src/build/*',
                '!src/build/jdoc.*'
            ],
            dest: 'src/build/jdoc.<%= version %>.js'
        }
    };
};