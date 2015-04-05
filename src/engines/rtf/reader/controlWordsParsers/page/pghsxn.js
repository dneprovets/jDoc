controlWordsParsers.pghsxn = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            i = parseResult.pages.length;

        if (!parseParams.pageData.dimensionCssRules.height) {
            parseParams.pageData.dimensionCssRules.height = {
                value: param / 20,
                unit: "pt"
            };
            if (parseParams.pageHeight > 0) {
                parseParams.pageHeight = 0;
            }
            parseParams.pageHeight -= parseParams.pageData.dimensionCssRules.height.value;

            while (i--) {
                parseResult.pages[i].dimensionCssRules.height = parseParams.pageData.dimensionCssRules.height;
            }
        }

        return {
            parseParams,
            parseResult
        };
    }
};