ODF.prototype._parseTextDocumentListStyles = function (xml) {
    var result = {
            list: {
                css: {},
                dimensionCSSRules: {}
            }
        },
        i,
        nodes = $.children(xml),
        len = nodes.length;

    for (i = 0; i < len; i++) {
        if (nodes[i].localName == "list-level-style-number") {
            if (nodes[i].attributes['style:num-format'] && nodes[i].attributes['style:num-format'].value) {
                result.list.css.listStyleType = this._getListStyleType(nodes[i].attributes['style:num-format'].value);
            }
        }
    }

    return result;
};