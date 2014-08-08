/**
 *
 * @param size
 * @returns {Uint32Array}
 */
Binary.prototype.getUint32Array = function (size) {
    return new Uint32Array(new ArrayBuffer(size));
};