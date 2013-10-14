/**
 * Read files in Fiction Book Formal
 * @param options
 * @public
 */
jDoc.engines.FictionBook.prototype.parse = function (options) {
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

    var self = this,
        reader = new FileReader(),
        defaultEncoding = "utf-8";
    reader.onload = function (event) {
        var encoding = (/encoding="(.+)"/).exec(event.target.result);
        encoding = encoding ? self._normalizeEncodingValue(encoding[1]) : defaultEncoding;

        if (encoding != defaultEncoding) {
            reader.onload = function (event) {
                self._parseFileHelper(event.target.result, options);
            };

            reader.readAsText(self.file, encoding);
        } else {
            self._parseFileHelper(event.target.result, options);
        }
    };

    reader.readAsText(this.file);

    return null;
};