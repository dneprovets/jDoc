/**
 *
 * @param str
 * @returns {*}
 */
Binary.prototype.ord = {
    value (str) {
        str = String(str);
        var code = str.charCodeAt(0);

        if (55296 <= code && code <= 56319) {
            if (str.length === 1) {
                return code;
            }
            let low = str.charCodeAt(1);
            return ((code - 55296) * 1024) + (low - 56320) + 65536;
        }
        if (56320 <= code && code <= 57343) {
            return code;
        }
        return code;
    }
};