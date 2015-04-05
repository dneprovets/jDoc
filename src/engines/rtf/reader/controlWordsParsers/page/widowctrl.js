controlWordsParsers.widowctrl = {
    value (options = {}) {
        var {parseParams, parseResult} = options,
            i = parseResult.pages.length;

        parseParams.pageData.attributes.spellcheck = true;

        while (i--) {
            parseResult.pages[i].attributes.spellcheck = parseParams.pageData.attributes.spellcheck;
        }
        return {
            parseParams,
            parseResult
        };
    }
};