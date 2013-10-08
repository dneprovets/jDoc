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
        currentRowIndex = 0,
        currentCellIndex = 0,
        count,
        table = parseParams.table,
        row = table ? table.body.rows[table.body.rows.length - 1] : null,
        page = parseResult.pages[parseParams.currentPageIndex],
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
        el = (parseParams.currentTextElement || parseParams.currentTextElementParent);

        switch (clearedControlWord) {
        case "page":
            table = null;
            parseResult.table = table;
            page = jDoc.clone(parseParams.pageData);
            parseParams.currentTextElementParent = jDoc.clone(parseParams.paragraphData);
            parseParams.currentTextElement = null;
            parseParams.currentPageIndex++;
            parseParams.currentElementIndex = 0;
            parseResult.pages[parseParams.currentPageIndex] = page;
            page.elements[parseParams.currentElementIndex] = parseParams.currentTextElementParent;
            break;
        case "par":
            parseParams.currentElementIndex++;
            /**
             * inherit previous paragraph
             * @type {*}
             */
            parseParams.currentTextElementParent = jDoc.deepMerge({}, (
                (
                    parseParams.currentTextElementParent && parseParams.currentTextElementParent.options.isParagraph
                ) ? parseParams.currentTextElementParent : parseParams.paragraphData
            ), {
                elements: []
            });
            page.elements[parseParams.currentElementIndex] = parseParams.currentTextElementParent;
            parseParams.currentTextElement = null;
            break;
        case "row":
            row = row || this._initRow();
            table = this._checkTable({
                table: table,
                row: row,
                tableContainer: parseParams,
                parentElementsList: page.elements,
                parentElementsIndex: parseParams.currentElementIndex,
                data: parseParams.currentTextElementParent
            });

            row = this._initRow();
            table.body.rows.push(row);
            break;
        case "cellx":
            row = row || this._initRow();

            table = this._checkTable({
                table: table,
                row: row,
                tableContainer: parseParams,
                parentElementsList: page.elements,
                parentElementsIndex: parseParams.currentElementIndex,
                data: parseParams.currentTextElementParent
            });

            count = table.body.rows.length;
            currentRowIndex = count ? count - 1 : 0;

            table.options.cellsWidth[currentRowIndex] = table.options.cellsWidth[currentRowIndex] || [];
            table.options.cellsWidth[currentRowIndex].push({
                value: param / 20,
                units: "pt"
            });
            break;
        case "cell":
            row = row || this._initRow();
            table = this._checkTable({
                table: table,
                row: row,
                tableContainer: parseParams,
                parentElementsList: page.elements,
                parentElementsIndex: parseParams.currentElementIndex,
                data: parseParams.currentTextElementParent
            });

            row.cells.push(parseParams.currentTextElementParent);

            count = table.body.rows.length;
            currentRowIndex = count ? count - 1 : 0;
            count = row.cells.length;
            currentCellIndex = count ? count - 1 : 0;

            if (
                table.options.cellsWidth[currentRowIndex] &&
                    table.options.cellsWidth[currentRowIndex][currentCellIndex]
            ) {
                parseParams.currentTextElementParent.dimensionCSSRules.width =
                    parseParams.currentTextElementParent.dimensionCSSRules.width ||
                        table.options.cellsWidth[currentRowIndex][currentCellIndex];
            }
            parseParams.currentTextElementParent = {
                options: {},
                css: {},
                dimensionCSSRules: {},
                elements: []
            };
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
            parseParams.currentTextElementParent.css.textAlign = "justify";
            break;
        case "qr":
            parseParams.currentTextElementParent.css.textAlign = "right";
            break;
        case "ql":
            parseParams.currentTextElementParent.css.textAlign = "left";
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
                parseParams.currentTextElementParent.dimensionCSSRules.paddingLeft = {
                    value: param / 20,
                    units: "pt"
                };
            }
            break;
        case "fi":
            if (param > 0) {
                parseParams.currentTextElementParent.dimensionCSSRules.textIndent = {
                    value: param / 20,
                    units: "pt"
                };
            }
            break;
        case "sa":
            if (param > 0) {
                parseParams.currentTextElementParent.dimensionCSSRules.marginBottom = {
                    value: param / 20,
                    units: "pt"
                };
            }
            break;
        case "sb":
            if (param > 0) {
                parseParams.currentTextElementParent.dimensionCSSRules.marginTop = {
                    value: param / 20,
                    units: "pt"
                };
            }
            break;
        case "plain":
            this._resetFontProperties(el);
            break;
        case "pard":
            if (parseResult.table) {
                table = null;
                parseResult.table = table;
                parseParams.currentElementIndex++;
                parseParams.currentTextElementParent = jDoc.clone(parseParams.paragraphData);
                page.elements[parseParams.currentElementIndex] = parseParams.currentTextElementParent;
                parseParams.currentTextElement = null;
            }
            this._resetParagraphProperties(parseParams.currentTextElementParent);
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