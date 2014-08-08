RTF.prototype._controlWordsParsers.paperw = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i;

    parseParams.pageData.dimensionCSSRules.width = {
        value: param / 20,
        unit: "pt"
    };
    if (parseParams.pageWidth > 0) {
        parseParams.pageWidth = 0;
    }
    parseParams.pageWidth = parseParams.pageData.dimensionCSSRules.width.value;
    for (i = parseResult.pages.length - 1; i >= 0; i--) {
        parseResult.pages[i].dimensionCSSRules.width = parseParams.pageData.dimensionCSSRules.width;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};