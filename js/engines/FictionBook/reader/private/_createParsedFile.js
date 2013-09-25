/**
 *
 * @param xml {Document}
 * @param callback {function}
 * @private
 */
jDoc.Engines.FictionBook.prototype._createParsedFile = function (xml, callback) {
    var nodes,
        i,
        len,
        documentData = {
            binaryItems: this._parseBinaryItems(xml.querySelectorAll('binary'))
        },
        result = {
            pages: [{
                options: {},
                css: {},
                dimensionCSSRules: {},
                elements: []
            }],
            options: {},
            css: {},
            dimensionCSSRules: {}
        };

    nodes = jDoc.DOM.children(xml.querySelector('FictionBook'));
    len = nodes.length;

    for (i = 0; i < len; i++) {
        switch (nodes[i].localName) {
            case "description":
                var descriptionNode = xml.querySelector('description');

                documentData.publishInfo = this._parsePublishInfo(descriptionNode.querySelector('publish-info'));
                documentData.fileInfo = this._parseFileInfo(descriptionNode.querySelector('title-info'), documentData);
                documentData.documentInfo = this._parseDocumentInfo(descriptionNode.querySelector('document-info'), documentData);

                if (documentData.fileInfo.annotation) {
                    result.pages[0].elements.push(documentData.fileInfo.annotation);
                }

                if (
                    documentData.fileInfo.coverpage &&
                        documentData.binaryItems[documentData.fileInfo.coverpage.image]
                ) {
                    result.pages[0].elements.push({
                        options: {},
                        elements: [
                            this._prepareImage({
                                documentData: documentData,
                                imageName: documentData.fileInfo.coverpage.image
                            })
                        ]
                    });
                }
                break;
            case "body":
                this._parsePages(nodes[i], documentData, result.pages[0].elements);
                break;
        }
    }

    if (typeof callback === 'function') {
        callback(new jDoc.ParsedFile(result));
    }
};