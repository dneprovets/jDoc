/**
 *
 * @param hex
 * @returns {string}
 * @private
 */
jDoc.Engine.prototype._getCharFromHex = function (hex) {
    var code = parseInt(hex, 16);
    return !isNaN(code) ? String.fromCharCode(code) : "";
};