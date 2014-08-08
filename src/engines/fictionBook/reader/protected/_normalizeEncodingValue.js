/**
 *
 * @param value
 * @return {String}
 * @private
 */
FictionBook.prototype._normalizeEncodingValue = function (value) {
    var result = "utf-8";

    if (value) {
        result = value.replace(/^windows-/i, 'cp');
    }

    return result;
};