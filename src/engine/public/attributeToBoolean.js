/**
 *
 * @description Convert attribute value to boolean value
 * @param attribute
 * @return {Boolean}
 * @private
 */
jDoc.Engine.prototype.attributeToBoolean = {
    value (attribute) {
        return (!!attribute && (attribute.value == 'true' || attribute.value == '1' || attribute.value == 'on'));
    }
};