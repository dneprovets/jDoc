/**
 *
 * @param size
 * @returns {Uint16Array}
 */
export default {
    value (size) {
        return new Uint16Array(new ArrayBuffer(size));
    }
};