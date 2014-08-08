/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
function buildLink (data) {
    var el = document.createElement('a'),
        len = data.children ? data.children.length : 0,
        i;

    applyCSS.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    for (i = 0; i < len; i++) {
        el.appendChild(buildElement.call(this, data.children[i]));
    }

    return el;
}