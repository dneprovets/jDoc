/**
 *
 * @description Convert attribute value to boolean value
 * @param attribute
 * @return {Boolean}
 * @private
 */
jDoc.engines.OXML.prototype._attributeToBoolean = function (attribute) {
    return (!!attribute && (attribute.value == 'true' || attribute.value == '1' || attribute.value == 'on'));
};