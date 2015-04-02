/**
 *
 * @returns {string}
 * @private
 */
jDoc.Engine.prototype.tabAsSpaces = {
    get: function () {
        var halfTab = this.halfTabAsSpaces;

        return halfTab + halfTab;
    }
};