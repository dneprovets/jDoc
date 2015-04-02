jDoc.Engine.prototype.isChartDocument = {
    get: function () {
        return !!(this.fileType && this.fileType.isChartDocument);
    }
};