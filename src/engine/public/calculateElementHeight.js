/**
 *
 * @param options
 * @returns {number}
 * @private
 */
jDoc.Engine.prototype.calculateElementHeight = {
    value (options = {}) {
        var {fontSize, width} = options,
            lineHeight = options.lineHeight || 1,
            parentFontSize = options.parentFontSize || 1,
            len = options.el.textContent ? options.el.textContent.length : 0,
            height = (len * fontSize / width) * (fontSize > parentFontSize ? fontSize : parentFontSize) * lineHeight;

        return isNaN(height) ? 0 : Math.round(height);
    }
};