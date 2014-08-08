/**
 *
 * @param byteLength
 * @param bytes
 * @returns {{buffer: ArrayBuffer, array: Uint8Array, view: DataView}}
 */
Binary.prototype.getDataHelper = function (byteLength, bytes) {
    var dataBuffer, dataArray;

    dataBuffer = new ArrayBuffer(byteLength);
    dataArray = new Uint8Array(dataBuffer);

    if (bytes) {
        dataArray.set(bytes, 0);
    }

    return {
        buffer: dataBuffer,
        array: dataArray,
        view: new DataView(dataBuffer)
    };
};