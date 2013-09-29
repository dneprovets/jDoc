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
        len,
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
        switch (controlWord) {
        case "page":
            page = {
                options: {},
                css: {},
                dimensionCSSRules: {},
                elements: []
            };
            parseParams.currentPageIndex++;
            parseParams.currentParagraphIndex = 0;
            parseResult.pages[parseParams.currentPageIndex] = page;
            paragraph = {
                options: {
                    isParagraph: true
                },
                css: {},
                dimensionCSSRules: {},
                elements: []
            };
            parseParams.currentTextElement = {
                options: {},
                properties: {
                    textContent: ""
                }
            };
            paragraph.elements.push(parseParams.currentTextElement);
            page.elements[parseParams.currentParagraphIndex] = paragraph;
            break;
        case "par":
            parseParams.currentParagraphIndex++;
            paragraph = {
                options: {
                    isParagraph: true
                },
                css: {},
                dimensionCSSRules: {},
                elements: []
            };
            parseParams.currentTextElement = {
                options: {},
                properties: {
                    textContent: ""
                }
            };
            paragraph.elements.push(parseParams.currentTextElement);
            page.elements[parseParams.currentParagraphIndex] = paragraph;
            break;
        case "b":
            paragraph.css.fontWeight = "bold";
            break;
        case "i":
            paragraph.css.fontStyle = "italic";
            break;
        case "ul":
            paragraph.css.textDecoration = "underline";
            break;
        case "strike":
            paragraph.css.textDecoration = "line-through";
            break;
        case "scaps":
            paragraph.css.fontVariant = "small-caps";
            break;
        case "fs":
            paragraph.dimensionCSSRules.fontSize = {
                value: param,
                units: "px"
            };
            break;
        default:
            //console.log(controlWord);
        }
    }

    return index;
};