/**
 *
 * @param options
 * @returns {number}
 * @private
 */
jDoc.Engine.prototype._spotElementHeight = function (options) {
    options = options || {};

    var lineHeight = options.lineHeight || 1,
        parentFontSize = options.parentFontSize || 1,
        len = options.el.textContent ? options.el.textContent.length : 0,
        height = (
            (len * options.fontSize) / options.width
        ) * (
            (
                options.fontSize > parentFontSize ? options.fontSize : parentFontSize
            ) * lineHeight
        );

    return isNaN(height) ? 0 : Math.round(height);
};