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

    var enginesConcatTaskName = "engines_concat",
        /**
         *
         * @param list {Array}
         * @param type {"reader"|"writer"}
         */
        concatEngines = function (list, type, isExclude) {
            list = list || [];

            isExclude = (isExclude == null) ? true : isExclude;

            var len = list.length,
                engineName,
                isNeedInclude,
                tasksList = [],
                enginesConcatTaskList = grunt.config.data[enginesConcatTaskName];

            for (engineName in enginesConcatTaskList) {
                isNeedInclude = false;
                if (isExclude) {
                    if (len && list.indexOf(engineName) < 0) {
                        isNeedInclude = true;
                    }
                } else {
                    if (!len || list.indexOf(engineName) >= 0) {
                        isNeedInclude = true;
                    }
                }

                if (
                    enginesConcatTaskList.hasOwnProperty(engineName) && isNeedInclude &&
                        enginesConcatTaskList[engineName][type]
                ) {
                    tasksList.push(enginesConcatTaskName + ":" + engineName + ":" + type);
                }
            }

            tasksList = tasksList.concat([
                'concat:app',
                'clean:engines',
                'uglify'
            ]);

            grunt.task.run(tasksList);
        },
        /**
         * @param type {"reader"|"writer"}
         * @returns {Array}
         */
        getEnginesList = function (type) {
            var flags = grunt.option.flags().join('').replace(/[=]/g, '').split('--'),
                i,
                flag,
                enginesConcatTaskList = grunt.config.data[enginesConcatTaskName] || {},
                engines = [],
                len = flags.length;

            console.log(flags);

            for (i = len - 1; i >= 0; i--) {
                flag = flags[i].replace(/^\-*/, '').toLowerCase();

                if (enginesConcatTaskList[flag] && enginesConcatTaskList[flag][type]) {
                    engines.push(flag);
                }
            }

            return engines;
        };

    grunt.registerTask('readers', function () {
        var type = "reader";
        concatEngines(getEnginesList(type), type, false);
    });
    grunt.registerTask('readers:include', function () {
        var type = "reader";
        concatEngines(getEnginesList(type), type, false);
    });
    grunt.registerTask('readers:exclude', function () {
        var type = "reader";
        concatEngines(getEnginesList(type), type, true);
    });
    grunt.registerTask('writers', function () {
        var type = "writer";
        concatEngines(getEnginesList(type), type, false);
    });
    grunt.registerTask('writers:include', function () {
        var type = "writer";
        concatEngines(getEnginesList(type), type, false);
    });
    grunt.registerTask('writers:exclude', function () {
        var type = "writer";
        concatEngines(getEnginesList(type), type, true);
    });
    grunt.registerTask('default', [
        'readers',
        'writers'/*,
         'jsdoc'*/
    ]);
};