/**
 *
 * @private
 */
jDoc._unitSizeConversations = {
    "pt": {
        "px": function (val) {
            var res = 0;
            if (!isNaN(val)) {
                res = Math.round(val / 0.75);
                if (val > 0 && res == 0) {
                    res = 1;
                }
            }

            return res;
        }
    },
    "cm": {
        "px": function (val) {
            var res = 0;
            if (!isNaN(val)) {
                res = Math.round(val / 0.0265);
                if (val > 0 && res == 0) {
                    res = 1;
                }
            }

            return res;
        }
    },
    "mm": {
        "px": function (val) {
            var res = 0;
            if (!isNaN(val)) {
                res = Math.round((val * 1.7) / 4);
                if (val > 0 && res == 0) {
                    res = 1;
                }
            }

            return res;
        }
    },
    "in": {
        "px": function (val) {
            var res = 0;
            if (!isNaN(val)) {
                res = Math.round(val * 96);
                if (val > 0 && res == 0) {
                    res = 1;
                }
            }

            return res;
        }
    },
    "pc": {
        "px": function (val) {
            var res = 0;
            if (!isNaN(val)) {
                res = Math.round(val * 6);
                if (val > 0 && res == 0) {
                    res = 1;
                }
            }

            return res;
        }
    }
};

/**
 * @description 10pt = 13px, params = {value: 2, from: "px", to: "em"}
 * @param params
 * @return {Number}
 * @private
 */
jDoc._unitSizeConverter = function (params) {
    var result = 0;

    params = params || {};

    if (params.value && params.from && params.to) {
        params.from = params.from.toLowerCase();
        params.to = params.to.toLowerCase();

        if (params.from == params.to) {
            result = params.value;
        } else if (this._unitSizeConversations[params.from] && this._unitSizeConversations[params.from][params.to]) {
            result = this._unitSizeConversations[params.from][params.to](params.value);
        }
    }

    return result;
};