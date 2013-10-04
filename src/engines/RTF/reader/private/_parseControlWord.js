/**
 *
 * @param text {String}
 * @param index {Number}
 * @param parseParams {*}
 * @param parseResult {*}
 * @returns {Number}
 * @private
 */
jDoc.Engines.RTF.prototype._parseControlWord = function (text, index, parseParams, parseResult) {
    var controlWord = "",
        clearedControlWord,
        match,
        el,
        i,
        page = parseResult.pages[parseParams.currentPageIndex],
        element = page.elements[parseParams.currentElementIndex],
        param = -1;

    while (text[index] !== ' ' && text[index] !== '\\' && text[index] !== '{' && text[index] !== '}') {
        if (text[index] !== '\r' && text[index] !== '\n') {
            controlWord += text[index];
        }
        if (text[index] === '*') {
            parseParams.ignoreGroups.push(parseParams.braceCounter);
        }
        index += 1;
    }
    index += text[index] === ' ' ? 1 : 0;

    match = controlWord.search(/-?\d+$/gi);

    if (match !== -1) {
        param = parseInt(controlWord.substr(match), 10);
        controlWord = controlWord.substr(0, match);
    }

    clearedControlWord = controlWord.replace(/[;]/, '');

    if (this._ignoreControlWords.indexOf(clearedControlWord) >= 0) {
        parseParams.ignoreGroups.push(parseParams.braceCounter);
    } else if (!parseParams.ignoreGroups.length) {
        el = (parseParams.currentTextElement || element);

        switch (clearedControlWord) {
        case "page":
            page = jDoc.clone(parseParams.pageData);
            element = jDoc.clone(parseParams.paragraphData);
            parseParams.currentTextElement = null;
            parseParams.currentPageIndex++;
            parseParams.currentElementIndex = 0;
            parseResult.pages[parseParams.currentPageIndex] = page;
            page.elements[parseParams.currentElementIndex] = element;
            break;
        case "par":
            parseParams.currentElementIndex++;
            /**
             * inherit previous paragraph
             * @type {*}
             */
            element = jDoc.deepMerge({}, (element && element.options.isParagraph ? element : parseParams.paragraphData), {
                elements: []
            });
            page.elements[parseParams.currentElementIndex] = element;
            parseParams.currentTextElement = null;
            break;
        case "cell":
            parseParams.currentElementIndex++;
            element = {
                options: {
                    isParagraph: true
                },
                css: {},
                dimensionCSSRules: {},
                elements: []
            };
            page.elements[parseParams.currentElementIndex] = element;
            parseParams.currentTextElement = null;
            break;
        case "paperw":
            parseParams.pageData.dimensionCSSRules.width = {
                value: param / 20,
                units: "pt"
            };
            for (i = parseResult.pages.length - 1; i >= 0; i--) {
                parseResult.pages[i].dimensionCSSRules =
                    jDoc.deepMerge({}, parseParams.pageData.dimensionCSSRules, parseResult.pages[i].dimensionCSSRules);
            }
            break;
        case "paperh":
            parseParams.pageData.dimensionCSSRules.height = {
                value: param / 20,
                units: "pt"
            };
            for (i = parseResult.pages.length - 1; i >= 0; i--) {
                parseResult.pages[i].dimensionCSSRules =
                    jDoc.deepMerge({}, parseParams.pageData.dimensionCSSRules, parseResult.pages[i].dimensionCSSRules);
            }
            break;
        case "margl":
            parseParams.pageData.dimensionCSSRules.paddingLeft = {
                value: param / 20,
                units: "pt"
            };
            for (i = parseResult.pages.length - 1; i >= 0; i--) {
                parseResult.pages[i].dimensionCSSRules =
                    jDoc.deepMerge({}, parseParams.pageData.dimensionCSSRules, parseResult.pages[i].dimensionCSSRules);
            }
            break;
        case "margr":
            parseParams.pageData.dimensionCSSRules.paddingRight = {
                value: param / 20,
                units: "pt"
            };
            for (i = parseResult.pages.length - 1; i >= 0; i--) {
                parseResult.pages[i].dimensionCSSRules =
                    jDoc.deepMerge({}, parseParams.pageData.dimensionCSSRules, parseResult.pages[i].dimensionCSSRules);
            }
            break;
        case "margt":
            parseParams.pageData.dimensionCSSRules.paddingTop = {
                value: param / 20,
                units: "pt"
            };
            for (i = parseResult.pages.length - 1; i >= 0; i--) {
                parseResult.pages[i].dimensionCSSRules =
                    jDoc.deepMerge({}, parseParams.pageData.dimensionCSSRules, parseResult.pages[i].dimensionCSSRules);
            }
            break;
        case "margb":
            parseParams.pageData.dimensionCSSRules.paddingBottom = {
                value: param / 20,
                units: "pt"
            };
            for (i = parseResult.pages.length - 1; i >= 0; i--) {
                parseResult.pages[i].dimensionCSSRules =
                    jDoc.deepMerge({}, parseParams.pageData.dimensionCSSRules, parseResult.pages[i].dimensionCSSRules);
            }
            break;
        case "gutter":
            parseParams.pageData.dimensionCSSRules.marginTop = {
                value: param / 20,
                units: "pt"
            };
            for (i = parseResult.pages.length - 1; i > 0; i--) {
                parseResult.pages[i].dimensionCSSRules =
                    jDoc.deepMerge({}, parseParams.pageData.dimensionCSSRules, parseResult.pages[i].dimensionCSSRules);
            }
            break;
        case "fs":
            if (param !== -1) {
                el.dimensionCSSRules.fontSize = {
                    value: param / 2,
                    units: "pt"
                };
            }
            break;
        case "f":
            if (param !== -1) {
                el.dimensionCSSRules.fontSize = {
                    value: param / 2,
                    units: "pt"
                };
            }
            break;
        case "b":
            if (param === -1) {
                el.css.fontWeight = "bold";
            }
            break;
        case "scaps":
            el.css.fontVariant = "small-caps";
            break;
        case "qj":
            element.css.textAlign = "justify";
            break;
        case "ul":
            el.css.textDecoration = "underline";
            break;
        case "strike":
            el.css.textDecoration = "line-through";
            break;
        case "i":
            if (param === -1) {
                el.css.textDecoration = "line-through";
            }
            break;
        case "li":
            if (param > 0) {
                element.dimensionCSSRules.paddingLeft = {
                    value: param / 20,
                    units: "pt"
                };
            }
            break;
        case "fi":
            if (param > 0) {
                element.dimensionCSSRules.textIndent = {
                    value: param / 20,
                    units: "pt"
                };
            }
            break;
        case "sa":
            if (param > 0) {
                element.dimensionCSSRules.marginBottom = {
                    value: param / 20,
                    units: "pt"
                };
            }
            break;
        case "sb":
            if (param > 0) {
                element.dimensionCSSRules.marginTop = {
                    value: param / 20,
                    units: "pt"
                };
            }
            break;
        case "plain":
            this._resetFontProperties(el);
            break;
        case "pard":
            if (!element.options.isParagraph) {
                parseParams.currentElementIndex++;
                element = jDoc.clone(parseParams.paragraphData);
                page.elements[parseParams.currentElementIndex] = element;
                parseParams.currentTextElement = null;
            }
            this._resetParagraphProperties(element);
            break;
        case "tab":
            if (parseParams.currentTextElement) {
                parseParams.currentTextElement.properties.textContent += this._getTabAsSpaces();
            }
            break;
        case "tx":
            if (param > 0 && parseParams.currentTextElement) {
                parseParams.currentTextElement.dimensionCSSRules.paddingLeft = {
                    value: param / 20,
                    units: "pt"
                };
            }
            break;
        default:
            console.log(controlWord);
        }
    }

    return index;
};