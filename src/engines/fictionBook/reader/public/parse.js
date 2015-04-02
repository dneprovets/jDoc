/**
 * @description Read files in Fiction Book Format
 * @public
 */
FictionBook.prototype.parse = function () {
    return new Promise(function (resolve, reject) {
        var fileEntries;

        if (!this.isValid) {
            reject(new Error(this.errors.invalidFileType.message));
            return;
        }

        fileEntries = [{
            file: this.file,
            entry: {}
        }];

        this.readFilesEntries({
            entries: fileEntries
        }).then(
            function (result) {
                var encoding = (/encoding="(.+)"/).exec(result),
                    defaultEncoding = "utf-8";

                encoding = encoding ? this._normalizeEncodingValue(encoding[1]) : defaultEncoding;

                if (encoding != defaultEncoding) {
                    this.readFilesEntries({
                        encoding: encoding,
                        entries: fileEntries
                    }).then(
                        function (result) {
                            resolve(this._parseFileHelper(result));
                        }.bind(this),
                        function () {
                            reject(new Error(this.errors.invalidFileType.message));
                        }.bind(this)
                    );
                } else {
                    resolve(this._parseFileHelper(result));
                }
            }.bind(this),
            function () {
                reject(new Error(this.errors.invalidFileType.message));
            }.bind(this)
        );
    });
};