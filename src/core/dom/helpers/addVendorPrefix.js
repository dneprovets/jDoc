/**
 *
 * @param el {HTMLElement}
 * @param prop
 * @param val
 * @returns {HTMLElement}
 * @private
 */
export default function (el, prop, val) {
    var i = vendorPrefixes[prop] && vendorPrefixes[prop].length;

    while (i--) {
        el.style[vendorPrefixes[prop][i]] = val;
    }

    el.style[prop] = val;

    return el;
}