/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._getStreamByIndexHelperForLargeFile = function (options) {
    var self = this;

    if (options.from != options.fileBinaryReadData.ENDOFCHAIN) {

        // Находим смещение в файле (учитывая, что вначале файла заголовок на 512 байт)
        options.start = (options.from + 1) << options.fileBinaryReadData.sectorShift;

        options.fileBinaryReadData.binaryData.readUint8Array({
            index: options.start,
            length: options.sectorSize,
            success: function (bytes) {
                // Читаем сектор
                var i;
                var len = bytes.length;

                for (i = 0; i < len; i++) {
                    options.stream.push(bytes[i]);
                }

                // Находим следующий сектор в массиве FAT-последовательностей
                options.from = (
                    options.fileBinaryReadData.fatChains[options.from] != null
                    ) ? options.fileBinaryReadData.fatChains[options.from] : options.fileBinaryReadData.ENDOFCHAIN;
                self._getStreamByIndexHelperForLargeFile(options);
            }
        });
    } else {
        if (typeof options.success === 'function') {
            options.success(this._prepareStream({
                size: options.size,
                stream: options.stream,
                fileBinaryReadData: options.fileBinaryReadData
            }));
        }
    }
};