/**
 *
 * @param byteLength
 * @param bytes
 * @returns {{buffer: ArrayBuffer, array: Uint8Array, view: DataView}}
 */
export default {
    value (byteLength, bytes) {
        var buffer = new ArrayBuffer(byteLength),
            array;

        array = new Uint8Array(buffer);

        if (bytes) {
            array.set(bytes, 0);
        }

        return {
            buffer,
            array,
            view: new DataView(buffer)
        };
    }
};