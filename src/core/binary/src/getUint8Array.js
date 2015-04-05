/**
 *
 * @param size
 * @returns {Uint8Array}
 */
export default {
    value (size) {
        return new Uint8Array(new ArrayBuffer(size));
    }
};