jDoc.Engine.prototype.parseFromSimpleFile = function () {
    this.trigger('parsefromsimplefilestart');

    if (!this.validate()) {
        this.trigger('error', this.errors.invalidFileType);
        this.trigger('parsefromsimplefileend');

        return null;
    }

    this.readFilesEntries({
        error: function () {
            this.trigger('error', this.errors.invalidFileType);
            this.trigger('parsefromsimplefileend');
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
                this.trigger('parsefromsimplefile', fileData);
                this.trigger('parsefromsimplefileend');
            }.bind(this));
        }.bind(this)
    });

    return null;
};