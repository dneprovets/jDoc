/**
 *
 * @param element
 * @returns {Array}
 */
$.children = function (element) {
    return element ? this.siblings(element.firstChild) : [];
};