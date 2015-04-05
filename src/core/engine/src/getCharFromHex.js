/**
 *
 * @param hex
 * @returns {string}
 * @private
 */
export default {
    value (hex) {
        var code = parseInt(hex, 16);
        return !isNaN(code) ? String.fromCharCode(code) : "";
    }
};