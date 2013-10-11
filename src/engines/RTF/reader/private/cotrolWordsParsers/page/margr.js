jDoc.Engines.RTF.prototype.controlWordsParsers.margr = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i;

    parseParams.pageData.dimensionCSSRules.paddingRight = {
        value: param / 20,
        units: "pt"
    };
    for (i = parseResult.pages.length - 1; i >= 0; i--) {
        parseResult.pages[i].dimensionCSSRules.paddingRight = parseParams.pageData.dimensionCSSRules.paddingRight;
    }
    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};