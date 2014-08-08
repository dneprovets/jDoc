/**
 *
 * @param str
 * @returns {string}
 * @private
 */
jDoc.Engine.prototype.replaceSpaces = function (str) {
    str = (str || "").replace(/\s{2,}/g, this.getHalfTabAsSpaces());
    return str;
};