/**
 *
 * @param text
 * @param callback
 * @private
 */
jDoc.Engines.RTF.prototype._createParsedFile = function (text, callback) {
    var i = 0,
        parseResult = {
            pages: [{
                options: {},
                css: {},
                dimensionCSSRules: {},
                elements: [{
                    options: {
                        isParagraph: true
                    },
                    css: {},
                    dimensionCSSRules: {},
                    elements: []
                }]
            }]
        },
        parseParams = {
            currentTextElement: null,
            currentPageIndex: 0,
            currentParagraphIndex: 0,
            ignoreControlWords: [
                "stylesheet", "fonttbl", "info"
            ],
            ignoreGroups: [],
            braceCounter: 0
        };

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
                if (!parseParams.currentTextElement) {
                    parseParams.currentTextElement = {
                        options: {},
                        properties: {
                            textContent: ""
                        }
                    };
                    parseResult.pages[parseParams.currentPageIndex]
                        .elements[parseParams.currentParagraphIndex].elements.push(parseParams.currentTextElement);
                }
                parseParams.currentTextElement.properties.textContent += text[i];
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
            break;
        default:
            if (!parseParams.ignoreGroups.length) {
                if (!parseParams.currentTextElement) {
                    parseParams.currentTextElement = {
                        options: {},
                        properties: {
                            textContent: ""
                        }
                    };
                    parseResult.pages[parseParams.currentPageIndex]
                        .elements[parseParams.currentParagraphIndex].elements.push(parseParams.currentTextElement);
                }
                parseParams.currentTextElement.properties.textContent += text[i];
            }
            i += 1;
            break;
        }
    }

    console.log(parseParams, parseResult);

    if (typeof callback === 'function') {
        callback(new jDoc.ParsedFile(parseResult));
    }
};