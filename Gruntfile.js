module.exports = function (grunt) {
    var config = {
        beginBanner: {
            src: "function"
        },

        version: JSON.parse(grunt.file.read("package.json")).version
    };

    grunt.initConfig(config);

    /**
     * include tasks
     */
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve(__dirname + '/grunt_tasks'),
        fileExtensions: ['js']
    }, function (err) {
        grunt.log.error(err);
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jdoc-engines-concat');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('default', [
        'engines_concat',
        'concat:app',
        'clean:engines',
        'uglify'/*,
        'jsdoc'*/
    ]);
};