jDoc.Engine.prototype.getFileName = function () {
    var name = (this.file && this.file.name) || "";

    return name.replace(/\.[^.]+$/, '');
};