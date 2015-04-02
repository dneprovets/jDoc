/**
 * @description clean trash
 */
module.exports = function () {
    return {
        options: {
            "no-write": true
        },
        start: [
            "build/**/*.js"
        ],

        engines: [
            "build/**/*.js",
            "!build/jdoc.*"
        ]
    };
};