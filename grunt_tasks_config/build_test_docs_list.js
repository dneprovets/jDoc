module.exports = function () {
    return {
        test_docs: {
            options: {
                name: "testDocsList",
                prefix: "../"
            },
            src: ['tests/docs/**/**.**'],
            dest: 'tests/testDocsList.js'
        }
    };
};