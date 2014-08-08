/**
 *
 * @param params
 * @param callback
 * @private
 */
ODF.prototype._parseTextDocumentContent = function (params, callback) {
    var result = {
            pages: []
        },
        lazyLoopOptions = {
            chunk: 20,
            time: 0,
            index: 0
        },
        interval,
        time = 100,
        self = this,
        callbacks = 0,
        lazyMethods = 0,
        iteration,
        completedLazyMethods = 0,
        node = params.xml.querySelector('body'),
        parsedLine,
        pageParams = {
            layout: params.documentData.styles.automatic.layouts[params.documentData.styles.pageLayout]
        },
        page;

    page = this._createPage(pageParams);

    this._parseTextDocumentStylesNode(params.xml.querySelector('automatic-styles'), function (styles) {
        node = node ? node.querySelector('text') : null;
        params.documentData._heading = [];

        if (node) {
            lazyMethods++;
            lazyLoopOptions.data = $.children(node);
            lazyLoopOptions.len = lazyLoopOptions.data.length;
            lazyLoopOptions.all = lazyLoopOptions.len;

            iteration = function (options) {
                options.end = options.index + (options.all > options.chunk ? options.chunk : options.all);
                setTimeout(function () {
                    for (options.index; options.index < options.end; options.index++) {
                        switch (options.data[options.index].localName) {
                        case "p":
                            parsedLine = self._parseTextDocumentParagraphNode({
                                node: options.data[options.index],
                                styles: styles,
                                documentData: params.documentData
                            });
                            if (parsedLine.options.pageBreak) {
                                result.pages.push(page);
                                page = self._createPage(pageParams);
                            }
                            page.children.push(parsedLine);
                            break;
                        case "list":
                            parsedLine = self._parseTextDocumentListNode({
                                node: options.data[options.index],
                                styles: styles,
                                documentData: params.documentData
                            });
                            if (parsedLine.options.pageBreak) {
                                result.pages.push(page);
                                page = self._createPage(pageParams);
                            }
                            page.children.push(parsedLine);
                            break;
                        case "table":
                            parsedLine = self._parseTextDocumentTableNode({
                                node: options.data[options.index],
                                styles: styles,
                                documentData: params.documentData
                            });
                            if (parsedLine.options.pageBreak) {
                                result.pages.push(page);
                                page = self._createPage(pageParams);
                            }
                            page.children.push(parsedLine);
                            break;
                        }

                        callbacks++;

                        if (callbacks >= options.len) {
                            completedLazyMethods++;
                            if (completedLazyMethods === lazyMethods) {
                                result.pages.push(page);
                            }
                        }
                    }
                    options.all = options.len - options.end;
                    if (options.index < options.len) {
                        iteration.call(self, options);
                    }
                    return true;
                }, options.time);
            };
            iteration.call(self, lazyLoopOptions);
        }

        interval = setInterval(function () {
            if (completedLazyMethods === lazyMethods) {
                clearInterval(interval);

                if (typeof callback === 'function') {
                    callback(result);
                }
            }
        }, time);
    });
};