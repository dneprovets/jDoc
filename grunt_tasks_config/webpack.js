module.exports = function () {
    return {
        app: {
            entry: "./build/partials/core/jdoc/index.js",
            output: {
                path: "build/partials/",
                filename: "core.js"
            },

            stats: {
                // Configure the console output
                colors: false,
                modules: true,
                reasons: true
            },

            // Don't show progress
            progress: false
        }
    };
};

