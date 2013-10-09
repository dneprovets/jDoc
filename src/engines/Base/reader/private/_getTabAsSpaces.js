/**
 *
 * @returns {string}
 * @private
 */
jDoc.Engine.prototype._getTabAsSpaces = function () {
    var halfTab = this._getHalfTabAsSpaces();

    return halfTab + halfTab;
};