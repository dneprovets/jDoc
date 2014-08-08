/**
 *
 * @param options
 * @returns {*}
 */
Binary.prototype.excludeUintArray = function (options) {
    var dataArray,
        arr = [],
        i,
        len = options.length;

    if (options.data instanceof Uint16Array) {
        dataArray = this.getUint16Array(len);
    } else {
        if (options.data instanceof Uint32Array) {
            dataArray = this.getUint32Array(len);
        } else {
            dataArray = this.getUint8Array(len);
        }
    }

    len += options.index;

    for (i = options.index; i < len; i++) {
        arr.push(options.data[i]);
    }

    dataArray.set(arr, 0);

    return dataArray;
};