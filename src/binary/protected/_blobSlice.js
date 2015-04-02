/**
 *
 * @param blob
 * @param index
 * @param length
 * @returns {*}
 * @private
 */
Binary.prototype._blobSlice = {
    value (blob, index, length) {
        return blob.slice(index, index + length);
    }
};