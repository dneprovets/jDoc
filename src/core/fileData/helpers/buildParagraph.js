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
    var el = document.createElement('p');

    applyCss.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    data.children.forEach(function (child) {
        el.appendChild(buildElement.call(this, child));
    }.bind(this));

    return el;
}