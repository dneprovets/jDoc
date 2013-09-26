module.exports = function (grunt) {
    var config = {
        beginBanner: {
            src: "function"
        },

        version: JSON.parse(grunt.file.read("package.json")).version,

        concat: {
            app: {
                src: [
                    'js/beginBanner.js',

                    '../cdn/js/browser.js',

                    'js/main.js',
                    'js/parsedFile.js',

                    'js/utils/*.js',

                    'js/utils/DOM/*.js',

                    'js/engines/Base/engine.js',
                    'js/engines/Base/extend.js',
                    'js/engines/Base/reader/private/*.js',

                    'js/build/*',
                    '!js/build/jdoc.*',

                    'js/endBanner.js'
                ],
                dest: 'js/build/jdoc.<%= version %>.js'
            }
        },

        uglify: {
            options: {
                compress: true,
                report:   false
            },
            js:      {
                'src':  'js/build/jdoc.<%= version %>.js',
                'dest': 'js/build/jdoc.<%= version %>.min.js'
            }
        },

        jsdoc : {
            dist : {
                src: ['js/build/jdoc.<%= version %>.js'],
                options: {
                    destination: 'doc'
                }
            }
        },

        engineConcat: {
            simple: {
                options: {
                    namespace: 'jDoc.Engines.Simple.prototype',
                    mainFilePath: 'js/engines/Simple/main.js'
                },
                src: [
                    'js/engines/Simple/reader/private/*.js',
                    'js/engines/Simple/reader/public/*.js'
                ],
                dest: 'js/build/simple.js'
            },

            odf: {
                options: {
                    namespace: 'jDoc.Engines.ODF.prototype',
                    mainFilePath: 'js/engines/ODF/main.js'
                },
                src: [
                    'js/engines/ODF/reader/private/*.js'
                ],
                dest: 'js/build/odf.js'
            },

            oxml: {
                options: {
                    namespace: 'jDoc.Engines.OXML.prototype',
                    mainFilePath: 'js/engines/OXML/main.js'
                },
                src: [
                    'js/engines/OXML/reader/private/*.js'
                ],
                dest: 'js/build/oxml.js'
            },

            dsv: {
                options: {
                    namespace: 'jDoc.Engines.DSV.prototype',
                    mainFilePath: 'js/engines/DSV/main.js'
                },
                src: [
                    'js/engines/DSV/reader/private/*.js',
                    'js/engines/DSV/reader/public/*.js'
                ],
                dest: 'js/build/dsv.js'
            },

            /*
            wcbff: {
                options: {
                    namespace: 'jDoc.Engines.WCBFF.prototype',
                    mainFilePath: 'js/engines/WCBFF/main.js'
                },
                src: [
                    'js/engines/WCBFF/reader/private/*.js',
                    'js/engines/WCBFF/reader/public/*.js'
                ],
                dest: 'js/build/wcbff.js'
            },*/

            fictionBook: {
                options: {
                    namespace: 'jDoc.Engines.FictionBook.prototype',
                    mainFilePath: 'js/engines/FictionBook/main.js'
                },
                src: [
                    'js/engines/FictionBook/reader/private/*.js',
                    'js/engines/FictionBook/reader/public/*.js'
                ],
                dest: 'js/build/fb2.js'
            }
        },

        clean: {
            start: [
                "js/build/*.js",
                "js/build/*/*.js"
            ],

            engines: [
                "js/build/*.js",
                "!js/build/jdoc.*"
            ]
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerMultiTask('engineConcat', function () {
        var options = this.options({
            namespace: '',
            mainFilePath: '',
            separator: ',\n'
        });

        if (!options.namespace) {
            grunt.log.warn('Namespace is required');
            return false;
        }

        if (!grunt.file.exists(options.mainFilePath)) {
            grunt.log.warn('mainFilePath "' + options.mainFilePath + '" not found.');
            return false;
        }

        options.namespace = options.namespace.replace(/\.$/, '') + '.';

        this.files.forEach(function(f) {

            var mainFileSource,
                tab = '        ',
                src = f.src.filter(function(filepath) {
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }).map(function(filepath) {
                    // Read file source.
                    var src = grunt.file.read(filepath),
                        name;

                    name = new RegExp(options.namespace + '([_a-zA-Z0-9]+)\\s*=').exec(src);

                    if (name && name[1]) {
                        src = src.replace(new RegExp(options.namespace + name[1] + '\\s*='), name[1] + ':')
                            .replace(/;\s*$/, '');
                    }

                    return tab + src.replace(/\n/g, '\n' + tab).replace(/^\s*/, '');
                }).join(options.separator);

            mainFileSource = grunt.file.read(options.mainFilePath);

            mainFileSource = mainFileSource.replace('//[ENGINE]', src);

            // Write the destination file.
            grunt.file.write(f.dest, mainFileSource);

            // Print a success message.
            grunt.log.writeln('File "' + f.dest + '" beautifying');
        });
    });

    grunt.registerTask('default', [
        'engineConcat',
        'concat:app',
        'clean:engines',
        'uglify'/*,
        'jsdoc'*/
    ]);
};