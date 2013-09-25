/**
 *
 * @param options.fileBinaryReadData
 * @private
 */
jDoc.Engines.WCBFF.prototype._readFileHeader = function (options) {
    options.fileBinaryReadData.isLittleEndian = false;
    var successCount = 10,
        completeCallbacks = 0,
        self = this;

    options.fileBinaryReadData.binaryData.readUint8Array({
        index: 0x1C,
        length: 2,
        success: function (bytes) {
            options.fileBinaryReadData.isLittleEndian = (options.fileBinaryReadData.binaryData.uintArrayToHex(bytes) == "FEFF");

            self._getShort({
                fileBinaryReadData: options.fileBinaryReadData,
                from: 0x1A,
                success: function (version) {
                    options.fileBinaryReadData.version = version;

                    if (version == 4) {
                        self._getLong({
                            fileBinaryReadData: options.fileBinaryReadData,
                            from: 0x28,
                            success: function (cDir) {
                                options.fileBinaryReadData.cDir = cDir;
                                completeCallbacks++;
                            }
                        });
                    } else {
                        completeCallbacks++;
                    }
                }
            });

            self._getShort({
                fileBinaryReadData: options.fileBinaryReadData,
                from: 0x1E,
                success: function (sectorShift) {
                    options.fileBinaryReadData.sectorShift = sectorShift;
                    completeCallbacks++;
                }
            });

            self._getShort({
                fileBinaryReadData: options.fileBinaryReadData,
                from: 0x20,
                success: function (miniSectorShift) {
                    options.fileBinaryReadData.miniSectorShift = miniSectorShift;
                    completeCallbacks++;
                }
            });

            self._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: 0x38,
                success: function (miniSectorCutoff) {
                    options.fileBinaryReadData.miniSectorCutoff = miniSectorCutoff;
                    completeCallbacks++;
                }
            });

            self._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: 0x30,
                success: function (fDir) {
                    options.fileBinaryReadData.fDir = fDir;
                    completeCallbacks++;
                }
            });

            self._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: 0x2C,
                success: function (FATCount) {
                    options.fileBinaryReadData.FATCount = FATCount;
                    completeCallbacks++;
                }
            });

            self._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: 0x40,
                success: function (MiniFATCount) {
                    options.fileBinaryReadData.MiniFATCount = MiniFATCount;
                    completeCallbacks++;
                }
            });

            self._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: 0x3C,
                success: function (fMiniFAT) {
                    options.fileBinaryReadData.fMiniFAT = fMiniFAT;
                    completeCallbacks++;
                }
            });

            self._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: 0x48,
                success: function (DIFATCount) {
                    options.fileBinaryReadData.DIFATCount = DIFATCount;
                    completeCallbacks++;
                }
            });

            self._getLong({
                fileBinaryReadData: options.fileBinaryReadData,
                from: 0x44,
                success: function (fDIFAT) {
                    options.fileBinaryReadData.fDIFAT = fDIFAT;
                    completeCallbacks++;
                }
            });

            var interval = window.setInterval(function () {
                if (successCount == completeCallbacks) {
                    window.clearInterval(interval);
                    if (typeof options.success === 'function') {
                        options.success(options.fileBinaryReadData);
                    }
                }
            }, 100);
        }
    });
};