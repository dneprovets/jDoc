/**
 * @description Initialize data
 * @return {Object}
 */
jDoc.Engine.prototype.initialize = function (file) {
    var fileType = this._getFileType(file);

    if (fileType) {
        this.file = file;
        this.options.isValid = true;
        this.options.fileType = fileType;
    } else {
        this.options.isValid = false;
    }

    return this;
};