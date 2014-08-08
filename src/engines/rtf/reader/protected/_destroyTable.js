/**
 *
 * @param parseParams
 * @returns {null}
 * @private
 */
RTF.prototype._destroyTable = function (parseParams) {
    parseParams.styles.cells = {
        css: {},
        dimensionCSSRules: {}
    };
    parseParams.styles.rows = {
        css: {},
        dimensionCSSRules: {}
    };
    parseParams.styles.table = {
        css: {},
        dimensionCSSRules: {}
    };
    parseParams.options.table = {};

    return null;
};