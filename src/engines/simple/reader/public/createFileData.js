/**
 *
 * @param text {String}
 * @param callback {function}
 * @private
 */
Simple.prototype.createFileData = function (text, callback) {
    var textContent,
        i,
        j,
        l,
        len,
        textLines,
        textSections,
        breaks,
        element,
        isLink = false,
        children = [];

    textLines = text.split(/\n/);
    l = textLines.length;

    for (j = 0; j < l; j++) {
        textSections = textLines[j].split(/\s/);
        len = textSections.length;

        for (i = 0; i < len; i++) {
            if (textSections[i]) {
                isLink = jDoc.validateURL(textSections[i]);

                element = {
                    options: {},
                    css: {},
                    attributes: {},
                    properties: {
                        textContent: textSections[i] + " "
                    }
                };

                if (isLink) {
                    breaks = textSections[i].replace(/\S+/g, '') + " ";
                    textContent = textSections[i].replace(/\s+/, '');
                    element.isLink = true;
                    element.href = textContent;
                    element.properties.textContent = textContent;
                    element.after = breaks;
                }

                children.push(element);
            }
        }

        if (j < l - 1) {
            children.push(element = {
                options: {
                    isEmptyLine: true
                },
                css: {},
                attributes: {},
                properties: {}
            });
        }
    }

    if (typeof callback === 'function') {
        callback(
            new jDoc.FileData({
                name: this.fileName,
                pages: [{
                    options: {},
                    css: {},
                    children: [{
                        options: {
                            isParagraph: true
                        },
                        css: {},
                        children: [{
                            options: {},
                            css: {},
                            children: children
                        }]
                    }]
                }]
            })
        );
    }
};