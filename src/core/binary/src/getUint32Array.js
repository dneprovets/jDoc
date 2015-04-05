/**
 *
 * @param size
 * @returns {Uint32Array}
 */
export default {
    value (size) {
        return new Uint32Array(new ArrayBuffer(size));
    }
};