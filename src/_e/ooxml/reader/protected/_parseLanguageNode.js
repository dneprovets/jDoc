/**
 *
 * @param node
 * @return {Object}
 * @private
 */
OOXML.prototype._parseLanguageNode = function (node) {
    var result = {
        latin: null,
        eastAsia: null,
        complexLanguage: null
    };
    if (node) {
        result.latin = (node.attributes['w:val']) ? node.attributes['w:val'] || result.latin : result.latin;
        result.complexLanguage =
            (node.attributes['w:bidi']) ? (
                node.attributes['w:bidi'] || result.complexLanguage
                ) : result.complexLanguage;
        result.eastAsia = (node.attributes['w:eastAsia']) ? (
            node.attributes['w:eastAsia'] || result.eastAsia
            ) : result.eastAsia;
    }
    return result;
};