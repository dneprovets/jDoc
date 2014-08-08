/**
 *
 * @param options
 * @returns {Array}
 */
Binary.prototype.uintArraySplit = function (options) {
    var arr = [],
        i,
        j = 0,
        len = options.data.length,
        count = Math.ceil(options.data.length / (options.length || 1));

    for (i = count - 1; i >= 0; i--) {
        arr[i] = this.excludeUintArray({
            data: options.data,
            index: j,
            length: (options.length > (len - options.length * i) ? (len - options.length * i) : options.length) - j
        });
        j += options.length;
    }

    return arr;
};