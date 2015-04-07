/**
 *
 * @param val
 * @returns {{value: number, unit: string}}
 * @private
 */
ODF.prototype._getSize = function (val) {
    var result = {
            value: 0,
            unit: ""
        },
        data = (/^([0-9]*[0-9][0-9]*(?:\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px))$/).exec(val);

    if (data) {
        if (data[1] && data[2]) {
            result.value = isNaN(data[1]) ? 0 : +data[1];
            result.unit = data[2] ? String(data[2]).toLowerCase() : "";
        }
    } else {
        data = (/^-?([0-9]+(?:\.[0-9]*)?|\.[0-9]+)(%)$/).exec(val);
        if (data && data[1] && data[2]) {
            result.value = isNaN(data[1]) ? 0 : +data[1];
            result.unit = data[2] ? String(data[2] || "").toLowerCase() : "";
        }
    }

    return result;
};