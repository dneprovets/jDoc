/**
 *
 * @param options
 * @returns {null}
 */
jDoc.engines.Simple.prototype.parse = function (options) {
    var reader,
        self;

    if (typeof options.start === 'function') {
        options.start();
    }
    if (!this.validate()) {
        if (typeof options.error === 'function') {
            options.error(this._errors.invalidFileType);
        }
        if (typeof options.complete === 'function') {
            options.complete();
        }
    } else {
        reader = new FileReader();
        self = this;

        reader.onload = function (event) {
            self._createParsedFile(event.target.result, function (parsedFile) {
                if (typeof options.success === 'function') {
                    options.success(parsedFile);
                }
                if (typeof options.complete === 'function') {
                    options.complete();
                }
            });
        };

        reader.readAsText(this.file);
    }
    return null;
};