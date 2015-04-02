RTF.prototype._controlWordsParsers.margrsxn = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
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
        parseParams: parseParams,
        parseResult: parseResult
    };
};