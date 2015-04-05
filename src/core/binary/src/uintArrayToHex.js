/**
 *
 * @param array
 * @returns {string}
 */
export default {
    value (array) {
        var result = "",
            str,
            len = array.length;

        for (let i = 0; i < len; i++) {
            str = array[i].toString(16);
            result += (str.length < 2 ? "0" + str : str);
        }
        return result.toUpperCase();
    }
};