/**
 *
 * @param text {String}
 * @param callback {function}
 * @private
 */
jDoc.engines.DSV.prototype._createParsedFile = function (text, callback) {
    var delimiterType = this.options.fileType.delimiterType || "comma",
        delimiterMask,
        delimiter = "",
        escapedDelimiterKey = "DSV_DELIMITER_ESCAPED",
        escapedCommaMask = (/".*(,).*"/g),
        escapedCommaPart,
        escapedCommaPartModified,
        element = {
            options: {
                isTable: true
            },
            header: {
                rows: [{
                    cells: [],
                    css: {},
                    options: {},
                    dimensionCSSRules: {}
                }]
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
        i,
        j,
        length,
        len,
        rows,
        cells;

    if (delimiterType === "comma") {
        delimiterMask = /,/;
        delimiter = ",";

        escapedCommaPart = escapedCommaMask.exec(text);

        while (escapedCommaPart && escapedCommaPart[0] && escapedCommaPart[1]) {
            escapedCommaPartModified = escapedCommaPart[0].replace(/,/g, escapedDelimiterKey);
            text = text.replace(escapedCommaPart[0], escapedCommaPartModified);

            escapedCommaPart = escapedCommaMask.exec(text);
        }
    } else if (delimiterType === 'tab') {
        delimiterMask = /\t/;
        delimiter = this._getTabAsSpaces();
    }

    rows = text.split(/\n+/);
    cells = rows[0].split(delimiterMask);
    len = cells.length;

    for (i = 0; i < len; i++) {
        element.header.rows[0].cells[i] = {
            css: {},
            dimensionCSSRules: {},
            options: {},
            elements: [{
                options: {},
                properties: {
                    textContent: cells[i].replace(/DSV_DELIMITER_ESCAPED/g, delimiter)
                }
            }]
        };
    }

    length = rows.length;

    for (j = 1; j < length; j++) {
        cells = rows[j].split(delimiterMask);
        len = cells.length;
        element.body.rows[j - 1] = {
            cells: [],
            css: {},
            options: {},
            dimensionCSSRules: {}
        };

        for (i = 0; i < len; i++) {
            element.body.rows[j - 1].cells[i] = {
                css: {},
                dimensionCSSRules: {},
                options: {},
                elements: [{
                    options: {},
                    properties: {
                        textContent: cells[i].replace(/DSV_DELIMITER_ESCAPED/g, delimiter)
                    }
                }]
            };
        }
    }

    if (typeof callback === 'function') {
        callback(
            new jDoc.ParsedFile({
                pages: [{
                    options: {},
                    css: {},
                    elements: [element]
                }]
            })
        );
    }
};