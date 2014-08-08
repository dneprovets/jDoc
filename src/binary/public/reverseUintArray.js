/**
 *
 * @param array
 * @returns {*}
 */
Binary.prototype.reverseUintArray = function (array) {
    var dataArray,
        len = array.length;

    if (array instanceof Uint16Array) {
        dataArray = this.getUint16Array(len);
    } else if (array instanceof Uint32Array) {
        dataArray = this.getUint32Array(len);
    } else {
        dataArray = this.getUint8Array(len);
    }

    dataArray.set(ArrayPrototype.reverse.call(array), 0);

    return dataArray;
};