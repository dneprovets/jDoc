jDoc.Engines.WCBFF.prototype._findCLXOffset = function (options) {
    options.i = options.fileBinaryReadData.binaryData.findPosition({
        data: options.clx,
        needle: 0x02,
        offset: options.from
    });

    if (options.i >= 0) {
        var self = this;
        this._getLong({
            from: options.i + 1,
            data: options.clx,
            fileBinaryReadData: options.fileBinaryReadData,
            success: function (res) {
                options.fileBinaryReadData.lcbPieceTable = res;

                options.fileBinaryReadData.pieceTable = options.fileBinaryReadData.binaryData.excludeUintArray({
                    data: options.clx,
                    index: options.i + 5,
                    length: options.clx.length - (options.i + 5)
                });

                // Если размер фактический отличается от нужного, то это не то -
                // едем дальше.
                if (options.fileBinaryReadData.pieceTable.length != options.fileBinaryReadData.lcbPieceTable) {
                    options.from = options.i + 1;
                    self._findCLXOffset(options);
                } else {
                    if (typeof options.success === 'function') {
                        options.success(options.fileBinaryReadData);
                    }
                }
            }
        });
    } else {
        if (typeof options.success === 'function') {
            options.success(options.fileBinaryReadData);
        }
    }
};