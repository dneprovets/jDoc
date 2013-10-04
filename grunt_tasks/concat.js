module.exports = function () {
    return {
        app: {
            src: [
                'src/beginBanner.js',

                'src/browser.js',

                'src/main.js',
                'src/parsedFile.js',

                'src/utils/*.js',

                'src/utils/DOM/*.js',

                'src/engines/Base/engine.js',
                'src/engines/Base/extend.js',
                'src/engines/Base/reader/private/*.js',

                'src/build/*',
                '!src/build/jdoc.*',

                'src/endBanner.js'
            ],
            dest: 'src/build/jdoc.<%= version %>.js'
        }
    };
};