jDoc.Engine.prototype.isPresentationDocument = {
    get: function () {
        return !!(this.fileType && this.fileType.isPresentationDocument);
    }
};