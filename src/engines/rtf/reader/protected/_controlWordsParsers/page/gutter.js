RTF.prototype._controlWordsParsers.gutter = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i;

    parseParams.pageData.dimensionCSSRules.marginTop = {
        value: param / 20,
        unit: "pt"
    };
    for (i = parseResult.pages.length - 1; i > 0; i--) {
        parseResult.pages[i].dimensionCSSRules.marginTop = parseParams.pageData.dimensionCSSRules.marginTop;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};