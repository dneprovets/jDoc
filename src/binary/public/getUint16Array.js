/**
 *
 * @param size
 * @returns {Uint16Array}
 */
Binary.prototype.getUint16Array = function (size) {
    return new Uint16Array(new ArrayBuffer(size));
};