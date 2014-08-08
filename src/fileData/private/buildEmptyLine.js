/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
function buildEmptyLine (data) {
    var el = document.createElement('br');

    applyCSS.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    return el;
}