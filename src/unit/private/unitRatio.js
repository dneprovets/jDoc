/**
 *
 * @private
 */
var unitRatio = {
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