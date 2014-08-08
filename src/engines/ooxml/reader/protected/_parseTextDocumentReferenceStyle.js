/**
 *
 * @param styleValue
 * @return {Object}
 * @private
 */
OOXML.prototype._parseTextDocumentReferenceStyle = function (styleValue) {
    var result = {
        css: {},
        dimensionCSSRules: {}
    };

    styleValue = styleValue ? styleValue.toLowerCase() : styleValue;

    if (styleValue === "strong") {
        result.css.fontWeight = "bold";
    }

    return result;
};