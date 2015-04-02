/**
 *
 * @param options
 * @returns {*}
 */
RTF.prototype._controlWordsParsers.lin = function (options) {
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

        parseParams.currentTextElementParent.dimensionCssRules[propertyName] = {
            value: param / 20,
            unit: "pt"
        };
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};