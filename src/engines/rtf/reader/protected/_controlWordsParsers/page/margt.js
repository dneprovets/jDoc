RTF.prototype._controlWordsParsers.margt = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i = parseResult.pages.length;

    parseParams.pageData.dimensionCssRules.paddingTop = {
        value: param / 20,
        unit: "pt"
    };
    parseParams.pageHeight -= parseParams.pageData.dimensionCssRules.paddingTop.value;

    while (i--) {
        parseResult.pages[i].dimensionCssRules.paddingTop = parseParams.pageData.dimensionCssRules.paddingTop;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};