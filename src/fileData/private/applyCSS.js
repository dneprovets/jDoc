/**
 *
 * @param node
 * @param data
 * @param options
 * @private
 */
function applyCSS (node, data, options) {
    var prop,
        htmlOptions = this._htmlOptions,
        elementUnit = htmlOptions.unit,
        resultUnit;

    options = options || {};

    for (prop in data.css) {
        node.style[prop] = data.css[prop];
    }

    for (prop in data.dimensionCSSRules) {
        resultUnit = elementUnit.base;

        if (prop == "lineHeight" || prop.indexOf('font') >= 0) {
            resultUnit = elementUnit.font;
        } else if (prop.indexOf('border') >= 0) {
            resultUnit = elementUnit.border;
        } else if (prop.indexOf('margin') >= 0) {
            resultUnit = elementUnit.margin;
        } else if (prop.indexOf('padding') >= 0) {
            resultUnit = elementUnit.padding;
        }

        node.style[prop] = unit.convert({
            from: data.dimensionCSSRules[prop].unit,
            to: resultUnit,
            value: data.dimensionCSSRules[prop].value
        }) + resultUnit;
    }
}