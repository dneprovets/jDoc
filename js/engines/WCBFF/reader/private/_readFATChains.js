/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._readFATChains = function (options) {
    var j,
        from,
        callbacksCount = options.size,
        completeCallbacksCounter = 0,
        self = this;

    if (options.i < options.len) {
        from = (options.fileBinaryReadData.DIFAT[options.i] + 1) << options.fileBinaryReadData.sectorShift;

        for (j = 0; j < options.size; j += 4) {
            (function (x, context, options) {
                context._getLong({
                    fileBinaryReadData: options.fileBinaryReadData,
                    from: from + x,
                    success: function (result) {
                        options.fileBinaryReadData.fatChains.push(result);
                        completeCallbacksCounter += 4;
                    }
                });
            }(j, self, options));
        }

        var interval = window.setInterval(function () {
            if (completeCallbacksCounter >= callbacksCount) {
                window.clearInterval(interval);
                options.i++;
                self._readFATChains(options);
            }
        }, 100);
    } else {
        if (typeof options.success === 'function') {
            options.success(options.fileBinaryReadData);
        }
    }
};