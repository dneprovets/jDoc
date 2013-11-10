jDoc.engines.RTF.prototype._controlWordsParsers.par = function (options) {
    var parseParams = options.parseParams,
        paragraphHeight,
        beforePartHeight,
        parts,
        i,
        el,
        elements,
        h,
        count,
        partHeight,
        parseResult = options.parseResult;

    if (parseParams.currentTextElementParent && parseParams.pageWidth && parseParams.pageHeight) {
        paragraphHeight = this._getElementHeight(parseParams.currentTextElementParent, {
            width: parseParams.pageWidth
        });

        console.log(parseParams.pageHeight, paragraphHeight);

        /**
         * divide into several parts
         */
        if (paragraphHeight > parseParams.pageHeight) {
            parts = [];
            elements = parseParams.currentTextElementParent.elements;
            count = elements.length;
            beforePartHeight = parseParams.pageContentHeight;
            i = 0;

            while (count) {
                parts[i] = jDoc.deepMerge({}, parseParams.currentTextElementParent, {
                    elements: []
                });
                partHeight = 0;

                while (partHeight < parseParams.pageHeight) {
                    el = elements.shift();
                    parts[i].elements.push(el);
                    count--;

                    h = this._getElementHeight(parts[i], {
                        width: parseParams.pageWidth
                    });

                    if (beforePartHeight + h > parseParams.pageHeight || h > parseParams.pageHeight) {
                        el = parts[i].elements.pop();
                        elements.unshift(el);
                        count++;
                        break;
                    }

                    partHeight = beforePartHeight + h;

                    if (!count) {
                        break;
                    }
                }

                if (!beforePartHeight) {
                    this._createNewPage(options);
                }

                parseResult.pages[parseParams.currentPageIndex].elements[parseParams.currentElementIndex] =
                    parts[i];

                i++;
                beforePartHeight = 0;
                parseParams.currentElementIndex++;
            }

            if (i) {
                parseParams.currentElementIndex--;
            }

            if (partHeight < parseParams.pageHeight) {
                paragraphHeight = partHeight;
            } else {
                paragraphHeight = 0;
            }
        } else if (parseParams.pageContentHeight + paragraphHeight > parseParams.pageHeight) {
            this._createNewPage(options);
            parseParams.currentElementIndex++;
            parseResult.pages[parseParams.currentPageIndex].elements[parseParams.currentElementIndex] =
                parseParams.currentTextElementParent;
            parseParams.currentElementIndex--;
        }

        parseParams.pageContentHeight += paragraphHeight;
    }

    parseParams.currentElementIndex++;

    /**
     * inherit previous paragraph
     * @type {*}
     */

    parseParams.currentTextElementParent = jDoc.deepMerge({}, parseParams.paragraphData, {
        elements: []
    });

    parseResult.pages[parseParams.currentPageIndex].elements[parseParams.currentElementIndex] =
        parseParams.currentTextElementParent;

    parseParams.currentTextElement = {
        options: {},
        css: {},
        dimensionCSSRules: {},
        properties: {
            textContent: ""
        }
    };

    return {
        parseParams: parseParams,
        parseResult: parseResult
    };
};