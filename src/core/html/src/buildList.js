/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default {
    value: function (data) {
        var el = document.createElement('ul');

        this.applyCss(el, data);
        this.addAttributes(el, data);
        this.addProperties(el, data);

        data.children.forEach(function (child) {
            var item = document.createElement('li');

            this.applyCss(item, child);
            this.addAttributes(item, child);
            this.addProperties(item, child);

            child.children.forEach(function (child) {
                item.appendChild(this.buildElement(child));
            }.bind(this));

            el.appendChild(item);
        }.bind(this));

        return el;
    }
}