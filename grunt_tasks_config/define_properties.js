module.exports = function () {
    return {
        main: {
            options: {
                initFile: 'src/main/init.js'
            },
            src: [
                'src/main/{**/,}*.js',
                '!src/main/private/{**/,}*.js'
            ],

            dest: 'src/build/main.js'
        },

        unit: {
            options: {
                initFile: 'src/unit/init.js'
            },
            src: [
                'src/unit/{**/,}*.js',
                '!src/unit/private/{**/,}*.js'
            ],

            dest: 'src/build/unit.js'
        },

        engine: {
            options: {
                initFile: 'src/engine/init.js'
            },
            src: [
                'src/engine/{**/,}*.js',
                '!src/engine/private/{**/,}*.js'
            ],

            dest: 'src/build/engine.js'
        },

        events: {
            options: {
                initFile: 'src/events/init.js'
            },
            src: [
                'src/events/{**/,}*.js',
                '!src/events/private/{**/,}*.js'
            ],

            dest: 'src/build/events.js'
        },

        fileData: {
            options: {
                initFile: 'src/fileData/init.js'
            },
            src: [
                'src/fileData/{**/,}*.js',
                '!src/fileData/private/{**/,}*.js'
            ],

            dest: 'src/build/fileData.js'
        },

        dom: {
            options: {
                initFile: 'src/dom/init.js'
            },
            src: [
                'src/dom/{**/,}*.js',
                '!src/dom/private/{**/,}*.js'
            ],

            dest: 'src/build/dom.js'
        },

        "simple-reader": {
            options: {
                initFile: 'src/engines/simple/init.js'
            },
            src: [
                'src/engines/simple/reader/{**/,}*.js'
            ],

            dest: 'src/build/engines/simple_reader.js'
        },

        "dsv-reader": {
            options: {
                initFile: 'src/engines/dsv/init.js'
            },
            src: [
                'src/engines/dsv/reader/{**/,}*.js'
            ],

            dest: 'src/build/engines/dsv_reader.js'
        },

        "fiction-book-reader": {
            options: {
                initFile: 'src/engines/fictionBook/init.js'
            },
            src: [
                'src/engines/fictionBook/reader/{**/,}*.js'
            ],

            dest: 'src/build/engines/fiction_book_reader.js'
        },

        "rtf-reader": {
            options: {
                initFile: 'src/engines/rtf/init.js'
            },
            src: [
                'src/engines/rtf/reader/{**/,}*.js',
                '!src/engines/rtf/reader/private/{**/,}*.js'
            ],

            dest: 'src/build/engines/rtf_reader.js'
        },

        "odf-reader": {
            options: {
                initFile: 'src/engines/odf/init.js'
            },
            src: [
                'src/engines/odf/reader/{**/,}*.js',
                '!src/engines/odf/reader/private/{**/,}*.js'
            ],

            dest: 'src/build/engines/odf_reader.js'
        },

        "ooxml-reader": {
            options: {
                initFile: 'src/engines/ooxml/init.js'
            },
            src: [
                'src/engines/ooxml/reader/{**/,}*.js',
                '!src/engines/ooxml/reader/private/{**/,}*.js'
            ],

            dest: 'src/build/engines/ooxml_reader.js'
        }
    }
};