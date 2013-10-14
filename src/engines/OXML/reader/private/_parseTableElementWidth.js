/**
 *
 * @param widthPropertyNode
 * @return {*}
 * @private
 */
jDoc.engines.OXML.prototype._parseTableElementWidth = function (widthPropertyNode) {
    var result = {
            value: 100,
            units: "%"
        },
        type = (
            widthPropertyNode.attributes['w:type'] &&
                widthPropertyNode.attributes['w:type'].value &&
                widthPropertyNode.attributes['w:type'] != 'nil'
            ) ? widthPropertyNode.attributes['w:type'].value : null,
        width = (
            widthPropertyNode.attributes['w:w'] && !isNaN(widthPropertyNode.attributes['w:w'].value)
        ) ? +widthPropertyNode.attributes['w:w'].value : 0;

    if (type && width) {
        if (type === "pct") {
            result = {
                value: width,
                units: "%"
            };
        } else if (type === "dxa") {
            result = {
                value: width / 20,
                units: "pt"
            };
        }
    }

    return result;
};