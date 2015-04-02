/**
 *
 * @private
 */
const unitRatio = {
    "pt": {
        "px": (val) => {
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
        "px": (val) => {
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
        "px": (val) => {
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
        "px": (val) => {
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
        "px": (val) => {
            var res = 0;
            if (!isNaN(val)) {
                res = Math.round(val * 6);
                if (val > 0 && res == 0) {
                    res = 1;
                }
            }

            return res;
        }
    },
    "emu": {
        "px": (val) => {
            // 1inch = 914400 EMUs
            return unitRatio['in'].px(val / 914400);
        }
    }
};