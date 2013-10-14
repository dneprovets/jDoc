/**
 *
 * @param params
 * @returns {{options: {}, css: {}, dimensionCSSRules: {}, elements: Array}}
 * @private
 */
jDoc.engines.ODF.prototype._createPage = function (params) {
    var data = {
        options: {},
        css: {},
        dimensionCSSRules: {},
        elements: []
    };

    params = params || {};

    if (params.layout) {
        data = jDoc.deepMerge({}, data, params.layout.page);
    }

    return data;
};