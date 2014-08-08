module.exports = function () {
    return {
        files: ["src/build/jdoc.<%= version %>.js"],
        options: {
            js: {
                jslintHappy: true
            }
        }
    };
};