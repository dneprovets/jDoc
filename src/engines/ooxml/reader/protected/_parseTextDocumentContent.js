/**
 * @description Parsing content of document
 * @param params
 * @return {Object}
 * @private
 */
OOXML.prototype._parseTextDocumentContent = function (params) {
    params.documentData._heading = [];

    var documentData = params.documentData,
        result = {
            name: this.fileName,
            wordsCount: (documentData.applicationInfo && documentData.applicationInfo.wordsCount) || null,
            zoom: (documentData.settings && documentData.settings.zoom) || 100,
            pages: []
        },
        pageOptions = {
            css: {},
            dimensionCssRules: {},
            options: {
                pageIndex: 0,
                pageNumber: null,
                header: {
                    css: {},
                    dimensionCssRules: {}
                },
                footer: {
                    css: {},
                    dimensionCssRules: {}
                },
                columns: {
                    equalWidth: false,
                    space: 0,
                    number: 0,
                    separated: false
                }
            }
        },
        self = this,
        i = 0,
        pageElements = [],
        pageLinesHeight = 0,
        cachedLength = 0,
        callbacks = 0,
        lineNodeData = {},
        listLine = null,
        iteration,
        children,
        page,
        sectionProperties,
        len,
        pageHeight = 0,
        c,
        lazyLoopOptions,
        bodyNode = params.xml.querySelector('body');

    params.documentData.styles.defaults.options.pageContentWidth = {
        value: 0,
        unit: "pt"
    };

    if (bodyNode) {
        lazyLoopOptions = {
            chunk: 20,
            time: 0,
            data: $.children(bodyNode),
            index: 0
        };

        lazyLoopOptions.len = lazyLoopOptions.data.length;
        lazyLoopOptions.all = lazyLoopOptions.len;

        sectionProperties = lazyLoopOptions.data[lazyLoopOptions.len - 1];

        if (sectionProperties.localName === 'sectPr') {
            /**
             * @description remove last iteration - iteration with sectionProperties
             */
            lazyLoopOptions.len--;
            lazyLoopOptions.all = lazyLoopOptions.len;

            children = $.children(sectionProperties);
            c = children.length;

            while (c--) {
                switch (children[c].localName) {
                case "pgSz":
                    if (children[c].attributes['w:w'] && !isNaN(children[c].attributes['w:w'].value)) {
                        pageOptions.dimensionCssRules.width = {
                            value: children[c].attributes['w:w'].value / 20,
                            unit: "pt"
                        };

                        params.documentData.styles.defaults.options.pageContentWidth.value +=
                            pageOptions.dimensionCssRules.width.value;
                    }

                    if (children[c].attributes['w:h'] && !isNaN(children[c].attributes['w:h'].value)) {
                        pageOptions.dimensionCssRules.height = {
                            value: (+children[c].attributes['w:h'].value / 20),
                            unit: "pt"
                        };

                        pageHeight += pageOptions.dimensionCssRules.height.value;
                    }

                    break;
                case "pgMar":
                    if (children[c].attributes['w:top'] && !isNaN(children[c].attributes['w:top'].value)) {
                        pageOptions.dimensionCssRules.paddingTop = {
                            value: children[c].attributes['w:top'].value / 20,
                            unit: "pt"
                        };

                        pageHeight -= pageOptions.dimensionCssRules.paddingTop.value;
                    }

                    if (children[c].attributes['w:left'] && !isNaN(children[c].attributes['w:left'].value)) {
                        pageOptions.dimensionCssRules.paddingLeft = {
                            value: children[c].attributes['w:left'].value / 20,
                            unit: "pt"
                        };

                        params.documentData.styles.defaults.options.pageContentWidth.value -=
                            pageOptions.dimensionCssRules.paddingLeft.value;
                    }

                    if (children[c].attributes['w:right'] && !isNaN(children[c].attributes['w:right'].value)) {
                        pageOptions.dimensionCssRules.paddingRight = {
                            value: children[c].attributes['w:right'].value / 20,
                            unit: "pt"
                        };

                        params.documentData.styles.defaults.options.pageContentWidth.value -=
                            pageOptions.dimensionCssRules.paddingRight.value;
                    }

                    if (children[c].attributes['w:bottom'] && !isNaN(children[c].attributes['w:bottom'].value)) {
                        pageOptions.dimensionCssRules.paddingBottom = {
                            value: children[c].attributes['w:bottom'].value / 20,
                            unit: "pt"
                        };

                        pageHeight -= pageOptions.dimensionCssRules.paddingBottom.value;
                    }

                    if (
                        pageOptions.options.pageNumber &&
                            children[c].attributes['w:header'] &&
                            !isNaN(children[c].attributes['w:header'].value)
                    ) {
                        pageOptions.options.header.dimensionCssRules.height = {
                            value: children[c].attributes['w:header'].value / 20,
                            unit: "pt"
                        };
                    }
                    if (
                        children[c].attributes['w:footer'] && !isNaN(children[c].attributes['w:footer'].value)
                    ) {
                        pageOptions.options.footer.dimensionCssRules.height = {
                            value: children[c].attributes['w:footer'].value / 20,
                            unit: "pt"
                        };
                    }

                    if (
                        children[c].attributes['w:gutter'] &&
                            !isNaN(children[c].attributes['w:gutter'].value)
                        ) {
                        pageOptions.dimensionCssRules.marginTop = {
                            value: children[c].attributes['w:gutter'].value / 20,
                            unit: "pt"
                        };
                    }

                    break;
                case "pgNumType":
                    pageOptions.options.pageNumber = {
                        value: 0,
                        start: (
                            children[c].attributes['w:start'] && !isNaN(children[c].attributes['w:start'].value)
                        ) ? +children[c].attributes['w:start'].value : 1
                    };
                    break;
                case "cols":
                    pageOptions.options.columns.equalWidth =
                        self.attributeToBoolean(children[c].attributes['w:equalWidth']);
                    pageOptions.options.columns.separated =
                        self.attributeToBoolean(children[c].attributes['w:sep']);
                    pageOptions.options.columns.number = (
                        children[c].attributes['w:num'] && !isNaN(children[c].attributes['w:num'])
                        ) ? +children[c].attributes['w:num'] : pageOptions.options.columns.number;
                    pageOptions.options.columns.space = (
                        children[c].attributes['w:space'] && !isNaN(children[c].attributes['w:space'].value)
                        ) ? {
                        value: (+children[c].attributes['w:space'].value / 20),
                        unit: "pt"
                    } : pageOptions.options.columns.space;
                    break;
                case "docGrid":
                    if (
                        children[c].attributes['w:linePitch'] &&
                            !isNaN(children[c].attributes['w:linePitch'].value)
                    ) {
                        params.documentData.styles.defaults.options.linePitch = {
                            value: children[c].attributes['w:linePitch'].value / 20,
                            unit: "pt"
                        };
                    }
                    break;
                }
            }

            cachedLength = sectionProperties.attributes.length;
            for (i = 0; i < cachedLength; i++) {
                if (sectionProperties.attributes[i].value) {
                    pageOptions.options[self.replaceAttributeNamespace(sectionProperties.attributes[i].name)] = (
                        isNaN(sectionProperties.attributes[i].value)
                    ) ? sectionProperties.attributes[i].value : (
                        +sectionProperties.attributes[i].value
                    );
                }
            }
        }

        iteration = function (options) {
            options.end = options.index + (options.all > options.chunk ? options.chunk : options.all);
            setTimeout(function () {
                for (options.index; options.index < options.end; options.index++) {
                    var localName = options.data[options.index].localName,
                        lineHeight = 0,
                        isListItem;

                    if (localName === "p") {
                        lineNodeData = self._parseTextDocumentParagraphNode({
                            node: options.data[options.index],
                            documentData: params.documentData
                        });
                        lineHeight = lineNodeData.options.elementHeight.value;
                        isListItem = lineNodeData.options.isListItem;

                        if (isListItem) {
                            if (!listLine) {
                                listLine = {
                                    options: {
                                        isList: true
                                    },
                                    dimensionCssRules: {
                                        padding: {
                                            value: 0,
                                            unit: "pt"
                                        },
                                        margin: {
                                            value: 0,
                                            unit: "pt"
                                        }
                                    },
                                    children: []
                                };
                            }

                            if (lineNodeData.dimensionCssRules.paddingLeft) {
                                listLine.dimensionCssRules.paddingLeft = lineNodeData.dimensionCssRules.paddingLeft;
                                delete lineNodeData.dimensionCssRules.paddingLeft;
                            }

                            if (lineNodeData.dimensionCssRules.marginLeft) {
                                listLine.dimensionCssRules.marginLeft = lineNodeData.dimensionCssRules.marginLeft;
                                delete lineNodeData.dimensionCssRules.marginLeft;
                            }
                        }

                        pageLinesHeight = self._checkPageLinesHeight({
                            pageOptions: pageOptions,
                            pageHeight: pageHeight,
                            lineHeight: lineHeight,
                            pages: result.pages,
                            pageLinesHeight: pageLinesHeight,
                            pageElements: pageElements
                        });

                        if (!pageLinesHeight) {
                            if (listLine) {
                                pageElements.push(listLine);
                                listLine = clone(listLine);
                                listLine.children = [];
                            }
                            pageOptions.options.pageIndex++;
                            pageElements = [];
                            pageLinesHeight += lineHeight;
                        }

                        if (isListItem) {
                            listLine.children.push(lineNodeData);
                        } else if (listLine) {
                            pageElements.push(listLine);
                            listLine = null;
                        } else {
                            pageElements.push(lineNodeData);
                        }

                        callbacks++;
                    } else if (localName === 'tbl') {
                        self._parseTextDocumentTableNode(
                            {
                                tableNode: options.data[options.index],
                                documentData: params.documentData
                            },
                            function (data) {
                                var lineHeight = lineNodeData.options.elementHeight.value;

                                pageLinesHeight = self._checkPageLinesHeight({
                                    pageOptions: pageOptions,
                                    pageHeight: pageHeight,
                                    lineHeight: lineHeight,
                                    pages: result.pages,
                                    pageLinesHeight: pageLinesHeight,
                                    pageElements: pageElements
                                });

                                if (!pageLinesHeight) {
                                    pageOptions.options.pageIndex++;
                                    pageElements = [];
                                }

                                pageElements.push(data);
                                pageLinesHeight += lineHeight;

                                callbacks++;
                                return false;
                            }
                        );
                    } else {
                        callbacks++;
                    }

                    if (callbacks >= options.len) {
                        page = pageOptions;
                        page.children = pageElements;
                        result.pages.push(page);

                        if (typeof params.callback === 'function') {
                            params.callback(result);
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
    } else {
        if (typeof params.callback === 'function') {
            params.callback(result);
        }
    }

    return null;
};