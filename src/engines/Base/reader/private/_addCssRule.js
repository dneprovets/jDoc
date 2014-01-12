/**
 *
 * @param cssList
 * @param rule
 * @param value
 * @return {*}
 * @private
 */
jDoc.Engine.prototype._addCssRule = function (cssList, rule, value) {
    if (rule === "boxShadow") {
        cssList.webkitBoxShadow = value;
        cssList.mozBoxShadow = value;
        cssList.oBoxShadow = value;
        cssList.msBoxShadow = value;
        cssList.boxShadow = value;
    } else {
        cssList[rule] = value;
    }

    return cssList;
};