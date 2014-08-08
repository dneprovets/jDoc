/**
 *
 * @param prop {string}
 * @returns {string}
 * @private
 */
function prepareCSSProperty (prop) {
    var mask = (/-(\w)/g),
        result = prop,
        data = mask.exec(result);

    while (data) {
        result = result.replace("-" + data[1], data[1].toUpperCase());
        data = mask.exec(result);
    }

    return result;
}