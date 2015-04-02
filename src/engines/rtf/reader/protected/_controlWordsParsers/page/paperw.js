RTF.prototype._controlWordsParsers.paperw = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
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
        parseParams: parseParams,
        parseResult: parseResult
    };
};