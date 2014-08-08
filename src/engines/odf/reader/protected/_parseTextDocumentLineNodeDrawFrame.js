/**
 *
 * @param options
 * @return {Object}
 * @private
 */
ODF.prototype._parseTextDocumentParagraphNodeDrawFrame = function (options) {
    var data = {
            attributes: {},
            properties: {},
            options: {
                isImage: true
            },
            css: {},
            dimensionCSSRules: {}
        },
        size,
        i,
        children = $.children(options.node),
        len = children.length;

    if (options.node.attributes['svg:x'] && options.node.attributes['svg:x'].value) {
        size = this._getSize(options.node.attributes['svg:x'].value);

        if (size.unit) {
            data.dimensionCSSRules.left = size;
            data.css.position = "absolute";
        }
    }

    if (options.node.attributes['svg:y'] && options.node.attributes['svg:y'].value) {
        size = this._getSize(options.node.attributes['svg:y'].value);

        if (size.unit) {
            data.dimensionCSSRules.top = size;
            data.css.position = "absolute";
        }
    }

    if (options.node.attributes['svg:width'] && options.node.attributes['svg:width'].value) {
        size = this._getSize(options.node.attributes['svg:width'].value);

        if (size.unit) {
            data.dimensionCSSRules.width = size;
        }
    }

    if (options.node.attributes['svg:height'] && options.node.attributes['svg:height'].value) {
        size = this._getSize(options.node.attributes['svg:height'].value);

        if (size.unit) {
            data.dimensionCSSRules.height = size;
        }
    }

    if (options.node.attributes['draw:z-index'] && !isNaN(options.node.attributes['draw:z-index'].value)) {
        data.css.zIndex = +options.node.attributes['draw:z-index'].value;
    }

    if (options.node.attributes['draw:style-name'] && options.node.attributes['draw:style-name'].value) {
        data.properties.styleName = options.node.attributes['draw:style-name'].value;
    }

    for (i = 0; i < len; i++) {
        if (children[i].localName === "image") {
            if (
                children[i].attributes['xlink:href'] &&
                    options.documentData &&
                    options.documentData.media
            ) {
                data.attributes.src = options.documentData.media[children[i].attributes['xlink:href'].value];
            }
        }
    }

    return data;
};