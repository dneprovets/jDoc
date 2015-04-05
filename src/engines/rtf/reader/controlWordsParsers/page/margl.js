controlWordsParsers.margl = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            i = parseResult.pages.length;

        parseParams.pageData.dimensionCssRules.paddingLeft = {
            value: param / 20,
            unit: "pt"
        };
        parseParams.pageWidth -= parseParams.pageData.dimensionCssRules.paddingLeft.value;

        while (i--) {
            parseResult.pages[i].dimensionCssRules.paddingLeft = parseParams.pageData.dimensionCssRules.paddingLeft;
        }

        return {
            parseParams,
            parseResult
        };
    }
};