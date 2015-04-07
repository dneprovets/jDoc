/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default {
    value: function (data) {
        var el = document.createElement('div');

        this.applyCss(el, data);
        this.addAttributes(el, data);
        this.addProperties(el, data);

        data.children.forEach(function (child) {
            var part = document.createElement('div');

            this.applyCss(part, child);
            this.addAttributes(part, child);
            this.addProperties(part, child);

            child.children.forEach(function (child) {
                part.appendChild(this.buildElement(child));
            }.bind(this));

            el.appendChild(part);
        }.bind(this));

        return el;
    }
}