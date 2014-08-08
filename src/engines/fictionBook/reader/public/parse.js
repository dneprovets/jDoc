/**
 * @description Read files in Fiction Book Format
 * @public
 */
FictionBook.prototype.parse = function () {
    var fileEntries;

    this.trigger('parsestart');

    if (!this.validate()) {
        this.trigger('error', errors.invalidFileType);
        this.trigger('parseend');
        return;
    }

    fileEntries = [{
        file: this.file,
        entry: {}
    }];

    this.readFilesEntries({
        entries: fileEntries,
        error: function () {
            this.trigger('error', errors.invalidReadFile);
            this.trigger('parseend');
        }.bind(this),
        read: function (result) {
            var encoding = (/encoding="(.+)"/).exec(result),
                defaultEncoding = "utf-8";

            encoding = encoding ? this._normalizeEncodingValue(encoding[1]) : defaultEncoding;

            if (encoding != defaultEncoding) {
                this.readFilesEntries({
                    encoding: encoding,
                    entries: fileEntries,
                    error: function () {
                        this.trigger('error', errors.invalidReadFile);
                        this.trigger('parseend');
                    }.bind(this),
                    read: function (result) {
                        this._parseFileHelper(result);
                    }.bind(this)
                });
            } else {
                this._parseFileHelper(result);
            }
        }.bind(this)
    });

    return null;
};