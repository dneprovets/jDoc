/**
 *
 * @param options
 * @return {*}
 * @private
 */
jDoc.Engines.WCBFF.prototype._getStreamIndexByName = function (options) {
    var i,
        len = options.fileBinaryReadData.fatEntries.length,
        from = options.from || 0;

    for (i = len - 1; i >= from; i--) {
        if (options.fileBinaryReadData.fatEntries[i].name == options.name) {
            return i;
        }
    }
    return null;
};