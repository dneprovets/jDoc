/**
 *
 * @param el {HTMLElement}
 * @param prop
 * @param val
 * @returns {HTMLElement}
 * @private
 */
function addVendorPrefix (el, prop, val) {
    var i,
        len = (vendorPrefixes[prop] && vendorPrefixes[prop].length) || 0;

    for (i = len - 1; i >= 0; i--) {
        el.style[vendorPrefixes[prop][i]] = val;
    }

    el.style[prop] = val;

    return el;
}