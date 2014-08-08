/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
function buildSchema (data) {
    var el = document.createElement('div'),
        children = data.children,
        len = children.length,
        llen,
        i,
        j,
        part;

    applyCSS.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    for (i = 0; i < len; i++) {
        part = document.createElement('div');

        applyCSS.call(this, part, children[i]);
        addAttributes.call(this, part, children[i]);
        addProperties.call(this, part, children[i]);

        llen = children[i].children.length;

        for (j = 0; j < llen; j++) {
            part.appendChild(buildElement.call(this, children[i].children[j]));
        }

        el.appendChild(part);
    }

    return el;
}