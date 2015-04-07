/**
 *
 * @param str
 * @return {Object}
 * @private
 */
ODF.prototype._parseBorderStyle = function (str) {
    var result = {
            width: {},
            style: "none",
            color: "none"
        },
        data,
        size;

    if (str && str !== "none") {
        data = str.split(' ');

        if (data[0] && data[1] && data[2]) {
            size = this._getSize(data[0]);

            if (size.unit) {
                result.width = size;
            }

            result.style = data[1];
            result.color = this.normalizeColorValue(data[2]);
        }
    }

    return result;
};