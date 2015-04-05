import addAttributes from './addAttributes';
import addProperties from './addProperties';
import applyCss from './applyCss';
import buildTablePart from './buildTablePart';

/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data) {
    var table = document.createElement('table');

    applyCss.call(this, table, data);
    addAttributes.call(this, table, data);
    addProperties.call(this, table, data);

    data.children.forEach(function (child) {
        table.appendChild(buildTablePart.call(this, child));
    });

    return table;
}