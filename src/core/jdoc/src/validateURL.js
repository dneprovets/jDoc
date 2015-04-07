import validators from './../helpers/validators';

/**
 *
 * @param val
 * @returns {*}
 */
export default {
    value (val) {
        return validators.url.test(val);
    }
};