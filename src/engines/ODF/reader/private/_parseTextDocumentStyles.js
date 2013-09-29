/**
 *
 * @param xml
 * @param callback
 * @returns {*}
 * @private
 */
jDoc.Engines.ODF.prototype._parseTextDocumentStyles = function (xml, callback) {
    var result = {
            automatic: {
                layouts: {}
            },
            pageLayout: "",
            defaults: {}
        },
        i,
        len,
        stylesNode,
        nodes,
        firstPageLayout = "";

    stylesNode = xml.querySelector('master-styles');
    nodes = jDoc.DOM.children(stylesNode);
    len = nodes.length;

    for (i = len - 1; i >= 0; i--) {
        if (nodes[i].localName === "master-page") {
            if (nodes[i].attributes['style:page-layout-name'] && nodes[i].attributes['style:page-layout-name'].value) {
                result.pageLayout = nodes[i].attributes['style:page-layout-name'].value;
            }
        }
    }

    stylesNode = xml.querySelector('automatic-styles');
    nodes = jDoc.DOM.children(stylesNode);
    len = nodes.length;

    for (i = len - 1; i >= 0; i--) {
        if (nodes[i].localName === "page-layout") {
            if (nodes[i].attributes['style:name'] && nodes[i].attributes['style:name'].value) {
                result.automatic.layouts[nodes[i].attributes['style:name'].value] =
                    this._parsePageLayoutStyles(nodes[i]);

                if (!firstPageLayout) {
                    firstPageLayout = nodes[i].attributes['style:name'].value;
                }
            }
        }
    }

    if (!result.automatic.layouts[result.pageLayout] && firstPageLayout) {
        result.pageLayout = firstPageLayout;
    }

    stylesNode = xml.querySelector('styles');
    this._parseTextDocumentStylesNode(stylesNode, function (styles) {
        result.defaults = styles;
        callback(result);
    });
};