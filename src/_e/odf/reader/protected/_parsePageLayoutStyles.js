/**
 *
 * @param node
 * @return {Object}
 * @private
 */
ODF.prototype._parsePageLayoutStyles = function (node) {
    var floatProp = 'float',
        result = {
            page: {
                css: {},
                dimensionCssRules: {},
                options: {
                    isLandscapeOrientation: false
                }
            },
            footnote: {
                css: {},
                dimensionCssRules: {},
                options: {}
            },
            footer: {
                css: {},
                dimensionCssRules: {},
                options: {}
            },
            header: {
                css: {},
                dimensionCssRules: {},
                options: {}
            }
        },
        i,
        nodes = $.children(node),
        length = nodes.length,
        size = {},
        childNodes,
        len,
        j;

    for (i = 0; i < length; i++) {
        if (nodes[i].localName === "page-layout-properties") {

            if (nodes[i].attributes['fo:page-width'] && nodes[i].attributes['fo:page-width'].value) {
                size = this._getSize(nodes[i].attributes['fo:page-width'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.width = size;
                }
            }
            if (nodes[i].attributes['fo:page-height'] && nodes[i].attributes['fo:page-height'].value) {
                size = this._getSize(nodes[i].attributes['fo:page-height'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.height = size;
                }
            }
            if (nodes[i].attributes['fo:margin'] && nodes[i].attributes['fo:margin'].value) {
                size = this._getSize(nodes[i].attributes['fo:margin'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.padding = size;
                }
            }
            if (nodes[i].attributes['fo:margin-top'] && nodes[i].attributes['fo:margin-top'].value) {
                size = this._getSize(nodes[i].attributes['fo:margin-top'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.paddingTop = size;
                }
            }
            if (nodes[i].attributes['fo:margin-left'] && nodes[i].attributes['fo:margin-left'].value) {
                size = this._getSize(nodes[i].attributes['fo:margin-left'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.paddingLeft = size;
                }
            }
            if (nodes[i].attributes['fo:margin-right'] && nodes[i].attributes['fo:margin-right'].value) {
                size = this._getSize(nodes[i].attributes['fo:margin-right'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.paddingRight = size;
                }
            }
            if (nodes[i].attributes['fo:margin-bottom'] && nodes[i].attributes['fo:margin-bottom'].value) {
                size = this._getSize(nodes[i].attributes['fo:margin-bottom'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.paddingBottom = size;
                }
            }
            if (nodes[i].attributes['fo:padding'] && nodes[i].attributes['fo:padding'].value) {
                size = this._getSize(nodes[i].attributes['fo:padding'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.padding = size;
                }
            }
            if (nodes[i].attributes['fo:padding-top'] && nodes[i].attributes['fo:padding-top'].value) {
                size = this._getSize(nodes[i].attributes['fo:padding-top'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.paddingTop = size;
                }
            }
            if (nodes[i].attributes['fo:padding-left'] && nodes[i].attributes['fo:padding-left'].value) {
                size = this._getSize(nodes[i].attributes['fo:padding-left'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.paddingLeft = size;
                }
            }
            if (nodes[i].attributes['fo:padding-right'] && nodes[i].attributes['fo:padding-right'].value) {
                size = this._getSize(nodes[i].attributes['fo:padding-right'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.paddingRight = size;
                }
            }
            if (nodes[i].attributes['fo:padding-bottom'] && nodes[i].attributes['fo:padding-bottom'].value) {
                size = this._getSize(nodes[i].attributes['fo:padding-bottom'].value);
                if (size.unit) {
                    result.page.dimensionCssRules.paddingBottom = size;
                }
            }
            if (
                nodes[i].attributes['style:footnote-max-height'] &&
                    nodes[i].attributes['style:footnote-max-height'].value
            ) {
                size = this._getSize(nodes[i].attributes['style:footnote-max-height'].value);
                if (size.unit) {
                    result.footnote.dimensionCssRules.maxHeight = size;
                }
            }
            if (nodes[i].attributes['style:num-format'] && nodes[i].attributes['style:num-format'].value) {
                result.page.options.numberingFormat = nodes[i].attributes['style:num-format'].value;
            }
            if (nodes[i].attributes['style:print-orientation'] && nodes[i].attributes['style:print-orientation'].value) {
                result.page.options.isLandscapeOrientation =
                    nodes[i].attributes['style:print-orientation'].value == 'landscape';
            }
            if (nodes[i].attributes['style:writing-mode'] && nodes[i].attributes['style:writing-mode'].value) {
                result.page.css.direction =
                    (/rl/ig).test(nodes[i].attributes['style:writing-mode'].value) ? "rtl" : "ltr";
            }


            childNodes = $.children(nodes[i]);
            len = childNodes.length;

            for (j = 0; len < childNodes; j++) {
                switch (childNodes[j].localName) {
                case "footnote-sep":
                    if (childNodes[j].attributes['style:width'] && childNodes[j].attributes['style:width'].value) {
                        size = this._getSize(childNodes[j].attributes['style:width'].value);
                        if (size.unit) {
                            result.footnote.dimensionCssRules.width = size;
                        }
                    }
                    if (
                        childNodes[j].attributes['style:distance-before-sep'] &&
                            childNodes[j].attributes['style:distance-before-sep'].value
                    ) {
                        size = this._getSize(childNodes[j].attributes['style:distance-before-sep'].value);
                        if (size.unit) {
                            result.footnote.dimensionCssRules.marginTop = size;
                        }
                    }
                    if (
                        childNodes[j].attributes['style:distance-after-sep'] &&
                            childNodes[j].attributes['style:distance-after-sep'].value
                    ) {
                        size = this._getSize(childNodes[j].attributes['style:distance-after-sep'].value);
                        if (size.unit) {
                            result.footnote.dimensionCssRules.marginBottom = size;
                        }
                    }
                    if (
                        childNodes[j].attributes['style:adjustment'] &&
                            childNodes[j].attributes['style:adjustment'].value
                    ) {
                        result.footnote.css[floatProp] = "none";

                        if (childNodes[j].attributes['style:adjustment'].value == "left") {
                            result.footnote.css[floatProp] = "left";
                        } else if (childNodes[j].attributes['style:adjustment'].value == "right") {
                            result.footnote.css[floatProp] = "right";
                        }
                    }
                    if (
                        childNodes[j].attributes['style:color'] &&
                            childNodes[j].attributes['style:color'].value
                    ) {
                        result.footnote.css.color =
                            this.normalizeColorValue(childNodes[j].attributes['style:color'].value);
                    }
                    break;
                }
            }
        }
    }

    return result;
};