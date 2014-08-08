module.exports = function () {
    return {
        static: {
            options: {
                keepalive: true,
                hostname: 'localhost',
                port: 9000
            }
        }
    }
};