/**
 *
 * @param text
 * @private
 */
RTF.prototype.createFileData = {
    value (text) {
        return new Promise(function (resolve) {
            var i = 0,
                textContent,
                a4DimensionCssRules = jDoc.a4DimensionCssRules,
                pageHeight = a4DimensionCssRules.height,
                pageWidth = a4DimensionCssRules.width,
                parseParams = {
                    unParsedControlWords: {},
                    styles: {
                        cells: {
                            css: {},
                            dimensionCssRules: {}
                        },
                        table: {
                            css: {
                                width: "100%"
                            },
                            dimensionCssRules: {}
                        },
                        rows: {
                            css: {},
                            dimensionCssRules: {}
                        },
                        defaults: {
                            css: {
                                borderStyle: "solid",
                                borderColor: "#000000"
                            },
                            dimensionCssRules: {
                                borderWidth: {
                                    value: 0.75,
                                    unit: "pt"
                                }
                            }
                        }
                    },
                    options: {
                        table: {}
                    },
                    pageData: {
                        options: {},
                        attributes: {},
                        css: {},
                        dimensionCssRules: {
                            paddingBottom: {
                                unit: "pt",
                                value: 42.5
                            },
                            paddingLeft: {
                                unit: "pt",
                                value: 70.85
                            },
                            paddingRight: {
                                unit: "pt",
                                value: 42.5
                            },
                            paddingTop: {
                                unit: "pt",
                                value: 42.5
                            },
                            width: {
                                value: pageWidth,
                                unit: "pt"
                            },
                            height: {
                                value: pageHeight,
                                unit: "pt"
                            }
                        },
                        children: []
                    },
                    paragraphData: {
                        options: {
                            isParagraph: true
                        },
                        css: {
                            margin: "0"
                        },
                        dimensionCssRules: {
                            // default font size
                            fontSize: {
                                value: 14,
                                unit: "pt"
                            }
                        },
                        children: []
                    },
                    hexWordsMask: (/^'/),
                    pageContentHeight: 0,
                    pageHeight: pageHeight,
                    pageWidth: pageWidth,
                    currentTextElementParent: null,
                    currentTextElement: null,
                    currentPageIndex: 0,
                    currentElementIndex: 0,
                    ignoreGroups: [],
                    braceCounter: 0
                },
                parseResult = {
                    name: this.fileName,
                    pages: [copy(parseParams.pageData, {
                        children: [copy(parseParams.paragraphData, {
                            children: [{
                                options: {},
                                css: {},
                                dimensionCssRules: {},
                                properties: {
                                    textContent: ""
                                }
                            }]
                        })]
                    })]
                };

            parseParams.currentTextElementParent = parseResult.pages[0].children[0];
            parseParams.currentTextElement = parseParams.currentTextElementParent.children[0];

            while (text[i]) {
                switch (text[i]) {
                    case '\r':
                        i += 1;
                        break;
                    case '\n':
                        i += 1;
                        break;
                    case '\\':
                        i += 1;
                        if (text[i] !== '\\') {
                            i = this._parseControlWord(text, i, parseParams, parseResult);
                        } else {
                            if (!parseParams.ignoreGroups.length) {
                                if (!parseParams.currentTextElement) {
                                    parseParams.currentTextElement = {
                                        options: {},
                                        css: {},
                                        dimensionCssRules: {},
                                        properties: {
                                            textContent: ""
                                        }
                                    };
                                    if (parseParams.currentTextElementParent.options.isImage) {
                                        parseParams.currentTextElementParent.attributes.src = (
                                        parseParams.currentTextElementParent.attributes.src || ""
                                        ) + parseParams.currentTextElement.properties.textContent;
                                    } else {
                                        parseParams.currentTextElementParent.children.push(parseParams.currentTextElement);
                                    }
                                }
                                if (parseParams.currentTextElementParent.options.isImage) {
                                    parseParams.currentTextElementParent.attributes.src = (
                                    parseParams.currentTextElementParent.attributes.src || ""
                                    ) + text[i];
                                } else {
                                    parseParams.currentTextElement.properties.textContent += text[i];
                                }
                            }
                            i += 1;
                        }
                        break;
                    case '{':
                        parseParams.braceCounter += 1;
                        i += 1;
                        break;
                    case '}':
                        if (parseParams.braceCounter === parseParams.ignoreGroups[parseParams.ignoreGroups.length - 1]) {
                            parseParams.ignoreGroups.pop();
                        }
                        parseParams.braceCounter -= 1;
                        i += 1;
                        if (parseParams.currentTextElement && parseParams.currentTextElement.properties.textContent.length) {
                            if (parseParams.currentTextElementParent.children.indexOf(parseParams.currentTextElement) < 0) {
                                parseParams.currentTextElementParent.children.push(parseParams.currentTextElement);
                            }
                            parseParams.currentTextElement = {
                                options: {},
                                css: {},
                                dimensionCssRules: {},
                                properties: {
                                    textContent: ""
                                }
                            };
                        }
                        break;
                    default:
                        textContent = "";
                        if (!parseParams.ignoreGroups.length) {
                            if (!parseParams.currentTextElement) {
                                parseParams.currentTextElement = {
                                    options: {},
                                    css: {},
                                    dimensionCssRules: {},
                                    properties: {
                                        textContent: ""
                                    }
                                };
                                if (parseParams.currentTextElementParent.options.isImage) {
                                    parseParams.currentTextElementParent.attributes.src = (
                                        parseParams.currentTextElementParent.attributes.src || ""
                                    ) + parseParams.currentTextElement.properties.textContent;
                                } else {
                                    parseParams.currentTextElementParent.children.push(parseParams.currentTextElement);
                                }
                            }
                            if (text[i] === " " && text[i + 1] === " ") {
                                i += 1;
                                textContent = this.halfTabAsSpaces;
                            } else {
                                textContent = text[i];
                            }

                            if (parseParams.currentTextElementParent.options.isImage) {
                                parseParams.currentTextElementParent.attributes.src = (
                                    parseParams.currentTextElementParent.attributes.src || ""
                                ) + textContent;
                            } else {
                                parseParams.currentTextElement.properties.textContent += textContent;
                            }
                        }
                        i += 1;
                        break;
                }
            }

            resolve(new jDoc.FileData(parseResult));
        }.bind(this));
    }
};