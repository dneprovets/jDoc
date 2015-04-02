module.exports = function () {
    return {
        files: ["build/jdoc.<%= version %>.js"],
        options: {
            js: {
                jslintHappy: true
            }
        }
    };
};