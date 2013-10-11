jDoc.Engines.RTF.prototype.controlWordsParsers.margb = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i;

    parseParams.pageData.dimensionCSSRules.paddingBottom = {
        value: param / 20,
        units: "pt"
    };
    for (i = parseResult.pages.length - 1; i >= 0; i--) {
        parseResult.pages[i].dimensionCSSRules.paddingBottom = parseParams.pageData.dimensionCSSRules.paddingBottom;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};