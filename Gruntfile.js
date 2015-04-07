module.exports = function (grunt) {
    var enginesPaths = grunt.file.expand([
            'src/engines/*'
        ]),
        readers = grunt.option('readers'),
        writers = grunt.option('writers'),
        readersAsString = String(readers || '').toLowerCase(),
        writersAsString = String(writers || '').toLowerCase(),
        config = {
            beginBanner: {
                src: "function"
            },

            enginesPaths: [],

            readers: [],

            writers: [],

            version: JSON.parse(grunt.file.read("package.json")).version
        };

    enginesPaths.forEach(function (path) {
        var required = false,
            engineName = path.split('/').pop();

        if (readers && (readers === true || readers === 'all' || (readersAsString.indexOf(engineName) >= 0))) {
            required = true;
            config.readers.push(engineName);
        }
        if (writers && (readers === true || readers === 'all' || (writersAsString.indexOf(engineName) >= 0))) {
            required = true;
            config.writers.push(engineName);
        }

        config.enginesPaths.push(path);
    });

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

    grunt.registerTask('build', [
        'clean:start',
        'babel:libs',
        'babel:core',
        'babel:engines',
        'concat:partials',
        'webpack:app',
        'concat:app',
        //'jsbeautifier',
        'uglify',
        'build_test_docs_list',
        'clean:end'
    ]);
};