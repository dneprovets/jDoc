/**
 *
 * @param options
 */
controlWordsParsers.pict = {
    value (options = {}) {
        var {parseParams, parseResult} = options;

        parseParams.currentTextElementParent = this._initImage({
            data: parseParams.currentTextElementParent
        });

        return {
            parseParams,
            parseResult
        };
    }
};