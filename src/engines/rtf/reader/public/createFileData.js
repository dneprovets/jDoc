/**
 *
 * @param text
 * @param callback
 * @private
 */
RTF.prototype.createFileData = function (text, callback) {
    var i = 0,
        textContent,
        pageHeight = 756,
        pageWidth = 595,
        parseParams = {
            unParsedControlWords: {},
            styles: {
                cells: {
                    css: {},
                    dimensionCSSRules: {}
                },
                table: {
                    css: {
                        width: "100%"
                    },
                    dimensionCSSRules: {}
                },
                rows: {
                    css: {},
                    dimensionCSSRules: {}
                },
                defaults: {
                    css: {
                        borderStyle: "solid",
                        borderColor: "#000000"
                    },
                    dimensionCSSRules: {
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
                dimensionCSSRules: {
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
                dimensionCSSRules: {
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
            pages: [copy(parseParams.pageData, {
                children: [copy(parseParams.paragraphData, {
                    children: [{
                        options: {},
                        css: {},
                        dimensionCSSRules: {},
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
                            dimensionCSSRules: {},
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
                    dimensionCSSRules: {},
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
                        dimensionCSSRules: {},
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
                    textContent = this.getHalfTabAsSpaces();
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

    if (typeof callback === 'function') {
        callback.call(this, new jDoc.FileData(parseResult));
    }
};