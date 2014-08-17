/**
 *
 * @param text {String}
 * @param callback {function}
 * @private
 */
Simple.prototype.createFileData = function (text, callback) {
    var textContent,
        i,
        len,
        textSections,
        breaks,
        element,
        isLink = false,
        children = [];

    textSections = text.split(/\s/);
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

    if (typeof callback === 'function') {
        callback(
            new jDoc.FileData({
                name: this.getFileName(),
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