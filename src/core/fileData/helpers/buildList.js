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
    var el = document.createElement('ul');

    applyCss.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    data.children.forEach(function (child) {
        var item = document.createElement('li');

        applyCss.call(this, item, child);
        addAttributes.call(this, item, child);
        addProperties.call(this, item, child);

        child.children.forEach(function (child) {
            item.appendChild(buildElement.call(this, child));
        }.bind(this));

        el.appendChild(item);
    }.bind(this));

    return el;
}