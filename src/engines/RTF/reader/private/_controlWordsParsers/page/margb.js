jDoc.engines.RTF.prototype._controlWordsParsers.margb = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i;

    parseParams.pageData.dimensionCSSRules.paddingBottom = {
        value: param / 20,
        units: "pt"
    };
    parseParams.pageHeight -= parseParams.pageData.dimensionCSSRules.paddingBottom.value;
    for (i = parseResult.pages.length - 1; i >= 0; i--) {
        parseResult.pages[i].dimensionCSSRules.paddingBottom = parseParams.pageData.dimensionCSSRules.paddingBottom;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};