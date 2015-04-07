import unit from './../../unit/index';

export default {
    value: function (el, data) {
        var numberBlock = document.createElement('div'),
            baseUnit = this.options.unit.base,
            options = data.options,
            dimensionCssRules = options.header.dimensionCssRules;

        el.style.position = "relative";
        numberBlock.style.position = "absolute";
        numberBlock.style.top = dimensionCssRules.height ?
        unit.convert({
            from: dimensionCssRules.height.unit,
            to: baseUnit,
            value: dimensionCssRules.height.value
        }) + baseUnit : 0;
        numberBlock.style.right = el.style.paddingRight || 0;

        numberBlock.appendChild(document.createTextNode(options.pageNumber.value));
        el.appendChild(numberBlock);

        return el;
    }
}