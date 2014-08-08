/**
 *
 * @param blob
 * @param index
 * @param length
 * @returns {*}
 * @private
 */
Binary.prototype._blobSlice = function (blob, index, length) {
    return blob.slice(index, index + length);
};