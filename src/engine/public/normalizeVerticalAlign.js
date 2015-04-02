/**
 *
 * @param value
 * @return {String}
 * @private
 */
jDoc.Engine.prototype.normalizeVerticalAlign = {
    value: function (value) {
        var result = "baseline";

        value = String(value).toLowerCase();

        if (value == "superscript") {
            result = "top";
        } else if (value == "subscript") {
            result = "bottom";
        }

        return result;
    }
};