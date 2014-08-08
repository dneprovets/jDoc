function buildPageNumber (el, data) {
    var numberBlock = document.createElement('div'),
        options = data.options;

    el.style.position = "relative";
    numberBlock.style.position = "absolute";
    numberBlock.style.top = options.header.dimensionCSSRules.height ?
        unit.convert({
            from: options.header.dimensionCSSRules.height.unit,
            to: this._htmlOptions.unit.base,
            value: options.header.dimensionCSSRules.height.value
        }) + this._htmlOptions.unit.base : 0;
    numberBlock.style.right = el.style.paddingRight || 0;

    numberBlock.appendChild(document.createTextNode(options.pageNumber.value));
    el.appendChild(numberBlock);

    return el;
}