RTF.prototype._controlWordsParsers.paperh = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i = parseResult.pages.length;

    parseParams.pageData.dimensionCssRules.height = {
        value: param / 20,
        unit: "pt"
    };
    if (parseParams.pageHeight > 0) {
        parseParams.pageHeight = 0;
    }

    parseParams.pageHeight += parseParams.pageData.dimensionCssRules.height.value;

    while (i--) {
        parseResult.pages[i].dimensionCssRules.height = parseParams.pageData.dimensionCssRules.height;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};