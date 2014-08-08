/**
 *
 * @param xml {Document}
 * @param callback {function}
 * @private
 */
FictionBook.prototype.createFileData = function (xml, callback) {
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
                children: []
            }],
            options: {},
            css: {},
            dimensionCSSRules: {}
        };

    nodes = $.children(xml.querySelector('FictionBook'));
    len = nodes.length;

    for (i = 0; i < len; i++) {
        switch (nodes[i].localName) {
            case "description":
                var descriptionNode = xml.querySelector('description');

                documentData.publishInfo = this._parsePublishInfo(descriptionNode.querySelector('publish-info'));
                documentData.fileInfo = this._parseFileInfo(descriptionNode.querySelector('title-info'), documentData);
                documentData.documentInfo = this._parseDocumentInfo(descriptionNode.querySelector('document-info'), documentData);

                if (documentData.fileInfo.annotation) {
                    result.pages[0].children.push(documentData.fileInfo.annotation);
                }

                if (
                    documentData.fileInfo.coverpage &&
                        documentData.binaryItems[documentData.fileInfo.coverpage.image]
                ) {
                    result.pages[0].children.push({
                        options: {},
                        children: [
                            this._prepareImage({
                                documentData: documentData,
                                imageName: documentData.fileInfo.coverpage.image
                            })
                        ]
                    });
                }
                break;
            case "body":
                this._parsePages(nodes[i], documentData, result.pages[0].children);
                break;
        }
    }

    if (typeof callback === 'function') {
        callback.call(this, new jDoc.FileData(result));
    }
};