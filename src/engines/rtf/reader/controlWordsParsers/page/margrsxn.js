controlWordsParsers.margrsxn = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            i = parseResult.pages.length;

        if (!parseParams.pageData.dimensionCssRules.paddingRight) {
            parseParams.pageData.dimensionCssRules.paddingRight = {
                value: param / 20,
                unit: "pt"
            };
            parseParams.pageWidth -= parseParams.pageData.dimensionCssRules.paddingRight.value;

            while (i--) {
                parseResult.pages[i].dimensionCssRules.paddingRight = parseParams.pageData.dimensionCssRules.paddingRight;
            }

        }

        return {
            parseParams,
            parseResult
        };
    }
};