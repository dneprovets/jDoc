module.exports = function () {
    return {
        base: {
            reader: {
                options: {
                    namespace: 'jDoc.Engine.prototype',
                    mainFilePath: 'src/engines/Base/engine.js'
                },
                src: [
                    'src/engines/Base/reader/private/*.js',
                    'src/engines/Base/reader/public/*.js',
                    'src/engines/Base/reader/public/*/*.js'
                ],
                dest: 'src/build/base.js'
            },
            writer: {}
        },

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
                    'src/engines/ODF/reader/private/*.js',
                    'src/engines/ODF/reader/public/*.js'
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
                    'src/engines/OXML/reader/private/*.js',
                    'src/engines/OXML/reader/public/*.js'
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
        },

        rtf: {
            reader: {
                options: {
                    namespace: 'jDoc.engines.RTF.prototype',
                    mainFilePath: 'src/engines/RTF/main.js',
                    complexProperties: [
                        {
                            name: "_controlWordsParsers",
                            src: ['src/engines/RTF/reader/private/_controlWordsParsers/**/*.js']
                        }
                    ]
                },
                src: [
                    'src/engines/RTF/reader/private/*.js',
                    'src/engines/RTF/reader/public/*.js'
                ],
                dest: 'src/build/rtf.js'
            },
            writer: {}
        }
    };
};