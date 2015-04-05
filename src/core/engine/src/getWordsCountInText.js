/**
 *
 * @param text
 * @return {Number}
 * @private
 */
export default {
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