/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._readDIFAT = function (options) {
    options.fileBinaryReadData.DIFAT = [];
    var i,
        successCount = 109,
        completeCallbacks = 0,
        self = this;

    for (i = 0; i < successCount; i++) {
        (function (x, context, options) {
            context._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: (0x4C + x * 4),
                success: function (result) {
                    options.fileBinaryReadData.DIFAT[x] = result;
                    completeCallbacks++;
                }
            });
        }(i, self, options));
    }

    var interval = window.setInterval(function () {
        if (successCount == completeCallbacks) {
            window.clearInterval(interval);

            if (options.fileBinaryReadData.fDIFAT != options.fileBinaryReadData.ENDOFCHAIN) {
                self._recursiveReadLastSectors({
                    fileBinaryReadData: options.fileBinaryReadData,
                    size: 1 << options.fileBinaryReadData.sectorShift,
                    j: 0,
                    from: options.fileBinaryReadData.fDIFAT,
                    success: options.success
                });
            } else {
                if (typeof options.success === 'function') {
                    options.success(options.fileBinaryReadData);
                }
            }
        }
    }, 100);
};