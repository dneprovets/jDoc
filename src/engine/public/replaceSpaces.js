/**
 *
 * @param str
 * @returns {string}
 * @private
 */
jDoc.Engine.prototype.replaceSpaces = {
    value (str) {
        str = (str || "").replace(/\s{2,}/g, this.halfTabAsSpaces);
        return str;
    }
};