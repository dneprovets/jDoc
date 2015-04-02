/**
 * @description namespace:attributeName => attributeName
 * @param attributeName
 * @return {String}
 * @private
 */
jDoc.Engine.prototype.replaceAttributeNamespace = {
    value: function (attributeName) {
        return attributeName ? attributeName.replace(/^[0-9a-zA-Z-_]+:/, '') : "";
    }
};