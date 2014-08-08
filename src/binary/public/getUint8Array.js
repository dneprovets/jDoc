/**
 *
 * @param size
 * @returns {Uint8Array}
 */
Binary.prototype.getUint8Array = function (size) {
    return new Uint8Array(new ArrayBuffer(size));
};