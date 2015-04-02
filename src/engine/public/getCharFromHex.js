/**
 *
 * @param hex
 * @returns {string}
 * @private
 */
jDoc.Engine.prototype.getCharFromHex = {
    value (hex) {
        var code = parseInt(hex, 16);
        return !isNaN(code) ? String.fromCharCode(code) : "";
    }
};