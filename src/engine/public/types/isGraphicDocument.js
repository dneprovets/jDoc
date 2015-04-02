jDoc.Engine.prototype.isGraphicDocument = {
    get () {
        return !!(this.fileType && this.fileType.isGraphicDocument);
    }
};