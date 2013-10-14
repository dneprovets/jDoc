/**
 * 635 - OXML coef.
 * 20 - 20th of a Point
 * @param val
 * @return {*}
 * @private
 */
jDoc.engines.OXML.prototype._convertEMU = function (val) {
    return {
        value: val / (635 * 20),
        units: "pt"
    };
};