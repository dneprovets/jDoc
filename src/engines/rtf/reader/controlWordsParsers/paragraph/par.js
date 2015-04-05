controlWordsParsers.par = {
    value (options = {}) {
        var {parseParams, parseResult} = options,
            paragraphHeight,
            beforePartHeight,
            parts,
            i,
            el,
            children,
            h,
            count,
            partHeight;

        if (parseParams.currentTextElementParent && parseParams.pageWidth && parseParams.pageHeight) {
            paragraphHeight = this._getElementHeight(parseParams.currentTextElementParent, {
                width: parseParams.pageWidth
            });

            // divide into several parts
            if (paragraphHeight > parseParams.pageHeight) {
                parts = [];
                children = parseParams.currentTextElementParent.children;
                count = children.length;
                beforePartHeight = parseParams.pageContentHeight;
                i = 0;

                while (count) {
                    parts[i] = copy({}, parseParams.currentTextElementParent, {
                        children: []
                    });
                    partHeight = 0;

                    while (partHeight < parseParams.pageHeight) {
                        el = children.shift();
                        parts[i].children.push(el);
                        count--;

                        h = this._getElementHeight(parts[i], {
                            width: parseParams.pageWidth
                        });

                        if (beforePartHeight + h > parseParams.pageHeight || h > parseParams.pageHeight) {
                            el = parts[i].children.pop();
                            children.unshift(el);
                            count++;
                            break;
                        }

                        partHeight = beforePartHeight + h;

                        if (!count) {
                            break;
                        }
                    }

                    if (!beforePartHeight) {
                        this._createNewPage(options = {});
                    }

                    parseResult.pages[parseParams.currentPageIndex].children[parseParams.currentElementIndex] =
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
                this._createNewPage(options = {});
                parseParams.currentElementIndex++;
                parseResult.pages[parseParams.currentPageIndex].children[parseParams.currentElementIndex] =
                    parseParams.currentTextElementParent;
                parseParams.currentElementIndex--;
            }

            parseParams.pageContentHeight += paragraphHeight;
        }

        parseParams.currentElementIndex++;

        /**
         * @description inherit previous paragraph
         * @type {*}
         */

        parseParams.currentTextElementParent = copy({}, parseParams.paragraphData, {
            children: []
        });

        parseResult.pages[parseParams.currentPageIndex].children[parseParams.currentElementIndex] =
            parseParams.currentTextElementParent;

        parseParams.currentTextElement = {
            options: {},
            css: {},
            dimensionCssRules: {},
            properties: {
                textContent: ""
            }
        };

        return {
            parseParams,
            parseResult
        };
    }
};