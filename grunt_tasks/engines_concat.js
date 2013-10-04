module.exports = function () {
    return {
        simple: {
            reader: {
                options: {
                    namespace: 'jDoc.Engines.Simple.prototype',
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
                    namespace: 'jDoc.Engines.ODF.prototype',
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
                    namespace: 'jDoc.Engines.OXML.prototype',
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
                    namespace: 'jDoc.Engines.DSV.prototype',
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

        rtf: {
            reader: {
                options: {
                    namespace: 'jDoc.Engines.RTF.prototype',
                    mainFilePath: 'src/engines/RTF/main.js'
                },
                src: [
                    'src/engines/RTF/reader/private/*.js',
                    'src/engines/RTF/reader/public/*.js'
                ],
                dest: 'src/build/rtf.js'
            },
            writer: {}
        },

        wcbff: {
            reader: {
                options: {
                    namespace: 'jDoc.Engines.WCBFF.prototype',
                    mainFilePath: 'src/engines/WCBFF/main.js'
                },
                src: [
                    'src/engines/WCBFF/reader/private/*.js',
                    'src/engines/WCBFF/reader/public/*.js'
                ],
                dest: 'src/build/wcbff.js'
            },
            writer: {}
        },

        fictionBook: {
            reader: {
                options: {
                    namespace: 'jDoc.Engines.FictionBook.prototype',
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