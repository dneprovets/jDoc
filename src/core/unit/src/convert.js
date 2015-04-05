import unitRatio from '../helpers/unitRatio.js';

export default {
    /**
     * @description 10pt = 13px
     * @param params
     * @return {Number}
     * @private
     */
    value (params = {}) {
        var result = 0,
            {from, to, value} = params;

        if (value && from && to) {
            from = from.toLowerCase();
            to = to.toLowerCase();

            if (from === to) {
                result = value;
            } else if (unitRatio[from] && unitRatio[from][to]) {
                result = unitRatio[from][to](value);
            }
        }

        return result;
    }
};