/**
 *
 * @param obj
 * @returns {*}
 */
jDoc.clone = function (obj) {
    return this.deepMerge({}, obj);
};