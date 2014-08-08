module.exports = function () {
    return {
        test_docs: {
            options: {
                name: "testDocsList",
                prefix: "http://localhost:9000/"
            },
            src: ['tests/docs/**/**.**'],
            dest: 'tests/testDocsList.js'
        }
    };
};