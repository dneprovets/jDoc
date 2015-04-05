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
        end: [
            "build/**/*.js",
            "build/partials/**/*.js",
            "!build/jdoc.*"
        ]
    };
};