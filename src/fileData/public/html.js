/**
 *
 * @param options
 * @returns {DocumentFragment}
 */
jDoc.FileData.prototype.html = {
    value (options = {}) {
        var doc = document.createDocumentFragment(),
            pages = this._data.pages,
            pagesCount = pages.length;

        setHTMLOptions.call(this, options);
        
        pages.forEach(function (page, i) {
            var pageEl = document.createElement('div');
            pageEl.setAttribute('class', fileDataClasses.page);

            if (page.dimensionCssRules && i < pagesCount - 1 && !page.dimensionCssRules.marginBottom) {
                page.dimensionCssRules.marginBottom = {
                    unit: "px",
                    value: 10
                };
            }

            applyCss.call(this, pageEl, page);
            addAttributes.call(this, pageEl, page);
            addProperties.call(this, pageEl, page);
            $.css(pageEl, "box-sizing", "border-box");

            if (page.options && page.options.pageNumber) {
                buildPageNumber.call(this, pageEl, page);
            }

            page.children.forEach(function (el) {
                pageEl.appendChild(buildElement.call(this, el));
            }.bind(this));

            doc.appendChild(pageEl);    
        }.bind(this));

        return doc;
    }
};