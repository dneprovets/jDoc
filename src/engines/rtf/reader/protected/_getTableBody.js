RTF.prototype._getTableBody = function (table) {
    if (!table || !table.children) {
        return null;
    }

    var i,
        len = table.children.length;

    for (i = len - 1; i >= 0; i--) {
        if (!table.children[i].options || !table.children[i].options.isHeader || !table.children[i].options.isFooter) {
            return table.children[i];
        }
    }

    return null;
};