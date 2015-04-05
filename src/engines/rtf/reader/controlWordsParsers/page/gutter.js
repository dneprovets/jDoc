controlWordsParsers.gutter = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options,
            i = parseResult.pages.length;

        parseParams.pageData.dimensionCssRules.marginTop = {
            value: param / 20,
            unit: "pt"
        };

        while (i--) {
            parseResult.pages[i].dimensionCssRules.marginTop = parseParams.pageData.dimensionCssRules.marginTop;
        }

        return {
            parseParams,
            parseResult
        };
    }
};