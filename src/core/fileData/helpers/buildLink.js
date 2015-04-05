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
    var el = document.createElement('a'),
        len = data.children ? data.children.length : 0;

    applyCss.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    for (let i = 0; i < len; i++) {
        el.appendChild(buildElement.call(this, data.children[i]));
    }

    return el;
}