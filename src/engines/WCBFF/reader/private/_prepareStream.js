/**
 *
 * @param options
 * @returns {Uint8Array}
 * @private
 */
jDoc.Engines.WCBFF.prototype._prepareStream = function (options) {
    var typedArray = options.fileBinaryReadData.binaryData.getUint8Array(options.size);
    typedArray.set(options.stream.slice(0, options.size), 0);
    return typedArray;
};