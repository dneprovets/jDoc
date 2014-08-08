/**
 * @description Reset font properties to default
 * @param el
 * @private
 */
RTF.prototype._resetFontProperties = function (el) {
    el.css.fontStyle = "none";
    el.css.fontVariant = "none";
    el.css.textDecoration = "none";
    el.css.fontWeight = "normal";
    el.dimensionCSSRules.fontSize = {
        value: 12,
        unit: "pt"
    };

    return el;
};