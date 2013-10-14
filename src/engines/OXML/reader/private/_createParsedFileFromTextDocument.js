/**
 *
 * @param filesEntry {Array}
 * @param callback {function}
 * @private
 */
jDoc.engines.OXML.prototype._createParsedFileFromTextDocument = function (filesEntry, callback) {
    var filesCount = filesEntry.length,
        i,
        reader,
        counter = 0,
        domParser = new DOMParser(),
        self = this,
        document,
        documentData = {
            mainRelations: {},
            documentRelations: {},
            appInfo: {},
            documentInfo: {},
            fonts: {},
            settings: {},
            styles: {},
            webSettings: {},
            media: {},
            themes: {}
        };

    for (i = 0; i < filesCount; i++) {
        reader = new FileReader();
        reader.onload = (function (fileData) {
            return function (event) {
                if (fileData.entry.filename.indexOf('_rels/.rels') >= 0) {
                    documentData.mainRelations =
                        self._parseRelations.call(self, domParser.parseFromString(event.target.result,
                            "application/xml"));
                    counter++;
                } else if (fileData.entry.filename.indexOf('word/_rels/') >= 0) {
                    counter++;
                    documentData.documentRelations =
                        self._parseRelations.call(self, domParser.parseFromString(event.target.result,
                            "application/xml"));
                } else if (fileData.entry.filename.indexOf('/app.xml') >= 0) {
                    counter++;
                    documentData.applicationInfo =
                        self._parseApplicationInfo.call(self, domParser.parseFromString(event.target.result,
                            "application/xml"));
                } else if (fileData.entry.filename.indexOf('/core.xml') >= 0) {
                    counter++;
                    documentData.documentInfo =
                        self._parseDocumentInfo.call(self, domParser.parseFromString(event.target.result,
                            "application/xml"));
                } else if (fileData.entry.filename.indexOf('media/') >= 0) {
                    counter++;
                    documentData.media[fileData.entry.filename] = {
                        fileData: fileData,
                        data: self._normalizeDataURI(event.target.result, fileData.entry.filename)
                    };
                } else if (fileData.entry.filename.indexOf('theme/') >= 0) {
                    counter++;
                    documentData.themes[fileData.entry.filename] =
                        self._parseDocumentTheme.call(
                            self, domParser.parseFromString(event.target.result,"application/xml")
                        );
                } else if (fileData.entry.filename.indexOf('/fontTable.xml') >= 0) {
                    counter++;
                    documentData.fonts =
                        self._parseFontsInfo.call(self, domParser.parseFromString(event.target.result,
                            "application/xml"));
                } else if (fileData.entry.filename.indexOf('/settings.xml') >= 0) {
                    counter++;
                    documentData.settings =
                        self._parseTextDocumentSettings.call(self, domParser.parseFromString(event.target.result,
                            "application/xml"));
                } else if (fileData.entry.filename.indexOf('/webSettings.xml') >= 0) {
                    counter++;
                    documentData.webSettings =
                        self._parseWebSettings.call(self, domParser.parseFromString(event.target.result,
                            "application/xml"));
                } else if (fileData.entry.filename.indexOf('/styles.xml') >= 0) {
                    counter++;
                    documentData.styles =
                        self._parseTextDocumentStyles.call(self, domParser.parseFromString(event.target.result,
                            "application/xml"));
                } else if (fileData.entry.filename.indexOf('/document.xml') >= 0) {
                    counter++;
                    document = domParser.parseFromString(event.target.result, "application/xml");
                } else {
                    counter++;
                }

                if (counter > filesCount - 1) {
                    self._parseTextDocumentContent.call(self, {
                        xml: document,
                        documentData: documentData,
                        callback: function (result) {
                            callback(new jDoc.ParsedFile(result));
                        }
                    });
                    return false;
                }

                return true;
            }
        }(filesEntry[i]));

        reader[(filesEntry[i].entry.filename.indexOf('media/') >= 0) ? "readAsDataURL" : "readAsText"](filesEntry[i].file);
    }
};