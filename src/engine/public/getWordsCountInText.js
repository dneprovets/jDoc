/**
 *
 * @param text
 * @return {Number}
 * @private
 */
jDoc.Engine.prototype.getWordsCountInText = {
    value (text) {
        var words = (text || "").split(/\s+/),
            i = words.length,
            wordsCount = 0;

        while (i--) {
            wordsCount += (words[i].length > 1);
        }

        return wordsCount;
    }
};