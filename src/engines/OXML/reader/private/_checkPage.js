/**
 *
 * @param options
 * @returns {number}
 * @private
 */
jDoc.engines.OXML.prototype._checkPageLinesHeight = function (options) {
    var page;

    if (
        options.pageHeight && options.pageLinesHeight + options.lineHeight > options.pageHeight
    ) {
        page = jDoc.clone(options.pageOptions);

        if (page.options.pageNumber) {
            page.options.pageNumber.value = page.options.pageNumber.start + options.pageOptions.options.pageIndex;
        }

        page.elements = options.pageElements;
        options.pageLinesHeight = 0;
        options.pages.push(page);
    } else {
        options.pageLinesHeight += options.lineHeight;
    }

    return options.pageLinesHeight;
};