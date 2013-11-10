/**
 *
 * @param str
 * @returns {string}
 * @private
 */
jDoc.Engine.prototype._replaceSpaces = function (str) {
    str = (str || "").replace(/\s{2,}/g, this._getHalfTabAsSpaces());
    return str;
};