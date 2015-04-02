/**
 *
 * @param el {HTMLElement}
 * @param key
 * @param val
 * @returns {HTMLElement}
 */
$.css = {
    value (el, key, val) {
        if (!el) {
            return el;
        }

        if (typeof key === "object") {
            for (let prop in key) {
                if (key.hasOwnProperty(prop)) {
                    prop = prepareCssProperty(prop);

                    if (vendorPrefix[prop]) {
                        addVendorPrefix(el, prop, key[prop]);
                    }

                    el.style[prop] = key[prop];
                }
            }
        } else {
            key = prepareCssProperty(key);

            if (vendorPrefixes[key]) {
                addVendorPrefix(el, key, val);
            }

            el.style[key] = val;
        }

        return el;
    }
};