RTF.prototype._controlWordsParsers.widowctrl = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult,
        i = parseResult.pages.length;

    parseParams.pageData.attributes.spellcheck = true;

    while (i--) {
        parseResult.pages[i].attributes.spellcheck = parseParams.pageData.attributes.spellcheck;
    }
    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};