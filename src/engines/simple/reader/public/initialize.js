Simple.prototype.initialize = function () {
    this.on('parsefromsimplefilestart', function () {
        this.trigger('parsestart');
    }.bind(this));
    this.on('parsefromsimplefile', function (fileData) {
        this.trigger('parse', fileData);
    }.bind(this));
    this.on('parsefromsimplefileend', function () {
        this.trigger('parseend');
    }.bind(this));
};