/**
 *
 * @param data
 * @param options
 * @returns {HTMLElement}
 * @private
 */
function buildTablePart (data, options) {
    var children = data.children || [],
        partOptions = data.options || {},
        len = children.length,
        el,
        i,
        j,
        c,
        cLen,
        eLen,
        chEl,
        elem,
        partTagName = "tbody",
        rowTagName = "tr",
        cellTagName = "td";

    options = options || {};

    if (partOptions.isHeader) {
        partTagName = "thead";
        cellTagName = "th";
    } else if (partOptions.isFooter) {
        partTagName = "tfoot";
    }

    el = document.createElement(partTagName);

    applyCss.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    for (i = 0; i < len; i++) {
        chEl = document.createElement(rowTagName);

        applyCss.call(this, chEl, children[i]);
        addAttributes.call(this, chEl, children[i]);
        addProperties.call(this, chEl, children[i]);

        eLen = children[i].children.length;

        for (j = 0; j < eLen; j++) {
            elem = document.createElement(cellTagName);

            applyCss.call(this, elem, children[i].children[j]);
            addAttributes.call(this, elem, children[i].children[j]);
            addProperties.call(this, elem, children[i].children[j]);

            cLen = children[i].children[j].children.length;

            for (c = 0; c < cLen; c++) {
                elem.appendChild(buildElement.call(this, children[i].children[j].children[c]));
            }

            chEl.appendChild(elem);
        }

        el.appendChild(chEl);
    }

    return el;
}