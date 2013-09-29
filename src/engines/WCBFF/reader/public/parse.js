/**
 * Read files in WCBFF Formal
 * @param options
 * @public
 */
jDoc.Engines.WCBFF.prototype.parse = function (options) {
    if (!this.validate()) {
        if (typeof options.error === 'function') {
            options.error(this._errors.invalidFileType);
        }
        if (typeof options.complete === 'function') {
            options.complete();
        }
    } else {
        var self = this;
        this._getStreams({
            error: function () {
                if (typeof options.error === 'function') {
                    options.error();
                }
                if (typeof options.complete === 'function') {
                    options.complete();
                }
            },
            success: function (fileBinaryReadData) {
                if (self._isDOC()) {
                    self._DOCParse({
                        fileBinaryReadData: fileBinaryReadData,
                        error: function () {
                            if (typeof options.error === 'function') {
                                options.error();
                            }
                            if (typeof options.complete === 'function') {
                                options.complete();
                            }
                        },
                        success: function (fileBinaryReadData) {
                            self._prepareDocument(fileBinaryReadData.text, function (documentData) {
                                if (typeof options.success === 'function') {
                                    options.success(
                                        new eDocs.ParsedFile({
                                            name: (documentData.fileInfo.title || self.file.name || "").replace(/\.[^.]+$/, ''),
                                            isTextDocument: true,
                                            zoom: documentData.options.zoom,
                                            language: documentData.fileInfo.language || "",
                                            wordsCount: documentData.documentInfo.wordsCount || 0,
                                            pages: documentData.pages
                                        })
                                    );
                                }
                                if (typeof options.complete === 'function') {
                                    options.complete();
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    return null;
};