RTF.prototype._controlWordsParsers.margbsxn = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
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
        parseParams: parseParams,
        parseResult: parseResult
    };
};