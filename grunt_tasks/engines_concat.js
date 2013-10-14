module.exports = function () {
    return {
        simple: {
            reader: {
                options: {
                    namespace: 'jDoc.engines.Simple.prototype',
                    mainFilePath: 'src/engines/Simple/main.js'
                },
                src: [
                    'src/engines/Simple/reader/private/*.js',
                    'src/engines/Simple/reader/public/*.js'
                ],
                dest: 'src/build/simple.js'
            },
            writer: {}
        },

        odf: {
            reader: {
                options: {
                    namespace: 'jDoc.engines.ODF.prototype',
                    mainFilePath: 'src/engines/ODF/main.js'
                },
                src: [
                    'src/engines/ODF/reader/private/*.js'
                ],
                dest: 'src/build/odf.js'
            },
            writer: {}
        },

        oxml: {
            reader: {
                options: {
                    namespace: 'jDoc.engines.OXML.prototype',
                    mainFilePath: 'src/engines/OXML/main.js'
                },
                src: [
                    'src/engines/OXML/reader/private/*.js'
                ],
                dest: 'src/build/oxml.js'
            },
            writer: {}
        },

        dsv: {
            reader: {
                options: {
                    namespace: 'jDoc.engines.DSV.prototype',
                    mainFilePath: 'src/engines/DSV/main.js'
                },
                src: [
                    'src/engines/DSV/reader/private/*.js',
                    'src/engines/DSV/reader/public/*.js'
                ],
                dest: 'src/build/dsv.js'
            },
            writer: {}
        },

        fictionBook: {
            reader: {
                options: {
                    namespace: 'jDoc.engines.FictionBook.prototype',
                    mainFilePath: 'src/engines/FictionBook/main.js'
                },
                src: [
                    'src/engines/FictionBook/reader/private/*.js',
                    'src/engines/FictionBook/reader/public/*.js'
                ],
                dest: 'src/build/fb2.js'
            },
            writer: {}
        }
    };
};