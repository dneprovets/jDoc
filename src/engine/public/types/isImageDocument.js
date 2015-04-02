jDoc.Engine.prototype.isImageDocument = {
    get () {
        return !!(this.fileType && this.fileType.isImageDocument);
    }
};