jDoc.engines.RTF.prototype._controlWordsParsers.pghsxn = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        param = options.param,
        i;

    if (!parseParams.pageData.dimensionCSSRules.height) {
        parseParams.pageData.dimensionCSSRules.height = {
            value: param / 20,
            units: "pt"
        };
        if (parseParams.pageHeight > 0) {
            parseParams.pageHeight = 0;
        }
        parseParams.pageHeight -= parseParams.pageData.dimensionCSSRules.height.value;
        for (i = parseResult.pages.length - 1; i >= 0; i--) {
            parseResult.pages[i].dimensionCSSRules.height = parseParams.pageData.dimensionCSSRules.height;
        }
    }

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};