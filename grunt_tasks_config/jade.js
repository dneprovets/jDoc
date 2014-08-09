module.exports = function () {
    return {
        compile: {
            options: {
                pretty: true,
                data: {
                    version: '<%= version %>'
                }
            },
            files: {
                "tests/test.html": ["tests/test.jade"]
            }
        }
    };
};