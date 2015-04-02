/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
function buildParagraph (data) {
    var el = document.createElement('p'),
        len = data.children.length,
        l;

    applyCss.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    for (l = 0; l < len; l++) {
        el.appendChild(buildElement.call(this, data.children[l]));
    }

    return el;
}