/**
 * namespace:attributeName => attributeName
 * @param attributeName
 * @return {String}
 * @private
 */
jDoc.Engine.prototype._replaceAttributeNamespace = function (attributeName) {
    return attributeName ? attributeName.replace(/^[0-9a-zA-Z-_]+:/, '') : "";
};