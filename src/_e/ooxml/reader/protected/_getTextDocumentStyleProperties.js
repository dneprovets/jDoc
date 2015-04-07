/**
 *
 * @param params
 * @return {Object}
 * @private
 */
OOXML.prototype._getTextDocumentStyleProperties = function (params) {
    var result = {
        options: {
            classList: []
        },
        css: {},
        dimensionCssRules: {}
    },
        headingInfo,
        numIdNode,
        preferencedStyle,
        levelNode,
        horizontalBorder,
        verticalBorder,
        cellBorderBottom,
        cellBorderRight,
        children = $.children(params.node),
        textShadow = "0 0 1px 0 rgba(0,0,0,0.5)",
        i = children.length;

    while (i--) {
        switch (children[i].localName) {
        case "pStyle":
            if (
                children[i].attributes['w:val'] && children[i].attributes['w:val'].value
            ) {
                if (
                    params.documentData &&
                        params.documentData.styles.preferencedStyles[children[i].attributes['w:val'].value]
                ) {
                    preferencedStyle = this._getCssRulesFromPreferencedStyle(
                        params.documentData.styles.preferencedStyles[children[i].attributes['w:val'].value]
                    );

                    copy(result, preferencedStyle.elementCssRules);

                    result.options.childrenCssRules = copy(
                        result.options.childrenCssRules, preferencedStyle.childrenCssRules
                    );

                    headingInfo = (/Heading\s*([0-9]+)/i).exec(
                        params.documentData.styles.preferencedStyles[children[i].attributes['w:val'].value].name
                    );

                    if (headingInfo) {
                        result.options.classList.push(children[i].attributes['w:val'].value);
                        result.options.heading = {
                            level: isNaN(headingInfo[1]) ? 0 : +headingInfo[1]
                        };
                    } else if (
                        (/List\s*Paragraph/i).test(
                            params.documentData.styles.preferencedStyles[children[i].attributes['w:val'].value].name
                        )
                    ) {
                        result.options.isListItem = true;
                    }
                }
            }
            break;
        case "jc":
            if (children[i].attributes['w:val'] && children[i].attributes['w:val'].value) {
                if (children[i].attributes['w:val'].value == 'both') {
                    result.css.textAlign = 'justify';
                } else if (children[i].attributes['w:val'].value == 'center') {
                    result.css.textAlign = 'center';
                } else if (children[i].attributes['w:val'].value == 'left') {
                    result.css.textAlign = 'left';
                } else if (children[i].attributes['w:val'].value == 'right') {
                    result.css.textAlign = 'right';
                }
            }
            break;
        case "ind":
            if (children[i].attributes['w:left'] && !isNaN(children[i].attributes['w:left'].value)) {
                result.dimensionCssRules.paddingLeft = {
                    unit: "pt",
                    value: children[i].attributes['w:left'].value / 20
                };
            }
            if (children[i].attributes['w:right'] && !isNaN(children[i].attributes['w:right'].value)) {
                result.dimensionCssRules.paddingRight = {
                    unit: "pt",
                    value: children[i].attributes['w:right'].value / 20
                };
            }
            if (children[i].attributes['w:firstLine'] && !isNaN(children[i].attributes['w:firstLine'].value)) {
                result.dimensionCssRules.textIndent = {
                    unit: "pt",
                    value: children[i].attributes['w:firstLine'].value / 20
                };
            }
            break;
        case "b":
            result.css.fontWeight = (
                children[i].attributes['w:val'] && !this.attributeToBoolean(children[i].attributes['w:val'])
            ) ? "normal" : 'bold';
            break;
        case "bCs":
            if (
                children[i].attributes['w:val'] && !this.attributeToBoolean(children[i].attributes['w:val'])
            ) {
                result.options.complexFontWeight = 'bold';
            }
            break;
        case "shadow":
            result.css.textShadow =
                this.attributeToBoolean(children[i].attributes['w:val']) ? textShadow : "none";
            break;
        case "cs":
            result.options.useComplexScript = this.attributeToBoolean(children[i].attributes['w:val']);
            break;
        case "outline":
            result.options.outline = this.attributeToBoolean(children[i].attributes['w:val']);
            break;
        case "rtl":
            result.css.direction = this.attributeToBoolean(children[i].attributes['w:val']) ? "rtl" : "ltr";
            break;
        case "strike":
            result.options.strike = this.attributeToBoolean(children[i].attributes['w:val']);
            break;
        case "dstrike":
            result.options.doubleStrike = this.attributeToBoolean(children[i].attributes['w:val']);
            break;
        case "vanish":
            if (this.attributeToBoolean(children[i].attributes['w:val'])) {
                result.css.visibility = "hidden";
            }
            break;
        case "specVanish":
            if (this.attributeToBoolean(children[i].attributes['w:val'])) {
                result.css.visibility = "hidden";
            }
            break;
        case "i":
            result.css.fontStyle = (
                children[i].attributes['w:val'] && !this.attributeToBoolean(children[i].attributes['w:val'])
            ) ? "normal" : 'italic';
            break;
        case "iCs":
            if (
                children[i].attributes['w:val'] && !this.attributeToBoolean(children[i].attributes['w:val'])
            ) {
                result.options.complexFontStyle = 'italic';
            }
            break;
        case "color":
            if (children[i].attributes['w:val'] && children[i].attributes['w:val'].value) {
                result.css.color = this.normalizeColorValue(children[i].attributes['w:val'].value);
            }
            break;
        case "sz":
            if (children[i] && children[i].attributes['w:val'] && !isNaN(children[i].attributes['w:val'].value)) {
                result.dimensionCssRules.fontSize = {
                    unit: "pt",
                    value: children[i].attributes['w:val'].value / 2
                };
            }
            break;
        case "szCs":
            if (
                !result.dimensionCssRules.fontSize && children[i] && children[i].attributes['w:val'] && !isNaN(children[i].attributes['w:val'].value)
            ) {
                result.dimensionCssRules.fontSize = {
                    value: children[i].attributes['w:val'].value / 2,
                    unit: "pt"
                };
            }
            break;
        case "rFonts":
            if (children[i].attributes['w:ascii']) {
                result.css.fontFamily = children[i].attributes['w:ascii'].value || "";
            } else if (children[i].attributes['w:cs']) {
                result.css.fontFamily = children[i].attributes['w:cs'].value || "";
            } else if (children[i].attributes['w:asciiTheme']) {
                if ((/major/ig).test(children[i].attributes['w:asciiTheme'].value)) {
                    result.options.majorFontFamily = true;
                } else if ((/minor/ig).test(children[i].attributes['w:asciiTheme'].value)) {
                    result.options.minorFontFamily = true;
                }
            }
            break;
        case "u":
            if (children[i].attributes['w:val'] && children[i].attributes['w:val'].value) {
                result.css.textDecoration = (
                    children[i].attributes['w:val'].value != "none"
                    ) ? "underline" : result.css.textDecoration;
            }
            break;
        case "vertAlign":
            if (children[i].attributes['w:val']) {
                result.css.verticalAlign = this._normalizeVerticalAlign(children[i].attributes['w:val']);
            }
            break;
        case "oMath":
            result.options.math = (this.attributeToBoolean(children[i].attributes['w:val']));
            break;
        case "imprint":
            result.options.imprinting = (this.attributeToBoolean(children[i].attributes['w:val']));
            break;
        case "snapToGrid":
            result.options.useDocumentGrid = (this.attributeToBoolean(children[i].attributes['w:val']));
            break;
        case "webHidden":
            result.options.webHiddenText = (this.attributeToBoolean(children[i].attributes['w:val']));
            break;
        case "emboss":
            result.options.embossing = (this.attributeToBoolean(children[i].attributes['w:val']));
            break;
        case "smallCaps":
            result.options.smallCaps = (this.attributeToBoolean(children[i].attributes['w:val']));
            break;
        case "noProof":
            result.options.checkSpellingGrammar = !(this.attributeToBoolean(children[i].attributes['w:val']));
            break;
        case "fitText":
            result.options.fitText.id = (
                children[i] && children[i].attributes['w:id']
                ) ? children[i].attributes['w:id'].value : null;
            result.options.fitText.width = (
                children[i] && !isNaN(children[i].attributes['w:val'])
            ) ? {
                value: children[i].attributes['w:id'].value / 20,
                unit: "pt"
            } : null;
            break;
        case "shd":
            if (children[i].attributes['w:val']) {
                result.css.boxShadow = this._parseShadowProperty(children[i]);
            }
            break;
        case "effect":
            result.options.effect = this._parseStyleEffectProperty(children[i]);
            break;
        case "eastAsianLayout":
            result.options.eastAsianSettings = {
                id: (
                    children[i].attributes['w:id']
                    ) ? children[i].attributes['w:id'].value : null,
                combines: (
                    this.attributeToBoolean((!!children[i].attributes['w:combine']))
                    ),
                isVertical: (!!children[i] &&
                    this.attributeToBoolean((!!children[i].attributes['w:vert']))),
                verticalCompress: (!!children[i] &&
                    this.attributeToBoolean((!!children[i].attributes['w:vertCompress']))),
                combineBrackets: (!!children[i] &&
                    this._parseBrackets(children[i].attributes['w:combineBrackets']))
            };
            break;
        case "position":
            if (
                children[i].attributes['w:val'] && !isNaN(children[i].attributes['w:val'].value)
            ) {
                result.options.position = {
                    value: children[i].attributes['w:val'].value / 2,
                    unit: "pt"
                };
            }
            break;
        case "spacing":
            if (children[i].attributes['w:line'] && !isNaN(children[i].attributes['w:line'].value)) {
                result.css.lineHeight = this._getLineHeight(children[i].attributes['w:line'].value);

                /**
                 * @description Fix for empty container
                 * @type {String}
                 */
                result.dimensionCssRules.minHeight = {
                    value: children[i].attributes['w:line'].value / 20,
                    unit: "pt"
                };
            }
            if (children[i].attributes['w:before'] && !isNaN(children[i].attributes['w:before'].value)) {
                result.dimensionCssRules.marginTop = {
                    value: children[i].attributes['w:before'].value / 20,
                    unit: "pt"
                };
            }
            if (children[i].attributes['w:after'] && !isNaN(children[i].attributes['w:after'].value)) {
                result.dimensionCssRules.marginBottom = {
                    value: children[i].attributes['w:after'].value / 20,
                    unit: "pt"
                };
            }
            break;
        case "kern":
            if (children[i] && !isNaN(children[i].attributes['w:val'])) {
                result.dimensionCssRules.letterSpacing = {
                    value: children[i].attributes['w:val'].value / 20,
                    unit: "pt"
                };
            }
            break;
        case "rStyle":
            if (children[i].attributes['w:val']) {
                copy(result, this._parseTextDocumentReferenceStyle(children[i].attributes['w:val'].value));
            }
            break;
        case "w":
            result.options.textScale = (
                !!children[i].attributes['w:val'] && !isNaN(children[i].attributes['w:val'].value)
                ) ? +children[i].attributes['w:val'].value : result.options.textScale;
            break;
        case "em":
            result.options.emphasis = this._parseEmphasis(children[i].attributes['w:val']);
            break;
        case "highlight":
            result.options.highlight = (
                children[i].attributes['w:val']
                ) ? this.normalizeColorValue(children[i].attributes['w:val'].value) : result.options.highlight;
            break;
        case "bdr":
            result.options.textBorder = {
                color: (
                    children[i].attributes['w:color'] &&
                        this.normalizeColorValue(children[i].attributes['w:color'].value)
                ) || "",
                themeColor: (
                    children[i].attributes['w:themeColor'] &&
                        this.normalizeColorValue(children[i].attributes['w:themeColor'].value)
                ) || "",
                shadow: this.attributeToBoolean(children[i].attributes['w:shadow']),
                frame: this.attributeToBoolean(children[i].attributes['w:frame'])
            };

            if (children[i].attributes['w:sz'] && !isNaN(children[i].attributes['w:sz'].value)) {
                result.options.textBorder.width = {
                    value: children[i].attributes['w:sz'].value / 8,
                    unit: "pt"
                };
            }

            break;
        case "keepNext":
            result.options.keepNext = children[i] ? this.attributeToBoolean(children[i].attributes['w:val']) : false;
            break;
        case "outlineLvl":
            result.options.outlineLevel = (
                children[i] && children[i].attributes['w:val'] && !isNaN(
                    children[i].attributes['w:val'].value
                )
                ) ? +children[i].attributes['w:val'].value : 0;
            break;
        case "numPr":
            numIdNode = children[i].querySelector('numId');
            levelNode = children[i].querySelector('ilvl');
            result.options.numbering = {
                id: (
                    numIdNode && numIdNode.attributes['w:val'] && !isNaN(numIdNode.attributes['w:val'].value)
                    ) ? +numIdNode.attributes['w:val'].value : 0,
                level: (
                    levelNode && levelNode.attributes['w:val'] && !isNaN(levelNode.attributes['w:val'].value)
                    ) ? +levelNode.attributes['w:val'].value : 0
            };
            break;
        case "tblBorders":
            copy(result, this._parseTableBorderStyle({
                node: children[i]
            }));
            horizontalBorder = children[i].querySelector('insideH');
            verticalBorder = children[i].querySelector('insideV');
            cellBorderBottom = horizontalBorder ? this._parseTableBorderProperties(horizontalBorder) : null;
            cellBorderRight = verticalBorder ? this._parseTableBorderProperties(verticalBorder) : null;

            if (cellBorderBottom || cellBorderRight) {
                result.cellsStyleProperties = {
                    css: {}
                };

                if (cellBorderRight) {
                    result.cellsStyleProperties.css.borderRightWidth = cellBorderRight.width;
                    result.cellsStyleProperties.css.borderRightColor = cellBorderRight.color;
                    result.cellsStyleProperties.css.borderRightStyle = cellBorderRight.style;
                }

                if (cellBorderBottom) {
                    result.cellsStyleProperties.css.borderBottomWidth = cellBorderBottom.width;
                    result.cellsStyleProperties.css.borderBottomColor = cellBorderBottom.color;
                    result.cellsStyleProperties.css.borderBottomStyle = cellBorderBottom.style;
                }
            }
            break;
        case "lang":
            result.options.language = this._parseLanguageNode(children[i]);
            break;
        }
    }

    return result;
};