/**
 *
 * @param node
 * @param data
 * @private
 */
export default function (node, data) {
    var prop,
        htmlOptions = this._htmlOptions,
        elementUnit = htmlOptions.unit,
        resultUnit;

    for (prop in data.css) {
        if (data.css.hasOwnProperty(prop)) {
            node.style[prop] = data.css[prop];
        }
    }

    for (prop in data.dimensionCssRules) {
        if (data.dimensionCssRules.hasOwnProperty(prop)) {
            resultUnit = elementUnit.base;

            if (prop === "lineHeight" || prop.indexOf('font') >= 0) {
                resultUnit = elementUnit.font;
            } else if (prop.indexOf('border') >= 0) {
                resultUnit = elementUnit.border;
            } else if (prop.indexOf('margin') >= 0) {
                resultUnit = elementUnit.margin;
            } else if (prop.indexOf('padding') >= 0) {
                resultUnit = elementUnit.padding;
            }

            node.style[prop] = unit.convert({
                from: data.dimensionCssRules[prop].unit,
                to: resultUnit,
                value: data.dimensionCssRules[prop].value
            }) + resultUnit;
        }
    }
}