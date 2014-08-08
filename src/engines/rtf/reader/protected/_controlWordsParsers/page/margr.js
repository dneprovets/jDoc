RTF.prototype._controlWordsParsers.margr = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i;

    parseParams.pageData.dimensionCSSRules.paddingRight = {
        value: param / 20,
        unit: "pt"
    };
    parseParams.pageWidth -= parseParams.pageData.dimensionCSSRules.paddingRight.value;
    for (i = parseResult.pages.length - 1; i >= 0; i--) {
        parseResult.pages[i].dimensionCSSRules.paddingRight = parseParams.pageData.dimensionCSSRules.paddingRight;
    }
    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};