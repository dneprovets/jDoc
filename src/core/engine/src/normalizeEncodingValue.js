/**
 *
 * @param value
 * @return {String}
 * @private
 */
export default {
    value (value) {
        var result = "utf-8";

        if (value) {
            value = value.toLowerCase();

            if (value === "windows-1251") {
                result = "cp1251";
            }
        }

        return result;
    }
};