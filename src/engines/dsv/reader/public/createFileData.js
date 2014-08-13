/**
 *
 * @param text {String}
 * @param callback {function}
 * @private
 */
DSV.prototype.createFileData = function (text, callback) {
    var delimiterType = this.options.fileType.delimiterType || "comma",
        delimiterMask,
        delimiter = "",
        escapedDelimiterKey = "DSV_DELIMITER_ESCAPED",
        escapedCommaMask = (/".*(,).*"/g),
        escapedCommaPart,
        escapedCommaPartModified,
        result = {
            options: {
                isTable: true
            },
            children: [],
            attributes: {},
            dimensionCSSRules: {},
            css: {}
        },
        el,
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

    if (len) {
        el = {
            options: {
                isHeader: true
            },
            children: [{
                children: []
            }]
        };
        result.children.push(el);
    }

    for (i = 0; i < len; i++) {
        el.children[0].children[i] = {
            css: {},
            dimensionCSSRules: {},
            options: {},
            children: [{
                options: {},
                properties: {
                    textContent: cells[i].replace(/DSV_DELIMITER_ESCAPED/g, delimiter)
                }
            }]
        };
    }

    length = rows.length;

    if (length) {
        el = {
            options: {},
            children: []
        };
        result.children.push(el);
    }

    for (j = 1; j < length; j++) {
        cells = rows[j].split(delimiterMask);
        len = cells.length;
        el.children[j - 1] = {
            children: [],
            css: {},
            options: {},
            dimensionCSSRules: {}
        };

        for (i = 0; i < len; i++) {
            el.children[j - 1].children[i] = {
                css: {},
                dimensionCSSRules: {},
                options: {},
                children: [{
                    options: {},
                    properties: {
                        textContent: cells[i].replace(/DSV_DELIMITER_ESCAPED/g, delimiter)
                    }
                }]
            };
        }
    }

    if (typeof callback === 'function') {
        callback.call(
            this,
            new jDoc.FileData({
                name: this.getFileName(),
                pages: [{
                    options: {},
                    css: {},
                    children: [result]
                }]
            })
        );
    }
};