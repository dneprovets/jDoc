module.exports = function () {
    return {
        dist : {
            src: ['build/jdoc.<%= version %>.js'],
            options: {
                destination: 'doc'
            }
        }
    };
};