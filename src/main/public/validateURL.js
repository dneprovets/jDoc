/**
 *
 * @param val
 * @returns {*}
 */
jDoc.validateURL = function (val) {
    return validators.url.test(val);
};