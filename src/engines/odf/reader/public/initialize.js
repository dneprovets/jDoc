ODF.prototype.initialize = function () {
    this.on('parsefromarchivestart', function () {
        this.trigger('parsestart');
    }.bind(this));
    this.on('parsefromarchive', function (fileData) {
        this.trigger('parse', fileData);
    }.bind(this));
    this.on('parsefromarchiveend', function () {
        this.trigger('parseend');
    }.bind(this));
};