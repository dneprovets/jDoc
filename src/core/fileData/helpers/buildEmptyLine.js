import addAttributes from './addAttributes';
import addProperties from './addProperties';
import applyCss from './applyCss';

/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data) {
    var el = document.createElement('br');

    applyCss.call(this, el, data);
    addAttributes.call(this, el, data);
    addProperties.call(this, el, data);

    return el;
}