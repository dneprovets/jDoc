/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._getStreams = function (options) {
    var binaryData = new jDoc.Binary(this.file),
        self = this;

    binaryData.readUint8Array({
        index: 0,
        length: 8,
        success: function (bytes) {
            var fileBinaryReadData = {
                ENDOFCHAIN: 0xFFFFFFFE,
                FREESECT: 0xFFFFFFFF,
                binaryData: binaryData,
                dataHelper: binaryData.getDataHelper(bytes.length, bytes),
                hexID: binaryData.uintArrayToHex(bytes)
            };

            if (fileBinaryReadData.hexID != "D0CF11E0A1B11AE1" && fileBinaryReadData.hexID != "0E11FC0DD0CF11E0") {
                if (typeof options.error === 'function') {
                    options.error();
                    return false;
                }
            }

            self._readFileHeader({
                error: options.error,
                fileBinaryReadData: fileBinaryReadData,
                success: function (fileBinaryReadData) {
                    self._readDIFAT({
                        fileBinaryReadData: fileBinaryReadData,
                        success: function (fileBinaryReadData) {
                            while (fileBinaryReadData.DIFAT[fileBinaryReadData.DIFAT.length - 1] == fileBinaryReadData.FREESECT) {
                                fileBinaryReadData.DIFAT.pop();
                            }

                            fileBinaryReadData.fatChains = [];
                            self._readFATChains({
                                i: 0,
                                fileBinaryReadData: fileBinaryReadData,
                                size: 1 << fileBinaryReadData.sectorShift,
                                len: fileBinaryReadData.DIFAT.length,
                                success: function (fileBinaryReadData) {

                                    fileBinaryReadData.miniFATChains = [];
                                    self._readMiniFATChains({
                                        fileBinaryReadData: fileBinaryReadData,
                                        from: fileBinaryReadData.fMiniFAT,
                                        size: 1 << fileBinaryReadData.sectorShift,
                                        success: function (fileBinaryReadData) {

                                            fileBinaryReadData.fatEntries = [];
                                            self._readDirectoryStructure({
                                                fileBinaryReadData: fileBinaryReadData,
                                                from: fileBinaryReadData.fDir,
                                                size: 1 << fileBinaryReadData.sectorShift,
                                                success: function (fileBinaryReadData) {
                                                    while (fileBinaryReadData.fatEntries[fileBinaryReadData.fatEntries.length - 1].type == 0) {
                                                        fileBinaryReadData.fatEntries.pop();
                                                    }

                                                    var rootStreamIndex = self._getStreamIndexByName({
                                                        name: "Root Entry",
                                                        fileBinaryReadData: fileBinaryReadData
                                                    });
                                                    if (rootStreamIndex == null) {
                                                        fileBinaryReadData.DIFAT = null;
                                                        if (typeof options.error == 'function') {
                                                            options.error();
                                                        }
                                                    } else {
                                                        self._getStreamByIndex({
                                                            index: rootStreamIndex,
                                                            fileBinaryReadData: fileBinaryReadData,
                                                            isRoot: true,
                                                            success: function (stream) {
                                                                fileBinaryReadData.DIFAT = null;
                                                                fileBinaryReadData.miniFAT = stream;
                                                                if (typeof options.success == 'function') {
                                                                    options.success(fileBinaryReadData);
                                                                }
                                                            }
                                                        });
                                                    }

                                                    return true;
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });

            return true;
        },
        error: options.error
    });
};