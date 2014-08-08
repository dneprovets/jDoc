/**
 *
 * @param filesEntry {Array}
 * @param callback {function}
 * @private
 */
OOXML.prototype._createFileDataFromTextDocument = function (filesEntry, callback) {
    var domParser = new DOMParser(),
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

    this.readFilesEntries({
        entries: filesEntry,
        read: function (result, fileEntry) {
            var filename = fileEntry.entry.filename,
                xml;

            if (filename.indexOf('media/') >= 0) {
                documentData.media[filename] = {
                    fileData: fileEntry,
                    data: this._normalizeDataURI(result, filename)
                };
            } else {
                xml = domParser.parseFromString(result, "application/xml");

                if (filename.indexOf('_rels/.rels') >= 0) {
                    documentData.mainRelations = this._parseRelations(xml);
                } else if (filename.indexOf('word/_rels/') >= 0) {
                    documentData.documentRelations = this._parseRelations(xml);
                } else if (filename.indexOf('/app.xml') >= 0) {
                    documentData.applicationInfo = this._parseApplicationInfo(xml);
                } else if (filename.indexOf('/core.xml') >= 0) {
                    documentData.documentInfo = this._parseDocumentInfo(xml);
                } else if (filename.indexOf('theme/') >= 0) {
                    documentData.themes[filename] = this._parseDocumentTheme(xml);
                } else if (filename.indexOf('/fontTable.xml') >= 0) {
                    documentData.fonts = this._parseFontsInfo(xml);
                } else if (filename.indexOf('/settings.xml') >= 0) {
                    documentData.settings = this._parseTextDocumentSettings(xml);
                } else if (filename.indexOf('/webSettings.xml') >= 0) {
                    documentData.webSettings = this._parseWebSettings(xml);
                } else if (filename.indexOf('/styles.xml') >= 0) {
                    documentData.styles = this._parseTextDocumentStyles(xml);
                } else if (filename.indexOf('/document.xml') >= 0) {
                    document = xml;
                }
            }
        }.bind(this),
        success: function () {
            this._parseTextDocumentContent({
                xml: document,
                documentData: documentData,
                callback: function (result) {
                    callback(new jDoc.FileData(result));
                }
            });
        }.bind(this)
    });
};