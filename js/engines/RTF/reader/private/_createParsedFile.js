/**
 *
 * @param text {String}
 * @param callback {function}
 * @private
 */
jDoc.Engines.RTF.prototype._createParsedFile = function (text, callback) {
    console.log(text.split(/\{\s*\\/));

    if (typeof callback === 'function') {
        callback(
            new jDoc.ParsedFile({
                pages: [{
                    options: {},
                    css: {},
                    elements: []
                }]
            })
        );
    }
};