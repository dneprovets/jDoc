/**
 *
 * @param options
 * @returns {*}
 */
jDoc.engines.RTF.prototype._controlWordsParsers.lin = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        propertyName,
        param = options.param;

    if (parseParams.currentTextElementParent) {
        if (parseParams.currentTextElementParent.css.direction === "rtl") {
            propertyName = "paddingRight";
        } else {
            propertyName = "paddingLeft";
        }

        parseParams.currentTextElementParent.dimensionCSSRules[propertyName] = {
            value: param / 20,
            units: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};