/**
 *
 * @param str
 * @return {String} - dd.mm.yyy
 * @private
 */
jDoc.Engine.prototype._normalizeDate = function (str) {
    var date = "",
        data;

    if (str) {
        /**
         * yyyy-mm-dd
         */
        if ((/^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])$/).test(str)) {
            data = str.split("-");
            date = data[2] + "." + data[1] + "." + data[0];
        }
    }

    return date;
};