module.exports = function (grunt) {
    var enginesPaths = grunt.config.get('enginesPaths'),
        coreFiles,
        enginesFiles = [];

    coreFiles = grunt.file.expand([
        'src/core/**/*.js'
    ]).map(function (f) {
        return {
            src: [f],
            dest: f.replace(/^src/, 'build/partials')
        };
    });

    enginesPaths.forEach(function (path) {
        grunt.file.expand([
            path + '/**/*.js'
        ]).forEach(function (f) {
            enginesFiles.push({
                src: [f],
                dest: f.replace(/^src/, 'build/partials')
            });
        });
    });

   return {
        libs: {
            options: {
                modules: 'commonStrict'
            },
            files: [
                {
                    src: ['src/libs/polyfills/object.js'],
                    dest: 'build/partials/libs/polyfills/object.js'
                },
                {
                    src: ['src/libs/utils/browser.js'],
                    dest: 'build/partials/libs/utils/browser.js'
                },
                {
                    src: ['src/libs/utils/getMimeTypeByName.js'],
                    dest: 'build/partials/libs/utils/getMimeTypeByName.js'
                },
                {
                    src: ['src/libs/utils/isFunction.js'],
                    dest: 'build/partials/libs/utils/isFunction.js'
                },
                {
                    src: ['src/libs/zip/zip.js'],
                    dest: 'build/partials/libs/zip/zip.js'
                },
                {
                    src: ['src/libs/zip/zipEngine.js'],
                    dest: 'build/partials/libs/zip/zipEngine.js'
                }
            ]
        },
        core: {
            options: {
                modules: 'commonStrict'
            },
            files: coreFiles
        },
        engines: {
            options: {
                modules: 'commonStrict'
            },
            files: enginesFiles
        }
    };
};