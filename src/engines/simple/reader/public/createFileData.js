export default {
    value (text) {
        return new Promise((resolve) => {
            var textContent,
                textLines,
                breaks,
                element,
                len,
                isLink = false,
                children = [];

            textLines = text.split(/\n/);
            len = textLines.length;

            textLines.forEach((tl, i) => {
                var textSections = tl.split(/\s/);

                textSections.forEach((ts) => {
                    if (ts) {
                        isLink = jDoc.validateURL(ts);

                        element = {
                            options: {},
                            css: {},
                            attributes: {},
                            properties: {
                                textContent: ts + " "
                            }
                        };

                        if (isLink) {
                            breaks = ts.replace(/\S+/g, '') + " ";
                            textContent = ts.replace(/\s+/, '');
                            element.isLink = true;
                            element.href = textContent;
                            element.properties.textContent = textContent;
                            element.after = breaks;
                        }

                        children.push(element);
                    }    
                });

                if (i < len - 1) {
                    children.push(element = {
                        options: {
                            isEmptyLine: true
                        },
                        css: {},
                        attributes: {},
                        properties: {}
                    });
                }
            });

            resolve(new jDoc.FileData({
                name: this.fileName,
                wordsCount: text.split(/\s+/).length,
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
            }));

        });
    }
};