controlWordsParsers.margtsxn = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            i = parseResult.pages.length;

        if (!parseParams.pageData.dimensionCssRules.paddingTop) {
            parseParams.pageData.dimensionCssRules.paddingTop = {
                value: param / 20,
                unit: "pt"
            };
            parseParams.pageHeight -= parseParams.pageData.dimensionCssRules.paddingTop.value;

            while (i--) {
                parseResult.pages[i].dimensionCssRules.paddingTop = parseParams.pageData.dimensionCssRules.paddingTop;
            }
        }

        return {
            parseParams,
            parseResult
        };
    }
};