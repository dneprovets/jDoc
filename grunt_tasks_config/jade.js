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
                "run/test.html": ["run/test.jade"]
            }
        }
    };
};