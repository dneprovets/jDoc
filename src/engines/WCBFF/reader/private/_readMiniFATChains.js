/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._readMiniFATChains = function (options) {
    if (options.from != options.fileBinaryReadData.ENDOFCHAIN) {
        var start = (options.from + 1) << options.fileBinaryReadData.sectorShift,
            i,
            self = this,
            callbacksCount = options.size,
            completeCallback = 0;

        for (i = 0; i < options.size; i += 4) {
            this._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: start + i,
                success: function (result) {
                    options.fileBinaryReadData.miniFATChains.push(result);
                    completeCallback += 4;

                    if (completeCallback >= callbacksCount) {
                        window.clearInterval(interval);

                        options.from = (
                            options.fileBinaryReadData.fatChains[options.from] != null
                        ) ? options.fileBinaryReadData.fatChains[options.from] : options.fileBinaryReadData.ENDOFCHAIN;

                        self._readMiniFATChains(options);
                    }
                }
            });
        }
    } else {
        if (typeof options.success === 'function') {
            options.success(options.fileBinaryReadData);
        }
    }
};