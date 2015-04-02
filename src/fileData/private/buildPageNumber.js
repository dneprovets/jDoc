function buildPageNumber (el, data) {
    var numberBlock = document.createElement('div'),
        options = data.options;

    el.style.position = "relative";
    numberBlock.style.position = "absolute";
    numberBlock.style.top = options.header.dimensionCssRules.height ?
        unit.convert({
            from: options.header.dimensionCssRules.height.unit,
            to: this._htmlOptions.unit.base,
            value: options.header.dimensionCssRules.height.value
        }) + this._htmlOptions.unit.base : 0;
    numberBlock.style.right = el.style.paddingRight || 0;

    numberBlock.appendChild(document.createTextNode(options.pageNumber.value));
    el.appendChild(numberBlock);

    return el;
}