/**
 * @description namespace:attributeName => attributeName
 * @param attributeName
 * @return {String}
 * @private
 */
export default {
    value (attributeName) {
        return attributeName ? attributeName.replace(/^[0-9a-zA-Z-_]+:/, '') : "";
    }
};