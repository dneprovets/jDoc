/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default {
    value: function (data) {
        var table = document.createElement('table');

        this.applyCss(table, data);
        this.addAttributes(table, data);
        this.addProperties(table, data);

        data.children.forEach(function (child) {
            var partOptions = child.options || {},
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

            this.applyCss(el, child);
            this.addAttributes(el, child);
            this.addProperties(el, child);

            (child.children || []).forEach(function (child) {
                var chEl = document.createElement(rowTagName);

                this.applyCss(chEl, child);
                this.addAttributes(chEl, child);
                this.addProperties(chEl, child);

                child.children.forEach(function (child) {
                    var elem = document.createElement(cellTagName);

                    this.applyCss(elem, child);
                    this.addAttributes(elem, child);
                    this.addProperties(elem, child);

                    child.children.forEach(function (child) {
                        elem.appendChild(this.buildElement(child));
                    });

                    chEl.appendChild(elem);
                }.bind(this));

                el.appendChild(chEl);
            }.bind(this));
            
            
            table.appendChild(el);
        }.bind(this));

        return table;
    }
}