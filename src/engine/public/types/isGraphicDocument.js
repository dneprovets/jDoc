jDoc.Engine.prototype.isGraphicDocument = {
    get: function () {
        return !!(this.fileType && this.fileType.isGraphicDocument);
    }
};