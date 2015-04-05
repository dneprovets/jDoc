/**
 *
 * @param value
 * @return {String}
 * @private
 */
export default {
    value (value) {
        var result = "baseline";

        value = String(value).toLowerCase();

        if (value === "superscript") {
            result = "top";
        } else if (value === "subscript") {
            result = "bottom";
        }

        return result;
    }
};