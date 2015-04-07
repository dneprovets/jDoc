/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default {
    value: function (data) {
        var el = document.createElement('p');

        this.applyCss(el, data);
        this.addAttributes(el, data);
        this.addProperties(el, data);

        data.children.forEach(function (child) {
            el.appendChild(this.buildElement(child));
        }.bind(this));

        return el;
    }
}