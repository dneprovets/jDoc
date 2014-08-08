/**
 * @description 10pt = 13px
 * @param params
 * @return {Number}
 * @private
 */
unit.convert = function (params) {
    var result = 0;

    params = params || {};

    if (params.value && params.from && params.to) {
        params.from = params.from.toLowerCase();
        params.to = params.to.toLowerCase();

        if (params.from == params.to) {
            result = params.value;
        } else if (unitRatio[params.from] && unitRatio[params.from][params.to]) {
            result = unitRatio[params.from][params.to](params.value);
        }
    }

    return result;
};