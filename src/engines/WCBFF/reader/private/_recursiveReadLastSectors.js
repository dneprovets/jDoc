/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._recursiveReadLastSectors = function (options) {
    var start = (options.from + 1) << options.fileBinaryReadData.sectorShift,
        successCount = (options.size - 4),
        i,
        completeCallbacks = 0,
        self = this;

    for (i = 0; i < successCount; i += 4) {
        (function (x) {
            self._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: start + x,
                success: function (result) {
                    options.fileBinaryReadData.DIFAT.push(result);
                    completeCallbacks++;
                }
            });
        }(i));
    }

    var interval = window.setInterval(function () {
        if (completeCallbacks >= successCount) {
            window.clearInterval(interval);

            self._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: start + i,
                success: function (result) {
                    options.from = result;

                    if (!(options.from != options.fileBinaryReadData.ENDOFCHAIN && ++options.j < options.fileBinaryReadData.cDIFAT)) {

                        if (typeof options.success === 'function') {
                            options.success(options.fileBinaryReadData);
                        }
                    } else {
                        self._recursiveReadLastSectors(options);
                    }

                    return true;
                }
            });
        }
    }, 100);
};