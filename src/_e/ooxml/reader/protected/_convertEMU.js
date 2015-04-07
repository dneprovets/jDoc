/**
 * @description 635 - OXML coef. 20 - 20th of a Point
 * @param val
 * @return {*}
 * @private
 */
OOXML.prototype._convertEMU = function (val) {
    return {
        value: val / (635 * 20),
        unit: "pt"
    };
};