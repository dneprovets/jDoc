/**
 *
 * @param options
 */
jDoc.engines.RTF.prototype._controlWordsParsers.pict = function (options) {
    var parseParams = options.parseParams,
        parseResult = options.parseResult;

    parseParams.currentTextElementParent = this._initImage({
        data: parseParams.currentTextElementParent
    });

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};