/**
 * @description Read the file
 * @param options
 * @returns {*}
 */
jDoc.Engine.prototype.parseFromArchive = function (options) {
    var self = this;

    if (!this.validate()) {
        if (typeof options.error === 'function') {
            options.error(this._errors.invalidFileType);
        }
        if (typeof options.complete === 'function') {
            options.complete();
        }
        return false;
    }

    this._readFilesFromZIP({
        success: function (fileEntries) {
            self._createParsedFile(fileEntries, function (parsedFile) {
                if (typeof options.success === 'function') {
                    options.success(parsedFile);
                }
                if (typeof options.complete === 'function') {
                    options.complete();
                }
            });
        },
        error: function () {
            if (typeof options.error === 'function') {
                options.error(this._errors.invalidReadZIPFile);
            }
            if (typeof options.complete === 'function') {
                options.complete();
            }
        }.bind(this)
    });

    return null;
};