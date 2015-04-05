module.exports = function (grunt) {
    var coreFiles = grunt.file.expand([
        'src/core/**/*.js'
    ]).map(function (f) {
        return {
            src: [f],
            dest: f.replace(/^src/, 'build/partials')
        };
    });

    return {
        core: {
            options: {
                modules: 'commonStrict'
            },
            files: coreFiles
        }
    };
};