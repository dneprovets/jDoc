module.exports = function () {
    return {
        dist : {
            src: ['src/build/jdoc.<%= version %>.js'],
            options: {
                destination: 'doc'
            }
        }
    };
};