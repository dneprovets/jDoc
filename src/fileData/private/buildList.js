/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
function buildList (data) {
    var el = document.createElement('ul'),
        children = data.children,
        len = children.length,
        item,
        i,
        j,
        llen;

    applyCSS.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    for (i = 0; i < len; i++) {
        item = document.createElement('li');

        applyCSS.call(this, item, children[i]);
        addAttributes.call(this, item, children[i]);
        addProperties.call(this, item, children[i]);

        llen = children[i].children.length;

        for (j = 0; j < llen; j++) {
            item.appendChild(buildElement.call(this, children[i].children[j]));
        }

        el.appendChild(item);
    }

    return el;
}