/**
 *
 * @param val
 * @returns {*}
 */
jDoc.validateEmail = function (val) {
    return validators.email.test(val);
};