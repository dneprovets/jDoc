/**
 *
 * @param options
 * @returns {*}
 */
controlWordsParsers.lin = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            propertyName;

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
            parseParams,
            parseResult
        };
    }
};