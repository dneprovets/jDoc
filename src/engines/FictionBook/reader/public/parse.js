/**
 * @description Read files in Fiction Book Formal
 * @param options
 * @public
 */
jDoc.engines.FictionBook.prototype.parse = function (options) {
    var fileEntries;

    if (typeof options.start === 'function') {
        options.start();
    }
    if (!this.validate()) {
        if (typeof options.error === 'function') {
            options.error({
                message: 'Invalid file format'
            });
        }
        if (typeof options.complete === 'function') {
            options.complete();
        }
        return null;
    }

    fileEntries = [{
        file: this.file,
        entry: {}
    }];

    this.readFilesEntries({
        entries: fileEntries,
        error: options.error,
        read: function (result) {
            var encoding = (/encoding="(.+)"/).exec(result),
                defaultEncoding = "utf-8";

            encoding = encoding ? this._normalizeEncodingValue(encoding[1]) : defaultEncoding;

            if (encoding != defaultEncoding) {
                this.readFilesEntries({
                    encoding: encoding,
                    entries: fileEntries,
                    error: options.error,
                    read: function (result) {
                        this._parseFileHelper(result, options);
                    }.bind(this)
                });
            } else {
                this._parseFileHelper(result, options);
            }
        }.bind(this)
    });

    return null;
};