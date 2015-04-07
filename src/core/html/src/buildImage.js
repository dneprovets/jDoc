/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default {
    value: function (data) {
        var el = document.createElement('img');

        this.applyCss(el, data);
        this.addAttributes(el, data);
        this.addProperties(el, data);

        return el;
    }
}