/**
 *
 * @param data
 * @param callback
 * @returns {boolean}
 * @private
 */
jDoc.engines.OXML.prototype._parseTextDocumentTableNode = function (data, callback) {
    var result = {
        options: {
            isTable: true,
            elementHeight: {
                value: 0,
                units: "pt"
            }
        },
        header: {
            rows: []
        },
        body: {
            rows: []
        },
        footer: {
            rows: []
        },
        attributes: {},
        dimensionCSSRules: {},
        css: {}
    },
        tablePreferencedStyle,
        i,
        j = 0,
        c = 0,
        length = 0,
        children = jDoc.DOM.children(data.tableNode),
        len,
        childrenNodesCount = 0,
        cellWidth = 0,
        cellShading = null,
        cellContent = [],
        cellChildNodesLength = 0,
        row,
        cell,
        horizontalBorder = null,
        cellBorderBottom,
        verticalBorder = null,
        contentChildren = null,
        cellBorderRight,
        rowPropNodesCount,
        parentNodeChildren = null;

    for (i = 0; i < children.length; i++) {
        parentNodeChildren = jDoc.DOM.children(children[i]);
        switch (children[i].localName) {
        case "tr":
            cellBorderBottom = horizontalBorder ? this._parseTableBorderProperties(horizontalBorder) : null;
            cellBorderRight = verticalBorder ? this._parseTableBorderProperties(verticalBorder) : null;
            row = {
                cells: [],
                css: {},
                options: {
                    colsWidth: []
                },
                dimensionCSSRules: {}
            };
            length = parentNodeChildren.length;

            for (j = 0; j < length; j++) {
                contentChildren = jDoc.DOM.children(parentNodeChildren[j]);
                if (parentNodeChildren[j].localName === "tc") {
                    cell = {
                        css: {},
                        dimensionCSSRules: {},
                        options: {},
                        elements: []
                    };
                    cellContent = parentNodeChildren[j].querySelectorAll('p');
                    cellChildNodesLength = contentChildren.length;

                    if (
                        tablePreferencedStyle &&
                            tablePreferencedStyle.tableStyle &&
                            tablePreferencedStyle.tableStyle.cellsStyleProperties
                    ) {
                        jDoc.deepMerge(result, tablePreferencedStyle.tableStyle.cellsStyleProperties);
                    }

                    if (cellBorderRight) {
                        cell.dimensionCSSRules.borderRightWidth = cellBorderRight.width;
                        cell.css.borderRightColor = cellBorderRight.color;
                        cell.css.borderRightStyle = cellBorderRight.style;
                    }

                    if (cellBorderBottom) {
                        cell.dimensionCSSRules.borderBottomWidth = cellBorderBottom.width;
                        cell.css.borderBottomColor = cellBorderBottom.color;
                        cell.css.borderBottomStyle = cellBorderBottom.style;
                    }

                    for (c = 0; c < cellChildNodesLength; c++) {
                        if (contentChildren[c].localName == 'tcPr') {
                            cellWidth = contentChildren[c].querySelector('tcW');
                            cellShading = contentChildren[c].querySelector('shd');

                            if (cellWidth) {
                                cell.dimensionCSSRules.width = this._parseTableElementWidth(cellWidth);
                            }

                            if (cellShading) {
                                if (
                                    cellShading.attributes['w:fill'] &&
                                        cellShading.attributes['w:fill'].value &&
                                        cellShading.attributes['w:fill'].value != "auto"
                                ) {
                                    cell.css.backgroundColor = this._normalizeColorValue(
                                        cellShading.attributes['w:fill'].value
                                    );
                                }
                            }
                        } else if (contentChildren[c].localName == 'p') {
                            cell.elements.push(this._parseTextDocumentParagraphNode({
                                node: contentChildren[c],
                                documentData: data.documentData
                            }));
                        }
                    }
                    row.cells.push(cell);
                } else if (parentNodeChildren[j].localName === "trPr") {
                    rowPropNodesCount = contentChildren.length;

                    for (c = 0; c < rowPropNodesCount; c++) {
                        if (contentChildren[c].localName === "trHeight") {
                            if (
                                contentChildren[c].attributes['w:val'] &&
                                    !isNaN(contentChildren[c].attributes['w:val'].value)
                            ) {
                                row.dimensionCSSRules.height = {
                                    value: contentChildren[c].attributes['w:val'].value / 20,
                                    units: "pt"
                                };
                            }
                        }
                    }
                }
            }
            result.body.rows.push(row);
            break;
        case "tblGrid":
            childrenNodesCount = parentNodeChildren.length;
            for (j = 0; j < childrenNodesCount; j++) {
                if (
                    parentNodeChildren[j] === "gridCol" && (
                        parentNodeChildren[j].attributes['w:w'] &&
                            !isNaN(parentNodeChildren[j].attributes['w:w'].value)
                    )
                ) {
                    result.options.colsWidth.push({
                        value: parentNodeChildren[j].attributes['w:w'].value,
                        units: "pt"
                    });
                }
            }
            break;
        case 'tblPr':
            var tableWidth = children[i].querySelector('tblW');
            var tblStyle = children[i].querySelector('tblStyle');

            if (
                tblStyle && tblStyle.attributes['w:val'] && tblStyle.attributes['w:val'].value &&
                    data.documentData.styles.preferencedStyles[tblStyle.attributes['w:val'].value]
            ) {
                tablePreferencedStyle = data.documentData.styles.preferencedStyles[tblStyle.attributes['w:val'].value];

                if (tablePreferencedStyle && tablePreferencedStyle.tableStyle) {
                    jDoc.deepMerge(result, tablePreferencedStyle.tableStyle);
                }
            }

            var tableBorders = children[i].querySelector('tblBorders');
            if (tableWidth) {
                result.dimensionCSSRules.width = this._parseTableElementWidth(tableWidth);
            }
            if (tableBorders) {
                jDoc.deepMerge(result, this._parseTableBorderStyle({
                    node: tableBorders
                }));
                horizontalBorder = tableBorders.querySelector('insideH');
                verticalBorder = tableBorders.querySelector('insideV');
            }
            break;
        }
    }

    length = result.body.rows.length;
    row = result.body.rows[length - 1];

    if (row) {
        len = row.cells.length;
        for (j = 0; j < len; j++) {
            row.cells[j].dimensionCSSRules.borderBottomWidth = "";
            row.cells[j].css.borderBottomStyle = "";
            row.cells[j].css.borderBottomColor = "";
        }
    }

    for (j = 0; j < length; j++) {
        len = result.body.rows[j].cells.length;
        cell = result.body.rows[j].cells[len - 1];
        if (cell) {
            cell.dimensionCSSRules.borderRightWidth = "";
            cell.css.borderRightStyle = "";
            cell.css.borderRightColor = "";
        }
    }

    if (typeof callback === 'function') {
        callback(result);
    }
    return true;
};