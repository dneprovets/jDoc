/**
 * @description 240 => 1, 360 => 1.5
 * @return {Number}
 * @private
 */
jDoc.Engines.OXML.prototype._getLineHeight = function (value) {
    var result = Math.round(value / 240 * 100) / 100;

    return (isNaN(result) || result < 1) ? 1 : result;
};