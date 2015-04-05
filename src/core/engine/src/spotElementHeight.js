/**
 *
 * @param options
 * @returns {number}
 * @private
 */
export default {
    value (options = {}) {
        var {lineHeight = 1, parentFontSize = 1, fontSize, width} = options,
            len = options.el.textContent ? options.el.textContent.length : 0,
            height = (len * fontSize / width) * (fontSize > parentFontSize ? fontSize : parentFontSize) * lineHeight;

        return isNaN(height) ? 0 : Math.round(height);
    }
};