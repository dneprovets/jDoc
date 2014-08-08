/**
 *
 * @param el {HTMLElement}
 * @param key
 * @param val
 * @returns {HTMLElement}
 */
$.css = function (el, key, val) {
    var prop;

    if (!el) {
        return el;
    }

    if (typeof key === "object") {
        for (prop in key) {
            prop = prepareCSSProperty(prop);

            if (vendorPrefix[prop]) {
                addVendorPrefix(el, prop, key[prop]);
            }

            el.style[prop] = key[prop];
        }
    } else {
        key = prepareCSSProperty(key);

        if (vendorPrefixes[key]) {
            addVendorPrefix(el, key, val);
        }

        el.style[key] = val;
    }

    return el;
};