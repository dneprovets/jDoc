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
    var el = document.createElement('div');

    applyCss.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    data.children.forEach(function (child) {
        var part = document.createElement('div');

        applyCss.call(this, part, child);
        addAttributes.call(this, part, child);
        addProperties.call(this, part, child);

        child.children.forEach(function (child) {
            part.appendChild(buildElement.call(this, child));
        });

        el.appendChild(part);
    });

    return el;
}