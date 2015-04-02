jDoc.Engine.prototype.isImageDocument = {
    get: function () {
        return !!(this.fileType && this.fileType.isImageDocument);
    }
};