/**
 * @description Reset paragraph properties to default
 * @param el
 * @private
 */
jDoc.Engines.RTF.prototype._resetParagraphProperties = function (el) {
    var i,
        deletedRules = this._paragraphPropertiesForDelete.dimensionCSSRules,
        len = deletedRules ? deletedRules.length : 0;

    for (i = len - 1; i >= 0; i--) {
        delete el.dimensionCSSRules[deletedRules[i]];
    }

    return el;
};