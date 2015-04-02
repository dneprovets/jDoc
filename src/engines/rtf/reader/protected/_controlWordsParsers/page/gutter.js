RTF.prototype._controlWordsParsers.gutter = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i = parseResult.pages.length;

    parseParams.pageData.dimensionCssRules.marginTop = {
        value: param / 20,
        unit: "pt"
    };

    while (i--) {
        parseResult.pages[i].dimensionCssRules.marginTop = parseParams.pageData.dimensionCssRules.marginTop;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};