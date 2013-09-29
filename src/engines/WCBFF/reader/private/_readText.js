/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._readText = function (options) {
    var self = this;

    if (options.i < options.length) {
        options.fileBinaryReadData.text = options.fileBinaryReadData.text || "";

        this._getLong({
            from: 2,
            data: options.fileBinaryReadData.pcd[options.i],
            fileBinaryReadData: options.fileBinaryReadData,
            success: function (res) {
                var isANSI = (res & 0x40000000) == 0x40000000;

                // Остальное без макушки идћт на смещение
                var fc = res & 0x3FFFFFFF;

                // Получаем длину кусочка текста
                var lcb = options.fileBinaryReadData.cp[options.i + 1] - options.fileBinaryReadData.cp[options.i];

                // Если перед нами Unicode, то мы должны прочитать в два раза больше файлов
                if (!isANSI) {
                    lcb *= 2;
                    // Если ANSI, то начать в два раза раньше.
                } else {
                    fc /= 2;
                }

                // Читаем кусок с учћтом смещения и размера из WordDocument-потока
                var part = options.fileBinaryReadData.binaryData.excludeUintArray({
                    data: options.fileBinaryReadData.wordDocumentStream,
                    index: fc,
                    length: lcb
                });

                // Если перед нами Unicode, то преобразовываем его в нормальное состояние
                if (!isANSI) {
                    self._unicodeToUTF8({
                        data: part,
                        fileBinaryReadData: options.fileBinaryReadData,
                        success: function (text) {
                            options.fileBinaryReadData.text += text;
                            options.i++;
                            self._readText(options);
                        }
                    });
                } else {
                    options.fileBinaryReadData.text += self._UTF16ToANSI({
                        data: part
                    });
                    options.i++;
                    self._readText(options);
                }
            }
        });
    } else {
        if (typeof options.success === 'function') {
            options.success(options.fileBinaryReadData);
        }
    }
};