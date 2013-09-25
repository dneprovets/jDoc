jDoc.Engines.WCBFF.prototype._fillingCP = function (options) {
    var self = this;

    options.fileBinaryReadData.cp = options.fileBinaryReadData.cp || [];

    this._getLong({
        data: options.fileBinaryReadData.pieceTable,
        fileBinaryReadData: options.fileBinaryReadData,
        from: options.i,
        success: function (res) {
            options.fileBinaryReadData.cp.push(res);

            if (res != options.fileBinaryReadData.lastCP) {
                options.i += 4;
                self._fillingCP(options);
            } else {
                if (typeof options.success === 'function') {
                    options.success(options.fileBinaryReadData);
                }
            }
        }
    });
};