import addAttributes from './addAttributes';
import addProperties from './addProperties';
import applyCss from './applyCss';
import buildElement from './buildElement';

/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data) {
    var partOptions = data.options || {},
        el,
        partTagName = "tbody",
        rowTagName = "tr",
        cellTagName = "td";

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
    
    (data.children || []).forEach(function (child) {
        var chEl = document.createElement(rowTagName);

        applyCss.call(this, chEl, child);
        addAttributes.call(this, chEl, child);
        addProperties.call(this, chEl, child);

        child.children.forEach(function (child) {
            var elem = document.createElement(cellTagName);

            applyCss.call(this, elem, child);
            addAttributes.call(this, elem, child);
            addProperties.call(this, elem, child);

            child.children.forEach(function (child) {
                elem.appendChild(buildElement.call(this, child));
            });

            chEl.appendChild(elem);    
        });

        el.appendChild(chEl);
    });

    return el;
}