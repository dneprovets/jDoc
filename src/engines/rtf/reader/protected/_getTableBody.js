RTF.prototype._getTableBody = {
    value (table) {
        if (!table || !table.children) {
            return null;
        }

        var i = table.children.length;

        while (i--) {
            if (!table.children[i].options || !table.children[i].options.isHeader || !table.children[i].options.isFooter) {
                return table.children[i];
            }
        }

        return null;
    }
};