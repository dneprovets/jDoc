/**
 *
 * @param node
 * @param data
 * @param options
 * @private
 */
function addProperties (node, data, options) {
    var prop;

    options = options || {};

    for (prop in data.properties) {
        node[prop] = data.properties[prop];
    }
}