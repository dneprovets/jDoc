/**
 *
 * @param size
 * @returns {Uint32Array}
 */
Binary.prototype.getUint32Array = {
    value (size) {
        return new Uint32Array(new ArrayBuffer(size));
    }
};