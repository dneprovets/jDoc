/**
 * @description clean trash
 */
module.exports = function () {
    return {
        options: {
            "no-write": true
        },
        start: [
            "src/build/**/*.js"
        ],

        engines: [
            "src/build/**/*.js",
            "!src/build/jdoc.*"
        ]
    };
};