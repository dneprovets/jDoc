/**
 *
 * @returns {string}
 * @private
 */
jDoc.Engine.prototype.getTabAsSpaces = function () {
    var halfTab = this.getHalfTabAsSpaces();

    return halfTab + halfTab;
};