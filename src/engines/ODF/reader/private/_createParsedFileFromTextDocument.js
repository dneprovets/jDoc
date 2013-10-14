/**
 *
 * @param filesEntry {Array}
 * @param callback {function}
 * @private
 */
jDoc.engines.ODF.prototype._createParsedFileFromTextDocument = function (filesEntry, callback) {
    var filesCount = filesEntry.length,
        i,
        counter = 0,
        domParser = new DOMParser(),
        self = this,
        document,
        info,
        interval,
        reader,
        time = 100,
        documentData = {
            documentInfo: {},
            applicationInfo: {},
            styles: {},
            media: {}
        };

    /**
     * Reading files
     */
    for (i = filesCount - 1; i != -1; i--) {
        reader = new FileReader();
        reader.onload = (function (fileData) {
            return function (event) {
                if (fileData.entry.filename.indexOf('styles.') != -1) {
                    self._parseTextDocumentStyles(
                        domParser.parseFromString(event.target.result, "application/xml"),
                        function (styles) {
                            documentData.styles = styles;
                            counter++;
                        }
                    );
                } else if (fileData.entry.filename.indexOf('meta.') != -1) {
                    info = self._parseTextDocumentMetaInformation(
                        domParser.parseFromString(event.target.result, "application/xml")
                    );
                    documentData.documentInfo = info.documentInfo;
                    documentData.applicationInfo = info.applicationInfo;
                    counter++;
                } else if (fileData.entry.filename.indexOf('content.') != -1) {
                    document = domParser.parseFromString(event.target.result, "application/xml");
                    counter++;
                } else if (fileData.entry.filename.indexOf('Pictures') != -1) {
                    documentData.media[fileData.entry.filename] =
                        self._normalizeDataURI(event.target.result, fileData.entry.filename);
                    counter++;
                } else {
                    counter++;
                }

                return null;
            };
        }(filesEntry[i]));

        reader[
            (filesEntry[i].entry.filename.indexOf('Pictures') != -1) ? "readAsDataURL" : "readAsText"
        ](filesEntry[i].file);
    }

    interval = setInterval(function () {
        if (counter == filesCount) {
            clearInterval(interval);
            self._parseTextDocumentContent({
                xml: document,
                documentData: documentData
            }, function (result) {
                callback(new jDoc.ParsedFile(result));
            });
        }
    }, time);
};