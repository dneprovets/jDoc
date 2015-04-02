/**
 *
 * @returns {string}
 * @private
 */
jDoc.Engine.prototype.tabAsSpaces = {
    get () {
        var halfTab = this.halfTabAsSpaces;

        return halfTab + halfTab;
    }
};