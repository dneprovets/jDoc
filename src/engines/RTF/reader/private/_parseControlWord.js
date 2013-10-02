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
    var controlWord = '',
        match,
        el,
        i,
        page = parseResult.pages[parseParams.currentPageIndex],
        paragraph = page.elements[parseParams.currentParagraphIndex],
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

    if (parseParams.ignoreControlWords.indexOf(controlWord) >= 0) {
        parseParams.ignoreGroups.push(parseParams.braceCounter);
    } else {
        if (controlWord === "page") {
            page = jDoc.clone(parseParams.pageData);
            paragraph = jDoc.clone(parseParams.paragraphData);
            parseParams.currentTextElement = null;
            parseParams.currentPageIndex++;
            parseParams.currentParagraphIndex = 0;
            parseResult.pages[parseParams.currentPageIndex] = page;
            page.elements[parseParams.currentParagraphIndex] = paragraph;
        } else if (controlWord === "par") {
            parseParams.currentParagraphIndex++;
            paragraph = jDoc.clone(parseParams.paragraphData);
            page.elements[parseParams.currentParagraphIndex] = paragraph;
            parseParams.currentTextElement = null;
        } else if (!parseParams.ignoreGroups.length) {
            el = (parseParams.currentTextElement || paragraph);
            switch (controlWord) {
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
                el.dimensionCSSRules.fontSize = {
                    value: param,
                    units: "px"
                };
                break;
            case "b":
                if (param === -1) {
                    el.css.fontWeight = "bold";
                }
                break;
            case "scaps":
                el.css.fontVariant = "small-caps";
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
            }
        }
    }

    return index;
};