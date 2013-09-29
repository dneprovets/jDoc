/**
 *
 * @param options
 * @private
 */
jDoc.Engines.WCBFF.prototype._getStreamByIndex = function (options) {
    // Получаем смещение в miniFAT'е
    var start,
        i,
        len,
        entry = options.fileBinaryReadData.fatEntries[options.index];

    options.from = entry.start;
    options.size = entry.size;
    options.stream = [];

    /**
     * Дальше варианта два - если размер меньше 4096 байт, то нам стоит читать данные
     * из MiniFAT'а, если больше так будем читать из общего FAT'а. Исключение RootEntry,
     * для которого мы должны прочитать содержимое из FAT'а - ведь там как раз таки
     * хранится MiniFAT
     */

    if (options.size < options.fileBinaryReadData.miniSectorCutoff && !options.isRoot) {
        options.sectorSize = 1 << options.fileBinaryReadData.miniSectorShift;

        while (options.from != options.fileBinaryReadData.ENDOFCHAIN) {
            // Получаем смещение в miniFAT'е
            start = options.fileBinaryReadData.from << options.fileBinaryReadData.miniSectorShift;
            len = start + options.sectorSize;

            // Читаем miniFAT-сектор
            for (i = start; i < len; i++) {
                options.stream.push(options.fileBinaryReadData.miniFAT[i]);
            }

            // Находим следующий кусок miniFAT'а в массиве последовательностей
            options.from = (
                options.fileBinaryReadData.miniFATChains[options.from] != null
                ) ? options.fileBinaryReadData.miniFATChains[options.from] : options.fileBinaryReadData.ENDOFCHAIN;
        }

        if (typeof options.success === 'function') {
            options.success(this._prepareStream({
                size: options.size,
                stream: options.stream,
                fileBinaryReadData: options.fileBinaryReadData
            }));
        }

    } else {
        // Вариант №2 - кусок большой - читаем из FAT.
        // Находим размер сектора - 512 (или 4096 для новых версий)
        options.sectorSize = 1 << options.fileBinaryReadData.sectorShift;

        this._getStreamByIndexHelperForLargeFile(options);
    }
};