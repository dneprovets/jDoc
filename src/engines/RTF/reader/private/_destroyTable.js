/**
 *
 * @param parseParams
 * @returns {null}
 * @private
 */
jDoc.engines.RTF.prototype._destroyTable = function (parseParams) {
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