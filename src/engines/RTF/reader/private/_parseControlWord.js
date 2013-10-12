jDoc.Engines.RTF.prototype.controlWordsParsers = {};
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
    var match,
        el,
        i,
        currentRowIndex = 0,
        currentCellIndex = 0,
        count,
        page = parseResult.pages[parseParams.currentPageIndex],
        controlWordParseResult,
        param,
        controlWordParserData;

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

    if (controlWord[0] === "'") {
        /**
         * +1 - exclude ' symbol
         * @type {number}
         */
        match = controlWord.search(/'[a-z0-9]+$/gi) + 1;

        if (match) {
            param = controlWord.substr(match);
            controlWord = controlWord.substr(0, match);
            clearedControlWord = controlWord;
        }
    } else {
        match = controlWord.search(/-?\d+$/gi);

        if (match !== -1) {
            param = parseInt(controlWord.substr(match), 10);
            controlWord = controlWord.substr(0, match);
        }

        clearedControlWord = controlWord.replace(/[;]/, '');
    }

    if (this._ignoreControlWordGroups[clearedControlWord]) {
        parseParams.ignoreGroups.push(parseParams.braceCounter);
    } else if (clearedControlWord && !parseParams.ignoreGroups.length) {
        if (this.controlWordsParsers[clearedControlWord]) {
            controlWordParserData = {
                clearedControlWord: clearedControlWord,
                controlWord: controlWord,
                parseResult: parseResult,
                parseParams: parseParams,
                param: param
            };
            controlWordParseResult = this.controlWordsParsers[clearedControlWord];
            parseResult = controlWordParseResult.parseResult;
            parseParams = controlWordParseResult.parseParams;
            controlWordParserData = null;
            controlWordParseResult = null;
        } else {

        }

        switch (clearedControlWord) {
        case "tab":
            if (parseParams.currentTextElement) {
                parseParams.currentTextElement.properties.textContent += this._getTabAsSpaces();
            }
            break;
        case "~":
            if (parseParams.currentTextElement) {
                parseParams.currentTextElement.properties.textContent += this._getNonbreakingSpace();
            }
            break;
        case "'":
            if (parseParams.currentTextElement && isNaN(param)) {
                parseParams.currentTextElement.properties.textContent += this._getCharFromHex(param);
            }
            break;
        case "clvertalt":
            parseParams.styles.cells.css.verticalAlign = "top";
            break;
        case "clvertalc":
            parseParams.styles.cells.css.verticalAlign = "middle";
            break;
        case "clvertalb":
            parseParams.styles.cells.css.verticalAlign = "bottom";
            break;
        case "clbrdrt":
            parseParams.styles.cells.dimensionCSSRules.borderTopWidth =
                parseParams.styles.defaults.dimensionCSSRules.borderWidth;
            parseParams.styles.cells.css.borderTopStyle = parseParams.styles.defaults.css.borderStyle;
            parseParams.styles.cells.css.borderTopColor = parseParams.styles.defaults.css.borderColor;
            break;
        case "clbrdrb":
            parseParams.styles.cells.dimensionCSSRules.borderBottomWidth =
                parseParams.styles.defaults.dimensionCSSRules.borderWidth;
            parseParams.styles.cells.css.borderBottomStyle = parseParams.styles.defaults.css.borderStyle;
            parseParams.styles.cells.css.borderBottomColor = parseParams.styles.defaults.css.borderColor;
            break;
        case "clbrdrl":
            parseParams.styles.cells.dimensionCSSRules.borderLeftWidth =
                parseParams.styles.defaults.dimensionCSSRules.borderWidth;
            parseParams.styles.cells.css.borderLeftStyle = parseParams.styles.defaults.css.borderStyle;
            parseParams.styles.cells.css.borderLeftColor = parseParams.styles.defaults.css.borderColor;
            break;
        case "clbrdrr":
            parseParams.styles.cells.dimensionCSSRules.borderRightWidth =
                parseParams.styles.defaults.dimensionCSSRules.borderWidth;
            parseParams.styles.cells.css.borderRightStyle = parseParams.styles.defaults.css.borderStyle;
            parseParams.styles.cells.css.borderRightColor = parseParams.styles.defaults.css.borderColor;
            break;
        case "trbrdrr":
            parseParams.styles.table.dimensionCSSRules.borderRightWidth =
                parseParams.styles.defaults.dimensionCSSRules.borderWidth;
            parseParams.styles.table.css.borderRightStyle = parseParams.styles.defaults.css.borderStyle;
            parseParams.styles.table.css.borderRightColor = parseParams.styles.defaults.css.borderColor;
            break;
        case "trbrdrl":
            parseParams.styles.table.dimensionCSSRules.borderLeftWidth =
                parseParams.styles.defaults.dimensionCSSRules.borderWidth;
            parseParams.styles.table.css.borderLeftStyle = parseParams.styles.defaults.css.borderStyle;
            parseParams.styles.table.css.borderLeftColor = parseParams.styles.defaults.css.borderColor;
            break;
        case "trbrdrb":
            parseParams.styles.table.dimensionCSSRules.borderBottomWidth =
                parseParams.styles.defaults.dimensionCSSRules.borderWidth;
            parseParams.styles.table.css.borderBottomStyle = parseParams.styles.defaults.css.borderStyle;
            parseParams.styles.table.css.borderBottomColor = parseParams.styles.defaults.css.borderColor;
            break;
        case "trbrdrt":
            parseParams.styles.table.dimensionCSSRules.borderTopWidth =
                parseParams.styles.defaults.dimensionCSSRules.borderWidth;
            parseParams.styles.table.css.borderTopStyle = parseParams.styles.defaults.css.borderStyle;
            parseParams.styles.table.css.borderTopColor = parseParams.styles.defaults.css.borderColor;
            break;
        default:
            parseParams.unParsedControlWords[controlWord] = true;
        }
    }

    return index;
};