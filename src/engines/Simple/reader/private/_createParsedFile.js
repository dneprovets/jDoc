/**
 *
 * @param text {String}
 * @param callback {function}
 * @private
 */
jDoc.engines.Simple.prototype._createParsedFile = function (text, callback) {
    var textContent,
        i,
        len,
        textSections,
        breaks,
        element,
        isLink = false,
        elements = [];

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

            elements.push(element);
        }
    }

    if (typeof callback === 'function') {
        callback(
            new jDoc.ParsedFile({
                pages: [{
                    options: {},
                    css: {},
                    elements: [{
                        options: {
                            isParagraph: true
                        },
                        css: {},
                        elements: [{
                            options: {},
                            css: {},
                            elements: elements
                        }]
                    }]
                }]
            })
        );
    }
};