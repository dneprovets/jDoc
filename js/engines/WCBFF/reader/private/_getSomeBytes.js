/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._getSomeBytes = function (options) {
    if (options.data) {
        var bytes = options.fileBinaryReadData.binaryData.excludeUintArray({
            index: options.from,
            length: options.count,
            data: options.data
        }),
            bytesArray = bytes;

        if (options.fileBinaryReadData.isLittleEndian) {
            bytesArray = options.fileBinaryReadData.binaryData.reverseUintArray(bytes);
        }

        if (typeof options.success === "function") {
            options.success(Number("0x" + options.fileBinaryReadData.binaryData.uintArrayToHex(bytesArray), 16));
        }
    } else {
        options.fileBinaryReadData.binaryData.readUint8Array({
            index: options.from,
            length: options.count,
            success: function (bytes) {
                var bytesArray = bytes;
                if (options.fileBinaryReadData.isLittleEndian) {
                    bytesArray = options.fileBinaryReadData.binaryData.reverseUintArray(bytes);
                }

                if (typeof options.success === "function") {
                    options.success(Number("0x" + options.fileBinaryReadData.binaryData.uintArrayToHex(bytesArray), 16));
                }
            }
        });
    }
};