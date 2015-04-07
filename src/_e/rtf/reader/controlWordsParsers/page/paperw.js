controlWordsParsers.paperw = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            i = parseResult.pages.length;

        parseParams.pageData.dimensionCssRules.width = {
            value: param / 20,
            unit: "pt"
        };
        if (parseParams.pageWidth > 0) {
            parseParams.pageWidth = 0;
        }
        parseParams.pageWidth = parseParams.pageData.dimensionCssRules.width.value;

        while (i--) {
            parseResult.pages[i].dimensionCssRules.width = parseParams.pageData.dimensionCssRules.width;
        }

        return {
            parseParams,
            parseResult
        };
    }
};