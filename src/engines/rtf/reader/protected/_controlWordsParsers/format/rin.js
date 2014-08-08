/**
 *
 * @param options
 * @returns {*}
 */
RTF.prototype._controlWordsParsers.rin = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        propertyName,
        param = options.param;

    if (parseParams.currentTextElementParent) {
        if (parseParams.currentTextElementParent.css.direction === "rtl") {
            propertyName = "paddingLeft";
        } else {
            propertyName = "paddingRight";
        }

        parseParams.currentTextElementParent.dimensionCSSRules[propertyName] = {
            value: param / 20,
            unit: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};