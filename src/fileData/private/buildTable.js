/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
function buildTable (data) {
    var i,
        table = document.createElement('table'),
        children = data.children,
        len = children.length;

    applyCSS.call(this, table, data);
    addAttributes.call(this, table, data);
    addProperties.call(this, table, data);

    for (i = 0; i < len; i++) {
        table.appendChild(buildTablePart.call(this, children[i]));
    }

    return table;
}