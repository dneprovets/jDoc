module.exports = function () {
    return {
        app: {
            entry: "./build/partials/index.js",
            output: {
                path: "build/",
                filename: "jdoc.<%= version %>.js"
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

