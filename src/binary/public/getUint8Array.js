/**
 *
 * @param size
 * @returns {Uint8Array}
 */
Binary.prototype.getUint8Array = {
    value (size) {
        return new Uint8Array(new ArrayBuffer(size));
    }
};