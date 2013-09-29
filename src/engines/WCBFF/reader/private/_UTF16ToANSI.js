/**
 *
 * @param options
 * @return {String}
 * @private
 */
jDoc.Engines.WCBFF.prototype._UTF16ToANSI = function (options) {
    var result = "",
        i,
        len = options.data.length;

    for (i = len - 1; i >= 0; i--) {
        if (options.data[i] != 0) {
            result = String.fromCharCode(options.data[i]) + result;
        }
    }

    return result;
};