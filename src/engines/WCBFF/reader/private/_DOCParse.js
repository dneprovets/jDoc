/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._DOCParse = function (options) {
    var wordDocumentStreamIndex = this._getStreamIndexByName({
        name: "WordDocument",
        fileBinaryReadData: options.fileBinaryReadData
    }),
        self = this;

    if (wordDocumentStreamIndex == null) {
        if (typeof options.error == 'function') {
            options.error();
        }
    } else {
        this._getStreamByIndex({
            index: wordDocumentStreamIndex,
            fileBinaryReadData: options.fileBinaryReadData,
            isRoot: false,
            success: function (wordDocumentStream) {
                options.fileBinaryReadData.wordDocumentStream = wordDocumentStream;
                self._getShort({
                    from: 0x000A,
                    data: wordDocumentStream,
                    fileBinaryReadData: options.fileBinaryReadData,
                    success: function (bytes) {
                        options.fileBinaryReadData.streamTableNumber = +((bytes & 0x0200) == 0x0200);

                        var callbacksCount = 10;
                        var completeCallbacksCount = 0;

                        // Теперь нам нужно узнать позицию CLX в табличном потоке, и размер CLX.
                        self._getLong({
                            from: 0x01A2,
                            data: wordDocumentStream,
                            fileBinaryReadData: options.fileBinaryReadData,
                            success: function (res) {
                                options.fileBinaryReadData.CLXPosition = res;
                                completeCallbacksCount++;
                            }
                        });
                        self._getLong({
                            from: 0x01A6,
                            data: wordDocumentStream,
                            fileBinaryReadData: options.fileBinaryReadData,
                            success: function (res) {
                                options.fileBinaryReadData.CLXSize = res;
                                completeCallbacksCount++;
                            }
                        });

                        // Читаем несколько значений, чтобы отделить позиции от размерности в clx
                        self._getLong({
                            from: 0x004C,
                            data: wordDocumentStream,
                            fileBinaryReadData: options.fileBinaryReadData,
                            success: function (res) {
                                options.fileBinaryReadData.ccpText = res;
                                completeCallbacksCount++;
                            }
                        });
                        self._getLong({
                            from: 0x0050,
                            data: wordDocumentStream,
                            fileBinaryReadData: options.fileBinaryReadData,
                            success: function (res) {
                                options.fileBinaryReadData.ccpFtn = res;
                                completeCallbacksCount++;
                            }
                        });
                        self._getLong({
                            from: 0x0054,
                            data: wordDocumentStream,
                            fileBinaryReadData: options.fileBinaryReadData,
                            success: function (res) {
                                options.fileBinaryReadData.ccpHdd = res;
                                completeCallbacksCount++;
                            }
                        });
                        self._getLong({
                            from: 0x0058,
                            data: wordDocumentStream,
                            fileBinaryReadData: options.fileBinaryReadData,
                            success: function (res) {
                                options.fileBinaryReadData.ccpMcr = res;
                                completeCallbacksCount++;
                            }
                        });
                        self._getLong({
                            from: 0x005C,
                            data: wordDocumentStream,
                            fileBinaryReadData: options.fileBinaryReadData,
                            success: function (res) {
                                options.fileBinaryReadData.ccpAtn = res;
                                completeCallbacksCount++;
                            }
                        });
                        self._getLong({
                            from: 0x0060,
                            data: wordDocumentStream,
                            fileBinaryReadData: options.fileBinaryReadData,
                            success: function (res) {
                                options.fileBinaryReadData.ccpEdn = res;
                                completeCallbacksCount++;
                            }
                        });
                        self._getLong({
                            from: 0x0064,
                            data: wordDocumentStream,
                            fileBinaryReadData: options.fileBinaryReadData,
                            success: function (res) {
                                options.fileBinaryReadData.ccpTxbx = res;
                                completeCallbacksCount++;
                            }
                        });
                        self._getLong({
                            from: 0x0068,
                            data: wordDocumentStream,
                            fileBinaryReadData: options.fileBinaryReadData,
                            success: function (res) {
                                options.fileBinaryReadData.ccpHdrTxbx = res;
                                completeCallbacksCount++;
                            }
                        });

                        var interval = setInterval(function () {
                            if (completeCallbacksCount == callbacksCount) {
                                clearInterval(interval);

                                // С помощью вышенайденных значений, находим значение последнего CP - character position
                                options.fileBinaryReadData.lastCP =
                                    options.fileBinaryReadData.ccpFtn +
                                        options.fileBinaryReadData.ccpHdd +
                                        options.fileBinaryReadData.ccpMcr +
                                        options.fileBinaryReadData.ccpAtn +
                                        options.fileBinaryReadData.ccpEdn +
                                        options.fileBinaryReadData.ccpTxbx +
                                        options.fileBinaryReadData.ccpHdrTxbx;

                                options.fileBinaryReadData.lastCP +=
                                    (+(options.fileBinaryReadData.lastCP != 0) + (+options.fileBinaryReadData.ccpText));

                                // Находим в файле нужную нам табличку.
                                options.fileBinaryReadData.tStreamIndex = self._getStreamIndexByName({
                                    fileBinaryReadData: options.fileBinaryReadData,
                                    name: options.fileBinaryReadData.streamTableNumber + "Table"
                                });

                                if (options.fileBinaryReadData.tStreamIndex == null) {
                                    if (typeof options.error === 'function') {
                                        options.error();
                                    }
                                } else {
                                    self._getStreamByIndex({
                                        index: options.fileBinaryReadData.tStreamIndex,
                                        fileBinaryReadData: options.fileBinaryReadData,
                                        isRoot: true,
                                        success: function (stream) {
                                            console.log(stream);

                                            options.clx = options.fileBinaryReadData.binaryData.excludeUintArray({
                                                index: options.fileBinaryReadData.CLXPosition,
                                                length: options.fileBinaryReadData.CLXSize,
                                                data: stream
                                            });

                                            options.fileBinaryReadData.lcbPieceTable = 0;
                                            options.fileBinaryReadData.pieceTable = [];

                                            console.log(options.clx);
                                            return;

                                            self._findCLXOffset({
                                                from: 0,
                                                clx: options.clx,
                                                fileBinaryReadData: options.fileBinaryReadData,
                                                success: function (fileBinaryReadData) {
                                                    var opt = {
                                                        i: 0,
                                                        fileBinaryReadData: fileBinaryReadData,
                                                        success: function (fileBinaryReadData) {
                                                            fileBinaryReadData.pcd = fileBinaryReadData.binaryData.excludeUintArray({
                                                                data: fileBinaryReadData.pieceTable,
                                                                index: opt.i + 4,
                                                                length: fileBinaryReadData.pieceTable.length - (opt.i + 4)
                                                            });

                                                            fileBinaryReadData.pcd = fileBinaryReadData.binaryData.uintArraySplit({
                                                                data: fileBinaryReadData.pcd,
                                                                length: 8
                                                            });

                                                            self._readText({
                                                                fileBinaryReadData: fileBinaryReadData,
                                                                i: 0,
                                                                length: fileBinaryReadData.pcd.length,
                                                                success: function (fileBinaryReadData) {
                                                                    // Удаляем из файла вхождения с внедрћнными объектами
                                                                    fileBinaryReadData.text =
                                                                        fileBinaryReadData.text.replace(/HYPER13 *(INCLUDEPICTURE|HTMLCONTROL)(.*)HYPER15/im, "");
                                                                    fileBinaryReadData.text =
                                                                        fileBinaryReadData.text.replace(/HYPER13(.*)HYPER14(.*)HYPER15/im, "$2");

                                                                    if (typeof options.success === 'function') {
                                                                        options.success(fileBinaryReadData);
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    };

                                                    self._fillingCP(opt);
                                                }
                                            });
                                        }
                                    });
                                }
                            }

                            return null;
                        }, 100);
                    }
                });
            }
        });
    }
};