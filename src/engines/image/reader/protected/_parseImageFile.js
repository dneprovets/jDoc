ImageEngine.prototype._parseImageFile = function () {
    this.trigger('parsestart');

    if (!this.validate()) {
        this.trigger('error', this.errors.invalidFileType);
        this.trigger('parseeend');

        return null;
    }

    this.readFilesEntries({
        method: "readAsDataURL",
        error: function () {
            this.trigger('error', this.errors.invalidFileType);
            this.trigger('parseend');
        }.bind(this),
        entries: [{
            file: this.file,
            entry: {}
        }],
        read: function (result) {
            if (typeof this.createFileData !== 'function') {
                this.trigger('error', this.errors.notFoundMethodCreateFileData);
                return;
            }

            this.createFileData(result, function (fileData) {
                this.trigger('parse', fileData);
                this.trigger('parseend');
            }.bind(this));
        }.bind(this)
    });

    return null;
};