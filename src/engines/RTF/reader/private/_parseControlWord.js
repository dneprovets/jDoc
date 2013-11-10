/**
 *
 * @param text {String}
 * @param index {Number}
 * @param parseParams {*}
 * @param parseResult {*}
 * @returns {Number}
 * @private
 */
jDoc.engines.RTF.prototype._parseControlWord = function (text, index, parseParams, parseResult) {
    var match,
        matchedPart,
        clearedControlWord,
        controlWordParseResult,
        param,
        paramText = "",
        controlWord = "",
        controlWordParserData = "";

    while (text[index] !== '\\' && text[index] !== '{' && text[index] !== '}') {
        if (text[index] === ' ' && !parseParams.hexWordsMask.test(controlWord)) {
            break;
        }

        if (text[index] !== '\r' && text[index] !== '\n') {
            if (text[index] === '*') {
                parseParams.ignoreGroups.push(parseParams.braceCounter);
            } else {
                controlWord += text[index];
            }
        } else if (controlWord[0]) {
            break;
        }

        index += 1;
    }
    index += text[index] === ' ' ? 1 : 0;

    if (controlWord[0] === "'") {
        /**
         * @type {Array|null}
         */
        matchedPart = controlWord.match(/[a-z0-9]+/gi);

        if (matchedPart) {
            param = matchedPart[0];

            matchedPart = controlWord.match(/[^a-z0-9]+$/gi);
            paramText = matchedPart ? matchedPart[0] : "";
            controlWord = "'";
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
        if (this._controlWordsParsers[clearedControlWord]) {
            controlWordParserData = {
                clearedControlWord: clearedControlWord,
                controlWord: controlWord,
                parseResult: parseResult,
                parseParams: parseParams,
                paramText: paramText,
                param: param
            };
            controlWordParseResult = this._controlWordsParsers[clearedControlWord].call(this, controlWordParserData);
            parseResult = controlWordParseResult.parseResult;
            parseParams = controlWordParseResult.parseParams;
            controlWordParserData = null;
            controlWordParseResult = null;
        } else {
            parseParams.unParsedControlWords[controlWord] = true;
        }
    }

    return index;
};