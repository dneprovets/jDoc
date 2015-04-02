/**
 *
 * @param options
 * @returns {Array}
 */
Binary.prototype.uintArraySplit = {
    value (options = {}) {
        var arr = [],
            j = 0,
            {data, length} = options,
            len = data.length,
            i = Math.ceil(data.length / (length || 1));

        while (i--) {
            arr[i] = this.excludeUintArray({
                data: data,
                index: j,
                length: (length > (len - length * i) ? (len - length * i) : length) - j
            });
            j += length;
        }

        return arr;
    }
};