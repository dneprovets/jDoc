/**
 *
 * @param text
 * @return {Number}
 * @private
 */
jDoc.Engine.prototype._getWordsCountInText = function (text) {
    var words = (text || "").split(/\s+/),
        len = words.length,
        i,
        wordsCount = 0;

    for (i = len - 1; i >= 0; i--) {
        wordsCount += (words[i].length > 1);
    }

    return wordsCount;
};