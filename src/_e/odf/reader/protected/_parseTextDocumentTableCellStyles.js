/**
 *
 * @param node
 * @return {Object}
 * @private
 */
ODF.prototype._parseTextDocumentTableCellStyles = function (node) {
    var nodes = $.children(node),
        length = nodes.length,
        j,
        result = {
            css: {},
            dimensionCssRules: {},
            options: {}
        },
        data;

    for (j = 0; j < length; j++) {
        if (nodes[j].localName === "table-cell-properties") {
            if (
                nodes[j].attributes['fo:padding'] &&
                    nodes[j].attributes['fo:padding'].value
            ) {
                data = this._getSize(nodes[j].attributes['fo:padding'].value);
                if (data.unit) {
                    result.dimensionCssRules.padding = data;
                }
            }
            if (
                nodes[j].attributes['fo:border'] &&
                    nodes[j].attributes['fo:border'].value
            ) {
                data = this._parseBorderStyle(nodes[j].attributes['fo:border'].value);
                result.css.borderStyle = data.style;
                result.dimensionCssRules.borderWidth = data.width;
                result.css.borderColor = data.color;
            }
            if (
                nodes[j].attributes['fo:border-left'] &&
                    nodes[j].attributes['fo:border-left'].value
            ) {
                data = this._parseBorderStyle(nodes[j].attributes['fo:border-left'].value);
                result.css.borderLeftStyle = data.style;
                result.dimensionCssRules.borderLeftWidth = data.width;
                result.css.borderLeftColor = data.color;
            }
            if (
                nodes[j].attributes['fo:border-right'] &&
                    nodes[j].attributes['fo:border-right'].value
            ) {
                data = this._parseBorderStyle(nodes[j].attributes['fo:border-right'].value);
                result.css.borderRightStyle = data.style;
                result.dimensionCssRules.borderRightWidth = data.width;
                result.css.borderRightColor = data.color;
            }
            if (
                nodes[j].attributes['fo:border-top'] &&
                    nodes[j].attributes['fo:border-top'].value
            ) {
                data = this._parseBorderStyle(nodes[j].attributes['fo:border-top'].value);
                result.css.borderTopStyle = data.style;
                result.dimensionCssRules.borderTopWidth = data.width;
                result.css.borderTopColor = data.color;
            }
            if (
                nodes[j].attributes['fo:border-bottom'] &&
                    nodes[j].attributes['fo:border-bottom'].value
            ) {
                data = this._parseBorderStyle(nodes[j].attributes['fo:border-bottom'].value);
                result.css.borderBottomStyle = data.style;
                result.dimensionCssRules.borderBottomWidth = data.width;
                result.css.borderBottomColor = data.color;
            }
        }
    }

    return result;
};