/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
function buildImage (data) {
    var el = document.createElement('img');

    applyCss.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    return el;
}