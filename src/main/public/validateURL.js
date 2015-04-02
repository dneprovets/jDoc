/**
 *
 * @param val
 * @returns {*}
 */
function validateURL (val) {
    return validators.url.test(val);
}