module.exports = function (grunt) {
    var config = {
            beginBanner: {
                src: "function"
            },

            delete_tmp_files: {
                src: ['build/engines/']
            },

            version: JSON.parse(grunt.file.read("package.json")).version
        },
        mainTasks = [
            'clean:start',
            'babel:core',
            'webpack:app',
            'concat:app'
            //'jsbeautifier',
            //'uglify'

            /*'build_test_docs_list',
            'define_properties:main',
            'define_properties:unit',
            'define_properties:fileData',
            'define_properties:engine',
            'define_properties:dom'*/
        ],
        endTasks = [
            'clean:end'
        ];

    grunt.initConfig(config);

    /**
     * include tasks
     */
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve(__dirname + '/grunt_tasks_config'),
        fileExtensions: ['js']
    }, function (err) {
        grunt.log.error(err);
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerMultiTask('build_test_docs_list', ' ', function() {
        var options = this.options({
            name: "",
            prefix: ""
        });

        this.files.forEach(function(f) {
            var src = "window['" + options.name + "'] = [\n";

            f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                }

                return true;
            }).forEach(function (filepath) {
                src += '    "' + options.prefix + filepath + '",\n';
            });

            src = src.replace(/\,\s+$/, '\n') + "];";

            grunt.file.write(f.dest, src);
        });
    });

    grunt.registerTask('default', function () {
        concatEngines({
            isReaders: true,
            isWriters: true
        });
    });
    grunt.registerTask('readers', function () {
        concatEngines({
            isReaders: true
        });
    });
    grunt.registerTask('readers:include', function () {
        concatEngines();
    });
    grunt.registerTask('readers:exclude', function () {
        concatEngines();
    });
    grunt.registerTask('writers', function () {
        concatEngines({
            isWriters: true
        });
    });
    grunt.registerTask('writers:include', function () {
        concatEngines();
    });
    grunt.registerTask('writers:exclude', function () {
        concatEngines();
    });

    function concatEngines (options) {
        options = options || {};

        var taskName = 'define_properties',
            taskConfig = grunt.config.get(taskName),
            readersPattern = /\-reader/,
            writersPattern = /\-writer/,
            tasksList = [],
            k;

        for (k in taskConfig) {
            if (taskConfig.hasOwnProperty(k)) {
                if ((options.isReaders && readersPattern.test(k)) || (options.isWriters && writersPattern.test(k))) {
                    tasksList.push(taskName + ':' + k);
                }
            }
        }

        grunt.task.run(mainTasks.concat(endTasks));
    }
};