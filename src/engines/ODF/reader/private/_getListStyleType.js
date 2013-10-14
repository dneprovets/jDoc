/**
 *
 * @param value
 * @returns {*}
 * @private
 */
jDoc.engines.ODF.prototype._getListStyleType = function (value) {
    var result;

    switch (value) {
        case "1":
            result = "decimal";
            break;
        case "i":
            result = "lower-roman";
            break;
        case "I":
            result = "upper-roman";
            break;
        case "a":
            result = "lower-alpha";
            break;
        case "A":
            result = "upper-alpha";
            break;
        default:
            result = "auto";
    }

    return result;
};