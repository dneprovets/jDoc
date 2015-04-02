/**
 *
 * @param options
 * @returns {*}
 */
Binary.prototype.findPosition = {
    value (options = {}) {
        var bytes = this.excludeUintArray({data: options.data, index: options.offset || 0, length: options.data.length});
        return ArrayPrototype.indexOf.call(bytes, options.needle);
    }
};