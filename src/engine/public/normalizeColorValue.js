/**
 * @description Adjunct a color value to a single mind
 * @param value
 * @return {String}
 * @private
 */
jDoc.Engine.prototype.normalizeColorValue = {
    value (value) {
        var colorList = this.colorList,
            defaultColor = colorList.black;

        if (!value || typeof value !== 'string') {
            return defaultColor;
        }

        value = value.replace(/\s+/g, '');

        if (/^#/.test(value)) {
            return value.toUpperCase();
        }

        if (!isNaN(+("0" + "x" + value))) {
            return "#" + value.toUpperCase();
        }

        value = value.toLowerCase();

        return colorList[value] || defaultColor;
    }
};