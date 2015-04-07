import prepareCssProperty from './../helpers/prepareCssProperty';

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

                    el.style[prop] = key[prop];
                }
            }
        } else {
            key = prepareCssProperty(key);

            el.style[key] = val;
        }

        return el;
    }
};