jDoc.engines.RTF.prototype._controlWordsParsers.widowctrl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        i;

    parseParams.pageData.attributes.spellcheck = true;

    for (i = parseResult.pages.length - 1; i >= 0; i--) {
        parseResult.pages[i].attributes.spellcheck = parseParams.pageData.attributes.spellcheck;
    }
    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};