/**
 *
 * @param parseParams
 * @returns {null}
 * @private
 */
RTF.prototype._destroyTable = {
    value (parseParams) {
        parseParams.styles.cells = {
            css: {},
            dimensionCssRules: {}
        };
        parseParams.styles.rows = {
            css: {},
            dimensionCssRules: {}
        };
        parseParams.styles.table = {
            css: {},
            dimensionCssRules: {}
        };
        parseParams.options.table = {};

        return null;
    }
};