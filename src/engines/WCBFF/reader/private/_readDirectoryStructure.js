/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._readDirectoryStructure = function (options) {
    var start,
        i,
        self = this,
        callbacksCount = options.size,
        completeCallback = 0,
        innerCallbacksCount = 6,
        completeInnerCallback = 0;

    if (options.from != options.fileBinaryReadData.ENDOFCHAIN) {
        start = (options.from + 1) << options.fileBinaryReadData.sectorShift;

        for (i = 0; i < options.size; i += 128) {
            options.fileBinaryReadData.binaryData.readUint8Array({
                index: start + i,
                length: 128,
                success: function (entry) {
                    var data = {
                        "type": entry[0x42],
                        "color": entry[0x43]
                    };

                    self._getShort({
                        from: 0x40,
                        data: entry,
                        fileBinaryReadData: options.fileBinaryReadData,
                        success: function (res) {
                            var bytes = options.fileBinaryReadData.binaryData.excludeUintArray({
                                data: entry,
                                index: 0,
                                length: res
                            });

                            data.name = self._UTF16ToANSI({
                                data: bytes,
                                fileBinaryReadData: options.fileBinaryReadData
                            });
                            completeInnerCallback++;
                        }
                    });

                    self._getLong({
                        from: 0x44,
                        data: entry,
                        fileBinaryReadData: options.fileBinaryReadData,
                        success: function (res) {
                            data.left = res;
                            completeInnerCallback++;
                        }
                    });

                    self._getLong({
                        from: 0x48,
                        data: entry,
                        fileBinaryReadData: options.fileBinaryReadData,
                        success: function (res) {
                            data.right = res;
                            completeInnerCallback++;
                        }
                    });

                    self._getLong({
                        from: 0x4C,
                        data: entry,
                        fileBinaryReadData: options.fileBinaryReadData,
                        success: function (res) {
                            data.child = res;
                            completeInnerCallback++;
                        }
                    });

                    self._getLong({
                        from: 0x74,
                        data: entry,
                        fileBinaryReadData: options.fileBinaryReadData,
                        success: function (res) {
                            data.start = res;
                            completeInnerCallback++;
                        }
                    });

                    self._getSomeBytes({
                        from: 0x78,
                        data: entry,
                        count: 8,
                        fileBinaryReadData: options.fileBinaryReadData,
                        success: function (res) {
                            data.size = res;
                            completeInnerCallback++;
                        }
                    });

                    var innerInterval = window.setInterval(function () {
                        if (completeInnerCallback >= innerCallbacksCount) {
                            window.clearInterval(innerInterval);

                            options.fileBinaryReadData.fatEntries.push(data);

                            completeCallback += 128;
                        }
                    }, 100);
                }
            });
        }

        var interval = window.setInterval(function () {
            if (completeCallback >= callbacksCount) {
                window.clearInterval(interval);
                options.from = (
                    options.fileBinaryReadData.fatChains[options.from] != null
                    ) ? options.fileBinaryReadData.fatChains[options.from] : options.fileBinaryReadData.ENDOFCHAIN;

                self._readDirectoryStructure(options);
            }
        }, 100);
    } else {
        if (typeof options.success === 'function') {
            options.success(options.fileBinaryReadData);
        }
    }
};