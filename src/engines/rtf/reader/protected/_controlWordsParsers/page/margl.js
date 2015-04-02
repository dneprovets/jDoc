RTF.prototype._controlWordsParsers.margl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
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
        parseParams: parseParams,
        parseResult: parseResult
    };
};