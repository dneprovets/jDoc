import addVendorPrefix from '../helpers/addVendorPrefix';
import prepareCssProperty from '../helpers/prepareCssProperty';
import vendorPrefixes from '../helpers/vendorPrefixes';

/**
 *
 * @param el {HTMLElement}
 * @param key
 * @param val
 * @returns {HTMLElement}
 */
export default {
    value (el, key, val) {
        if (!el) {
            return el;
        }

        if (typeof key === "object") {
            for (let prop in key) {
                if (key.hasOwnProperty(prop)) {
                    prop = prepareCssProperty(prop);

                    if (vendorPrefixes[prop]) {
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