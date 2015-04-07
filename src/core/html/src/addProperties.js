/**
 *
 * @param node
 * @param data
 * @private
 */
export default {
    value: function (node, data) {
        for (let prop in data.properties) {
            if (data.properties.hasOwnProperty(prop)) {
                node[prop] = data.properties[prop];
            }
        }
    }
}