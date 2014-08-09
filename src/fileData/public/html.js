/**
 *
 * @param options
 * @returns {DocumentFragment}
 */
jDoc.FileData.prototype.html = function (options) {
    var doc = document.createDocumentFragment(),
        pages = this._data.pages,
        pagesCount = pages.length,
        elementsCount,
        i,
        p,
        pageEl;

    setHTMLOptions.call(this, options);

    for (i = 0; i < pagesCount; i++) {
        pageEl = document.createElement('div');
        pageEl.setAttribute('class', fileDataClasses.page);

        if (pages[i].dimensionCSSRules && i < pagesCount - 1 && !pages[i].dimensionCSSRules.marginBottom) {
            pages[i].dimensionCSSRules.marginBottom = {
                unit: "px",
                value: 10
            };
        }

        applyCSS.call(this, pageEl, pages[i]);
        addAttributes.call(this, pageEl, pages[i]);
        addProperties.call(this, pageEl, pages[i]);
        $.css(pageEl, "box-sizing", "border-box");

        if (pages[i].options && pages[i].options.pageNumber) {
            buildPageNumber.call(this, pageEl, pages[i]);
        }

        elementsCount = pages[i].children.length;

        for (p = 0; p < elementsCount; p++) {
            pageEl.appendChild(buildElement.call(this, pages[i].children[p]));
        }

        doc.appendChild(pageEl);
    }

    return doc;
};