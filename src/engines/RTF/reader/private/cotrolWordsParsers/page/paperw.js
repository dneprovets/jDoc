jDoc.Engines.RTF.prototype.controlWordsParsers.paperw = function () {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        i;

    parseParams.pageData.dimensionCSSRules.width = {
        value: param / 20,
        units: "pt"
    };
    for (i = parseResult.pages.length - 1; i >= 0; i--) {
        parseResult.pages[i].dimensionCSSRules = jDoc.deepMerge(
            {},
            parseParams.pageData.dimensionCSSRules,
            parseResult.pages[i].dimensionCSSRules
        );
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};