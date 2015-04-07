/** @lends ODF.prototype
 *
 * @param node
 * @return {Object}
 * @private
 */
ODF.prototype._parseTextDocumentParagraphStyles = function (node) {
    var nodes = $.children(node),
        length = nodes.length,
        j,
        result = {
            paragraph: {
                css: {},
                dimensionCssRules: {},
                options: {}
            },
            paragraphContent: {
                css: {},
                dimensionCssRules: {},
                options: {}
            }
        },
        align,
        localName,
        size = {};

    for (j = 0; j < length; j++) {
        localName = nodes[j].localName;

        if (localName === "paragraph-properties") {
            if (nodes[j].attributes['fo:background-color'] && nodes[j].attributes['fo:background-color'].value) {
                result.paragraph.css.backgroundColor =
                    this.normalizeColorValue(nodes[j].attributes['fo:background-color'].value);
            }
            if (nodes[j].attributes['style:writing-mode'] && nodes[j].attributes['style:writing-mode'].value) {
                result.paragraph.css.direction =
                    (/rl/ig).test(nodes[j].attributes['style:writing-mode'].value) ? "rtl" : "ltr";
            }
            if (nodes[j].attributes['fo:text-align'] && nodes[j].attributes['fo:text-align'].value) {
                align = (/center|left|right/i).exec(nodes[j].attributes['fo:text-align'].value);

                if (align && align[0]) {
                    result.paragraph.css.textAlign = align[0];
                }
            }
            if (nodes[j].attributes['fo:margin'] && nodes[j].attributes['fo:margin'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin'].value);

                if (size.unit) {
                    result.paragraph.dimensionCssRules.margin = size;
                }
            }
            if (nodes[j].attributes['fo:margin-top'] && nodes[j].attributes['fo:margin-top'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-top'].value);

                if (size.unit) {
                    result.paragraph.dimensionCssRules.marginTop = size;
                }
            }
            if (nodes[j].attributes['fo:margin-bottom'] && nodes[j].attributes['fo:margin-bottom'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-bottom'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.marginBottom = size;
                }
            }
            if (nodes[j].attributes['fo:margin-left'] && nodes[j].attributes['fo:margin-left'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-left'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.marginLeft = size;
                }
            }
            if (nodes[j].attributes['fo:margin-right'] && nodes[j].attributes['fo:margin-right'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-right'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.marginLeft = size;
                }
            }
            if (nodes[j].attributes['fo:margin'] && nodes[j].attributes['fo:margin'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.margin = size;
                }
            }
            if (nodes[j].attributes['fo:margin-top'] && nodes[j].attributes['fo:margin-top'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-top'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.marginTop = size;
                }
            }
            if (nodes[j].attributes['fo:margin-bottom'] && nodes[j].attributes['fo:margin-bottom'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-bottom'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.marginBottom = size;
                }
            }
            if (nodes[j].attributes['fo:margin-left'] && nodes[j].attributes['fo:margin-left'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-left'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.marginLeft = size;
                }
            }
            if (nodes[j].attributes['fo:margin-right'] && nodes[j].attributes['fo:margin-right'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-right'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.marginRight = size;
                }
            }
            if (nodes[j].attributes['fo:padding'] && nodes[j].attributes['fo:padding'].value) {
                size = this._getSize(nodes[j].attributes['fo:padding'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.padding = size;
                }
            }
            if (nodes[j].attributes['fo:padding-top'] && nodes[j].attributes['fo:padding-top'].value) {
                size = this._getSize(nodes[j].attributes['fo:padding-top'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.paddingTop = size;
                }
            }
            if (nodes[j].attributes['fo:padding-bottom'] && nodes[j].attributes['fo:padding-bottom'].value) {
                size = this._getSize(nodes[j].attributes['fo:padding-bottom'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.paddingBottom = size;
                }
            }
            if (nodes[j].attributes['fo:padding-left'] && nodes[j].attributes['fo:padding-left'].value) {
                size = this._getSize(nodes[j].attributes['fo:padding-left'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.paddingLeft = size;
                }
            }
            if (nodes[j].attributes['fo:padding-right'] && nodes[j].attributes['fo:padding-right'].value) {
                size = this._getSize(nodes[j].attributes['fo:padding-right'].value);
                if (size.unit) {
                    result.paragraph.dimensionCssRules.paddingRight = size;
                }
            }
        } else if (localName === "text-properties") {
            if (nodes[j].attributes['fo:color'] && nodes[j].attributes['fo:color'].value) {
                result.paragraphContent.css.color =
                    this.normalizeColorValue(nodes[j].attributes['fo:color'].value);
            }
            if (nodes[j].attributes['fo:font-style'] && nodes[j].attributes['fo:font-style'].value) {
                result.paragraphContent.css.fontStyle =
                    (/italic/ig).test(nodes[j].attributes['fo:font-style'].value) ? "italic" : "normal";
            }
            if (nodes[j].attributes['fo:font-weight'] && nodes[j].attributes['fo:font-weight'].value) {
                result.paragraphContent.css.fontWeight =
                    (/bold/ig).test(nodes[j].attributes['fo:font-weight'].value) ? "bold" : "normal";
            }
            if (
                nodes[j].attributes['style:text-underline-style'] &&
                    nodes[j].attributes['style:text-underline-style'].value
            ) {
                result.paragraphContent.css.textDecoration =
                    (/none/ig).test(nodes[j].attributes['style:text-underline-style'].value) ? "none" : "underline";
            }
            if (nodes[j].attributes['style:font-name'] && nodes[j].attributes['style:font-name'].value) {
                result.paragraphContent.css.fontFamily = nodes[j].attributes['style:font-name'].value;
            }
            if (nodes[j].attributes['fo:font-size'] && nodes[j].attributes['fo:font-size'].value) {
                size = this._getSize(nodes[j].attributes['fo:font-size'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.fontSize = size;
                }
            }
            if (nodes[j].attributes['fo:margin'] && nodes[j].attributes['fo:margin'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.margin = size;
                }
            }
            if (nodes[j].attributes['fo:margin-top'] && nodes[j].attributes['fo:margin-top'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-top'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.marginTop = size;
                }
            }
            if (nodes[j].attributes['fo:margin-bottom'] && nodes[j].attributes['fo:margin-bottom'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-bottom'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.marginBottom = size;
                }
            }
            if (nodes[j].attributes['fo:margin-left'] && nodes[j].attributes['fo:margin-left'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-left'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.marginLeft = size;
                }
            }
            if (nodes[j].attributes['fo:margin-right'] && nodes[j].attributes['fo:margin-right'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-right'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.marginLeft = size;
                }
            }
            if (nodes[j].attributes['fo:margin'] && nodes[j].attributes['fo:margin'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.margin = size;
                }
            }
            if (nodes[j].attributes['fo:margin-top'] && nodes[j].attributes['fo:margin-top'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-top'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.marginTop = size;
                }
            }
            if (nodes[j].attributes['fo:margin-bottom'] && nodes[j].attributes['fo:margin-bottom'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-bottom'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.marginBottom = size;
                }
            }
            if (nodes[j].attributes['fo:margin-left'] && nodes[j].attributes['fo:margin-left'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-left'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.marginLeft = size;
                }
            }
            if (nodes[j].attributes['fo:margin-right'] && nodes[j].attributes['fo:margin-right'].value) {
                size = this._getSize(nodes[j].attributes['fo:margin-right'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.marginRight = size;
                }
            }
            if (nodes[j].attributes['fo:padding'] && nodes[j].attributes['fo:padding'].value) {
                size = this._getSize(nodes[j].attributes['fo:padding'].value);

                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.padding = size;
                }
            }
            if (nodes[j].attributes['fo:padding-top'] && nodes[j].attributes['fo:padding-top'].value) {
                size = this._getSize(nodes[j].attributes['fo:padding-top'].value);

                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.paddingTop = size;
                }
            }
            if (nodes[j].attributes['fo:padding-bottom'] && nodes[j].attributes['fo:padding-bottom'].value) {
                size = this._getSize(nodes[j].attributes['fo:padding-bottom'].value);
                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.paddingBottom = size;
                }
            }
            if (nodes[j].attributes['fo:padding-left'] && nodes[j].attributes['fo:padding-left'].value) {
                size = this._getSize(nodes[j].attributes['fo:padding-left'].value);

                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.paddingLeft = size;
                }
            }
            if (nodes[j].attributes['fo:padding-right'] && nodes[j].attributes['fo:padding-right'].value) {
                size = this._getSize(nodes[j].attributes['fo:padding-right'].value);

                if (size.unit) {
                    result.paragraphContent.dimensionCssRules.paddingRight = size;
                }
            }
            if (nodes[j].attributes['fo:language'] && nodes[j].attributes['fo:language'].value) {
                result.paragraphContent.options.language = nodes[j].attributes['fo:language'].value;
            }
        }
    }

    return result;
};