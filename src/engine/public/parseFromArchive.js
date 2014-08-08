/**
 * @description Read the file
 * @param options
 * @returns {*}
 */
jDoc.Engine.prototype.parseFromArchive = function () {
    var errors = this.errors;

    this.trigger('parsefromarchivestart');

    if (!this.validate()) {
        this.trigger('error', errors.invalidFileType);
        this.trigger('parsefromarchiveend');
        return false;
    }

    this.readFilesFromZIP({
        success: function (fileEntries) {
            this.createFileData(fileEntries, function (fileData) {
                this.trigger('parsefromarchive', fileData);
                this.trigger('parsefromarchiveend');
            }.bind(this));
        }.bind(this),
        error: function () {
            this.trigger('error', errors.invalidReadZIPFile);
            this.trigger('parsefromarchiveend');
        }.bind(this)
    });

    return null;
};