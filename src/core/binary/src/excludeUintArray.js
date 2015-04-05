/**
 *
 * @param options
 * @returns {*}
 */
export default {
    value (options = {}) {
        var dataArray,
            arr = [],
            {length, index, data} = options;

        if (data instanceof Uint16Array) {
            dataArray = this.getUint16Array(length);
        } else {
            if (data instanceof Uint32Array) {
                dataArray = this.getUint32Array(length);
            } else {
                dataArray = this.getUint8Array(length);
            }
        }

        length += index;

        for (let i = index; i < length; i++) {
            arr.push(data[i]);
        }

        dataArray.set(arr, 0);

        return dataArray;
    }
};