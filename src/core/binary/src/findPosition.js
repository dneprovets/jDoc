import excludeUintArray from './excludeUintArray';

/**
 *
 * @param options
 * @returns {*}
 */
export default {
    value (options = {}) {
        var bytes = excludeUintArray({data: options.data, index: options.offset || 0, length: options.data.length});
        return Array.prototype.indexOf.call(bytes, options.needle);
    }
};