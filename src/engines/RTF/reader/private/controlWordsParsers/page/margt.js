jDoc.Engines.RTF.prototype.controlWordsParsers.margt = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i;

    parseParams.pageData.dimensionCSSRules.paddingTop = {
        value: param / 20,
        units: "pt"
    };
    for (i = parseResult.pages.length - 1; i >= 0; i--) {
        parseResult.pages[i].dimensionCSSRules.paddingTop = parseParams.pageData.dimensionCSSRules.paddingTop;
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};