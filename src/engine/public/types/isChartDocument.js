jDoc.Engine.prototype.isChartDocument = {
    get () {
        return !!(this.fileType && this.fileType.isChartDocument);
    }
};