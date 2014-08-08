/**
 *
 * @param array
 * @returns {string}
 */
Binary.prototype.uintArrayToHex = function (array) {
    var result = "",
        str,
        i,
        len = array.length;

    for (i = 0; i < len; i++) {
        str = array[i].toString(16);
        result += (str.length < 2 ? "0" + str : str);
    }
    return result.toUpperCase();
};