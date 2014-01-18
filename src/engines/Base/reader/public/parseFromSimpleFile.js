jDoc.Engine.prototype.parseFromSimpleFile = function (options) {
    if (!this.validate()) {
        if (typeof options.error === 'function') {
            options.error(this._errors.invalidFileType);
        }
        if (typeof options.complete === 'function') {
            options.complete();
        }
    } else {
        this.readFilesEntries({
            error: options.error,
            entries: [{
                file: this.file,
                entry: {}
            }],
            read: function (result) {
                this._createParsedFile(result, function (parsedFile) {
                    if (typeof options.success === 'function') {
                        options.success(parsedFile);
                    }
                    if (typeof options.complete === 'function') {
                        options.complete();
                    }
                });
            }.bind(this)
        });
    }
    return null;
};