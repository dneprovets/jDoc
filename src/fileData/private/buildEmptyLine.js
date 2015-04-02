/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
function buildEmptyLine (data) {
    var el = document.createElement('br');

    applyCss.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    return el;
}