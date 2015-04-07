/**
 *
 * @param node
 * @param data
 * @private
 */
export default {
    value: function (node, data) {
        for (let prop in data.attributes) {
            if (data.attributes.hasOwnProperty(prop)) {
                node.setAttribute(prop, data.attributes[prop]);
            }
        }
    }
}