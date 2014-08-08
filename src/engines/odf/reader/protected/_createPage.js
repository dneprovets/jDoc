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
        dimensionCSSRules: {},
        children: []
    };

    params = params || {};

    if (params.layout) {
        data = copy({}, data, params.layout.page);
    }

    return data;
};