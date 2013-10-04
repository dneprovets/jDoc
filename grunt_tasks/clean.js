/**
 * @description clean trash
 */
module.exports = function () {
    return {
        start: [
            "src/build/*.js",
            "src/build/*/*.js"
        ],

        engines: [
            "src/build/*.js",
            "!src/build/jdoc.*"
        ]
    };
};