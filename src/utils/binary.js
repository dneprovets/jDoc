/**
 *
 * @param blob
 */
jDoc.Binary = function (blob) {
    this.blob = blob;
    this.size = blob.size || 0;
};

jDoc.Binary.prototype = /** @lends jDoc.Binary.prototype */{
    /**
     *
     * @param blob
     * @param index
     * @param length
     * @returns {*}
     * @private
     */
    _blobSlice: function (blob, index, length) {
        return blob.slice(index, index + length);
    },

    /**
     *
     * @param byteLength
     * @param bytes
     * @returns {{buffer: ArrayBuffer, array: Uint8Array, view: DataView}}
     */
    getDataHelper: function (byteLength, bytes) {
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
    },

    /**
     *
     * @param array
     * @returns {string}
     */
    uintArrayToHex: function (array) {
        var result = "",
            str,
            i,
            len = array.length;

        for (i = 0; i < len; i++) {
            str = array[i].toString(16);
            result += (str.length < 2 ? "0" + str : str);
        }
        return result.toUpperCase();
    },

    /**
     *
     * @param options
     */
    readUint8Array: function (options) {
        var reader = new FileReader();

        reader.onload = function (e) {
            options.success(new Uint8Array(e.target.result));
        };
        reader.onerror = options.onerror;
        reader.readAsArrayBuffer(this._blobSlice(this.blob, options.index, options.length));
    },

    /**
     *
     * @param array
     * @returns {*}
     */
    reverseUintArray: function (array) {
        var dataArray,
            len = array.length;

        if (array instanceof Uint16Array) {
            dataArray = this.getUint16Array(len);
        } else {
            if (array instanceof Uint32Array) {
                dataArray = this.getUint32Array(len);
            } else {
                dataArray = this.getUint8Array(len);
            }
        }

        dataArray.set(Array.prototype.reverse.call(array), 0);

        return dataArray;
    },

    /**
     *
     * @param size
     * @returns {Uint8Array}
     */
    getUint8Array: function (size) {
        return new Uint8Array(new ArrayBuffer(size));
    },

    /**
     *
     * @param size
     * @returns {Uint16Array}
     */
    getUint16Array: function (size) {
        return new Uint16Array(new ArrayBuffer(size));
    },

    /**
     *
     * @param size
     * @returns {Uint32Array}
     */
    getUint32Array: function (size) {
        return new Uint32Array(new ArrayBuffer(size));
    },

    /**
     *
     * @param options
     * @returns {*}
     */
    excludeUintArray: function (options) {
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
    },

    /**
     *
     * @param str
     * @returns {*}
     */
    ord: function (str) {
        str = String(str);
        var code = str.charCodeAt(0);

        if (55296 <= code && code <= 56319) {
            if (str.length === 1) {
                return code;
            }
            var low = str.charCodeAt(1);
            return ((code - 55296) * 1024) + (low - 56320) + 65536;
        }
        if (56320 <= code && code <= 57343) {
            return code;
        }
        return code;
    },

    /**
     *
     * @param options
     * @returns {*}
     */
    findPosition: function (options) {
        var bytes = this.excludeUintArray({data: options.data, index: options.offset || 0, length: options.data.length});
        return Array.prototype.indexOf.call(bytes, options.needle);
    },

    /**
     *
     * @param options
     * @returns {Array}
     */
    uintArraySplit: function (options) {
        var arr = [],
            i,
            j = 0,
            len = options.data.length,
            count = Math.ceil(options.data.length / (options.length || 1));

        for (i = count - 1; i >= 0; i--) {
            arr[i] = this.excludeUintArray({data: options.data, index: j, length: (options.length > (len - options.length * i) ? (len - options.length * i) : options.length) - j});
            j += options.length;
        }

        return arr;
    }
};