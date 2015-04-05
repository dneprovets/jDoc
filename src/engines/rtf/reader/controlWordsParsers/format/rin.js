/**
 *
 * @param options
 * @returns {*}
 */
controlWordsParsers.rin = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            propertyName;

        if (parseParams.currentTextElementParent) {
            if (parseParams.currentTextElementParent.css.direction === "rtl") {
                propertyName = "paddingLeft";
            } else {
                propertyName = "paddingRight";
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