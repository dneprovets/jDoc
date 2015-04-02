/**
 *
 * @param params
 * @returns {*}
 * @private
 */
ODF.prototype._createPage = function (params) {
    var data = {
        options: {},
        css: {},
        dimensionCssRules: {},
        children: []
    };

    params = params || {};

    if (params.layout) {
        data = copy({}, data, params.layout.page);
    }

    return data;
};