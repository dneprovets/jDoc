/**
 *
 * @param value
 * @return {Object}
 * @private
 */
OOXML.prototype._parseStyleAttribute = function (value, options) {
    var result = {
            css: {},
            dimensionCSSRules: {}
        },
        k = 0,
        stylePartitions = String(value).split(';'),
        len = stylePartitions.length,
        stylePartitionData,
        attr;

    if (value) {
        stylePartitions = String(value).split(';');
        len = stylePartitions.length;
        stylePartitionData = null;

        if (typeof options !== "object") {
            options = {};
        }
        if (isNaN(options.denominator)) {
            options.denominator = 1;
        }

        for (k = 0; k < len; k++) {
            stylePartitionData = stylePartitions[k].split(":");
            attr = stylePartitionData[0];

            if (attr === "width" || attr === "height" || attr === "left" || attr === "top") {
                result.dimensionCSSRules[attr] = {
                    value: this._cropUnits(stylePartitionData[1].trim()) / options.denominator,
                    unit: "pt"
                };
            } else if (attr === "visibility" || attr === "position") {
                result.css[attr] = stylePartitionData[1].trim();
            }
        }
    }

    return result;
};