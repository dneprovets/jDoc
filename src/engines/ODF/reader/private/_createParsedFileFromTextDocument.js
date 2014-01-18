/**
 *
 * @param filesEntry {Array}
 * @param callback {function}
 * @private
 */
jDoc.engines.ODF.prototype._createParsedFileFromTextDocument = function (filesEntry, callback) {
    var counter = 0,
        domParser = new DOMParser(),
        document,
        info,
        documentData = {
            documentInfo: {},
            applicationInfo: {},
            styles: {},
            media: {}
        };

    /**
     * @description Reading files
     */
    this.readFilesEntries({
        entries: filesEntry,
        read: function (result, fileEntry) {
            var filename = fileEntry.entry.filename,
                xml;

            if (filename.indexOf('Pictures') != -1) {
                documentData.media[filename] = this._normalizeDataURI(result, filename);
                counter++;
            } else {
                xml = domParser.parseFromString(result, "application/xml");

                if (filename.indexOf('styles.') != -1) {
                    this._parseTextDocumentStyles(
                        xml,
                        function (styles) {
                            documentData.styles = styles;
                            counter++;
                        }
                    );
                } else {
                    if (filename.indexOf('meta.') != -1) {
                        info = this._parseTextDocumentMetaInformation(xml);
                        documentData.documentInfo = info.documentInfo;
                        documentData.applicationInfo = info.applicationInfo;
                    } else if (filename.indexOf('content.') != -1) {
                        document = xml;
                    }

                    counter++;
                }
            }
        }.bind(this),
        success: function (results, filesEntry, len) {
            var time = 100,
                interval = setInterval(function () {
                    if (counter == len) {
                        clearInterval(interval);
                        this._parseTextDocumentContent({
                            xml: document,
                            documentData: documentData
                        }, function (result) {
                            callback(new jDoc.ParsedFile(result));
                        });
                    }
                }.bind(this), time);
        }.bind(this)
    });
};