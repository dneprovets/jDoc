/**
 *
 * @param data
 * @param callback
 * @returns {boolean}
 * @private
 */
OOXML.prototype._parseTextDocumentTableNode = function (data, callback) {
    var header = {
            children: []
        },
        body = {
            children: []
        },
        footer = {
            children: []
        },
        result = {
            options: {
                isTable: true,
                elementHeight: {
                    value: 0,
                    unit: "pt"
                }
            },
            children: [header, body, footer],
            attributes: {},
            dimensionCssRules: {},
            css: {}
        },
        tablePreferenceStyle,
        i,
        j = 0,
        c = 0,
        length = 0,
        children = $.children(data.tableNode),
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
        parentNodeChildren = $.children(children[i]);
        switch (children[i].localName) {
        case "tr":
            cellBorderBottom = horizontalBorder ? this._parseTableBorderProperties(horizontalBorder) : null;
            cellBorderRight = verticalBorder ? this._parseTableBorderProperties(verticalBorder) : null;
            row = {
                children: [],
                css: {},
                options: {
                    colsWidth: []
                },
                dimensionCssRules: {}
            };
            length = parentNodeChildren.length;

            for (j = 0; j < length; j++) {
                contentChildren = $.children(parentNodeChildren[j]);
                if (parentNodeChildren[j].localName === "tc") {
                    cell = {
                        css: {},
                        dimensionCssRules: {},
                        options: {},
                        children: []
                    };
                    cellContent = parentNodeChildren[j].querySelectorAll('p');
                    cellChildNodesLength = contentChildren.length;

                    if (
                        tablePreferenceStyle &&
                            tablePreferenceStyle.tableStyle &&
                            tablePreferenceStyle.tableStyle.cellsStyleProperties
                    ) {
                        copy(result, tablePreferenceStyle.tableStyle.cellsStyleProperties);
                    }

                    if (cellBorderRight) {
                        cell.dimensionCssRules.borderRightWidth = cellBorderRight.width;
                        cell.css.borderRightColor = cellBorderRight.color;
                        cell.css.borderRightStyle = cellBorderRight.style;
                    }

                    if (cellBorderBottom) {
                        cell.dimensionCssRules.borderBottomWidth = cellBorderBottom.width;
                        cell.css.borderBottomColor = cellBorderBottom.color;
                        cell.css.borderBottomStyle = cellBorderBottom.style;
                    }

                    for (c = 0; c < cellChildNodesLength; c++) {
                        if (contentChildren[c].localName == 'tcPr') {
                            cellWidth = contentChildren[c].querySelector('tcW');
                            cellShading = contentChildren[c].querySelector('shd');

                            if (cellWidth) {
                                cell.dimensionCssRules.width = this._parseTableElementWidth(cellWidth);
                            }

                            if (cellShading) {
                                if (
                                    cellShading.attributes['w:fill'] &&
                                        cellShading.attributes['w:fill'].value &&
                                        cellShading.attributes['w:fill'].value != "auto"
                                ) {
                                    cell.css.backgroundColor = this.normalizeColorValue(
                                        cellShading.attributes['w:fill'].value
                                    );
                                }
                            }
                        } else if (contentChildren[c].localName == 'p') {
                            cell.children.push(this._parseTextDocumentParagraphNode({
                                node: contentChildren[c],
                                documentData: data.documentData
                            }));
                        }
                    }
                    row.children.push(cell);
                } else if (parentNodeChildren[j].localName === "trPr") {
                    rowPropNodesCount = contentChildren.length;

                    for (c = 0; c < rowPropNodesCount; c++) {
                        if (contentChildren[c].localName === "trHeight") {
                            if (
                                contentChildren[c].attributes['w:val'] &&
                                    !isNaN(contentChildren[c].attributes['w:val'].value)
                            ) {
                                row.dimensionCssRules.height = {
                                    value: contentChildren[c].attributes['w:val'].value / 20,
                                    unit: "pt"
                                };
                            }
                        }
                    }
                }
            }
            body.children.push(row);
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
                        unit: "pt"
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
                tablePreferenceStyle = data.documentData.styles.preferencedStyles[tblStyle.attributes['w:val'].value];

                if (tablePreferenceStyle && tablePreferenceStyle.tableStyle) {
                    copy(result, tablePreferenceStyle.tableStyle);
                }
            }

            var tableBorders = children[i].querySelector('tblBorders');
            if (tableWidth) {
                result.dimensionCssRules.width = this._parseTableElementWidth(tableWidth);
            }
            if (tableBorders) {
                copy(result, this._parseTableBorderStyle({
                    node: tableBorders
                }));
                horizontalBorder = tableBorders.querySelector('insideH');
                verticalBorder = tableBorders.querySelector('insideV');
            }
            break;
        }
    }

    length = body.children.length;
    row = body.children[length - 1];

    if (row) {
        len = row.children.length;
        for (j = 0; j < len; j++) {
            row.children[j].dimensionCssRules.borderBottomWidth = "";
            row.children[j].css.borderBottomStyle = "";
            row.children[j].css.borderBottomColor = "";
        }
    }

    for (j = 0; j < length; j++) {
        len = body.children[j].children.length;
        cell = body.children[j].children[len - 1];
        if (cell) {
            cell.dimensionCssRules.borderRightWidth = "";
            cell.css.borderRightStyle = "";
            cell.css.borderRightColor = "";
        }
    }

    if (typeof callback === 'function') {
        callback(result);
    }
    return true;
};