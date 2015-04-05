controlWordsParsers.margbsxn = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            i = parseResult.pages.length;

        if (!parseParams.pageData.dimensionCssRules.paddingBottom) {
            parseParams.pageData.dimensionCssRules.paddingBottom = {
                value: param / 20,
                unit: "pt"
            };
            parseParams.pageHeight -= parseParams.pageData.dimensionCssRules.paddingBottom.value;

            while (i--) {
                parseResult.pages[i].dimensionCssRules.paddingBottom = parseParams.pageData.dimensionCssRules.paddingBottom;
            }
        }

        return {
            parseParams,
            parseResult
        };
    }
};