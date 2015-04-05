/**
 *
 * @param str
 * @returns {string}
 * @private
 */
export default {
    value (str) {
        str = (str || "").replace(/\s{2,}/g, this.halfTabAsSpaces);
        return str;
    }
};