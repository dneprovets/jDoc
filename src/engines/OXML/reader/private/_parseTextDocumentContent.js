/**
 * @description Parsing content of document
 * @param params
 * @return {Object}
 * @private
 */
jDoc.engines.OXML.prototype._parseTextDocumentContent = function (params) {
    params.documentData._heading = [];
    var result = {
        pages: []
    },
        pageOptions = {
            css: {},
            dimensionCSSRules: {},
            options: {
                pageIndex: 0,
                pageNumber: null,
                header: {
                    css: {},
                    dimensionCSSRules: {}
                },
                footer: {
                    css: {},
                    dimensionCSSRules: {}
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
        lineHeight = 0,
        sectionProperties,
        len,
        pageHeight = 0,
        c,
        lazyLoopOptions,
        bodyNode = params.xml.querySelector('body');

    params.documentData.styles.defaults.options.pageContentWidth = {
        value: 0,
        units: "pt"
    };

    if (bodyNode) {
        lazyLoopOptions = {
            chunk: 20,
            time: 0,
            data: jDoc.DOM.children(bodyNode),
            index: 0
        };

        lazyLoopOptions.len = lazyLoopOptions.data.length;
        lazyLoopOptions.all = lazyLoopOptions.len;

        sectionProperties = lazyLoopOptions.data[lazyLoopOptions.len - 1];

        if (sectionProperties.localName === 'sectPr') {
            /**
             * remove last iteration - iteration with sectionProperties
             */
            lazyLoopOptions.len--;
            lazyLoopOptions.all = lazyLoopOptions.len;

            children = jDoc.DOM.children(sectionProperties);
            len = children.length;

            for (c = len - 1; c >= 0; c--) {
                switch (children[c].localName) {
                case "pgSz":
                    if (children[c].attributes['w:w'] && !isNaN(children[c].attributes['w:w'].value)) {
                        pageOptions.dimensionCSSRules.width = {
                            value: children[c].attributes['w:w'].value / 20,
                            units: "pt"
                        };

                        params.documentData.styles.defaults.options.pageContentWidth.value +=
                            pageOptions.dimensionCSSRules.width.value;
                    }

                    if (children[c].attributes['w:h'] && !isNaN(children[c].attributes['w:h'].value)) {
                        pageOptions.dimensionCSSRules.height = {
                            value: (+children[c].attributes['w:h'].value / 20),
                            units: "pt"
                        };

                        pageHeight += pageOptions.dimensionCSSRules.height.value;
                    }

                    break;
                case "pgMar":
                    if (children[c].attributes['w:top'] && !isNaN(children[c].attributes['w:top'].value)) {
                        pageOptions.dimensionCSSRules.paddingTop = {
                            value: children[c].attributes['w:top'].value / 20,
                            units: "pt"
                        };

                        pageHeight -= pageOptions.dimensionCSSRules.paddingTop.value;
                    }

                    if (children[c].attributes['w:left'] && !isNaN(children[c].attributes['w:left'].value)) {
                        pageOptions.dimensionCSSRules.paddingLeft = {
                            value: children[c].attributes['w:left'].value / 20,
                            units: "pt"
                        };

                        params.documentData.styles.defaults.options.pageContentWidth.value -=
                            pageOptions.dimensionCSSRules.paddingLeft.value;
                    }

                    if (children[c].attributes['w:right'] && !isNaN(children[c].attributes['w:right'].value)) {
                        pageOptions.dimensionCSSRules.paddingRight = {
                            value: children[c].attributes['w:right'].value / 20,
                            units: "pt"
                        };

                        params.documentData.styles.defaults.options.pageContentWidth.value -=
                            pageOptions.dimensionCSSRules.paddingRight.value;
                    }

                    if (children[c].attributes['w:bottom'] && !isNaN(children[c].attributes['w:bottom'].value)) {
                        pageOptions.dimensionCSSRules.paddingBottom = {
                            value: children[c].attributes['w:bottom'].value / 20,
                            units: "pt"
                        };

                        pageHeight -= pageOptions.dimensionCSSRules.paddingBottom.value;
                    }

                    if (
                        pageOptions.options.pageNumber &&
                            children[c].attributes['w:header'] &&
                            !isNaN(children[c].attributes['w:header'].value)
                    ) {
                        pageOptions.options.header.dimensionCSSRules.height = {
                            value: children[c].attributes['w:header'].value / 20,
                            units: "pt"
                        };
                    }
                    if (
                        children[c].attributes['w:footer'] && !isNaN(children[c].attributes['w:footer'].value)
                    ) {
                        pageOptions.options.footer.dimensionCSSRules.height = {
                            value: children[c].attributes['w:footer'].value / 20,
                            units: "pt"
                        };
                    }

                    if (
                        children[c].attributes['w:gutter'] &&
                            !isNaN(children[c].attributes['w:gutter'].value)
                        ) {
                        pageOptions.dimensionCSSRules.marginTop = {
                            value: children[c].attributes['w:gutter'].value / 20,
                            units: "pt"
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
                        self._attributeToBoolean(children[c].attributes['w:equalWidth']);
                    pageOptions.options.columns.separated =
                        self._attributeToBoolean(children[c].attributes['w:sep']);
                    pageOptions.options.columns.number = (
                        children[c].attributes['w:num'] && !isNaN(children[c].attributes['w:num'])
                        ) ? +children[c].attributes['w:num'] : pageOptions.options.columns.number;
                    pageOptions.options.columns.space = (
                        children[c].attributes['w:space'] && !isNaN(children[c].attributes['w:space'].value)
                        ) ? {
                        value: (+children[c].attributes['w:space'].value / 20),
                        units: "pt"
                    } : pageOptions.options.columns.space;
                    break;
                case "docGrid":
                    if (
                        children[c].attributes['w:linePitch'] &&
                            !isNaN(children[c].attributes['w:linePitch'].value)
                    ) {
                        params.documentData.styles.defaults.options.linePitch = {
                            value: children[c].attributes['w:linePitch'].value / 20,
                            units: "pt"
                        };
                    }
                    break;
                }
            }

            cachedLength = sectionProperties.attributes.length;
            for (i = 0; i < cachedLength; i++) {
                if (sectionProperties.attributes[i].value) {
                    pageOptions.options[self._replaceAttributeNamespace(sectionProperties.attributes[i].name)] = (
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
                    if (options.data[options.index].localName === "p") {
                        lineHeight = 0;
                        lineNodeData = self._parseTextDocumentParagraphNode({
                            node: options.data[options.index],
                            documentData: params.documentData
                        });
                        if (lineNodeData.options.isListItem) {
                            if (!listLine) {
                                listLine = {
                                    options: {
                                        isList: true
                                    },
                                    dimensionCSSRules: {
                                        padding: {
                                            value: 0,
                                            units: "pt"
                                        },
                                        margin: {
                                            value: 0,
                                            units: "pt"
                                        }
                                    },
                                    items: []
                                };
                            }

                            if (lineNodeData.dimensionCSSRules.paddingLeft) {
                                listLine.dimensionCSSRules.paddingLeft = lineNodeData.dimensionCSSRules.paddingLeft;
                                delete lineNodeData.dimensionCSSRules.paddingLeft;
                            }

                            if (lineNodeData.dimensionCSSRules.marginLeft) {
                                listLine.dimensionCSSRules.marginLeft = lineNodeData.dimensionCSSRules.marginLeft;
                                delete lineNodeData.dimensionCSSRules.marginLeft;
                            }

                            lineHeight += lineNodeData.options.elementHeight.value;
                            listLine.items.push(lineNodeData);
                        } else {
                            if (!listLine) {
                                lineHeight = lineNodeData.options.elementHeight.value;
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
                                pageOptions.options.pageIndex++;
                                pageElements = [];
                            }

                            if (listLine) {
                                pageElements.push(listLine);
                                listLine = null;
                            } else {
                                pageElements.push(lineNodeData);
                            }

                            pageLinesHeight += lineHeight;
                        }

                        callbacks++;
                    } else if (options.data[options.index].localName === 'tbl') {
                        self._parseTextDocumentTableNode(
                            {
                                tableNode: options.data[options.index],
                                documentData: params.documentData
                            },
                            function (data) {
                                lineHeight = lineNodeData.options.elementHeight.value;

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
                        page.elements = pageElements;
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