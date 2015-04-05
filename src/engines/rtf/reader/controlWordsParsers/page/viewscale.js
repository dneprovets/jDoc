controlWordsParsers.viewscale = {
    value (options = {}) {
        var {parseParams, parseResult, param} = options;

        if (param) {
            parseResult.zoom = param;
        }

        return {
            parseParams,
            parseResult
        };
    }
};