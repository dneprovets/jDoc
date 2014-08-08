/**
 *
 * @param node
 * @param data
 * @param options
 * @private
 */
function addAttributes (node, data, options) {
    var prop;

    options = options || {};

    for (prop in data.attributes) {
        node.setAttribute(prop, data.attributes[prop]);
    }
}