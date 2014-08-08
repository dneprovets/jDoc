/**
 * @description Read the file
 * @param file
 * @param options. success, error
 */
jDoc.prototype.read = function (file, options) {
    options = options || {};

    this.trigger('readstart');

    var parse;

    if (!jDoc.isSupported()) {
        this.trigger('error', errors.requiredTechnologies);
        this.trigger('readend');

        return this;
    }

    if (!(file instanceof File || file instanceof Blob)) {
        this.trigger('error', errors.invalidReadFirstArgument);
        this.trigger('readend');
    } else {
        selectEngine.call(this, file, options);
    }

    if (!this._currentEngine) {
        this.trigger('error', errors.invalidFileType);
    } else {
        if (this._currentEngine.options && this._currentEngine.options.parseMethod) {
            parse = this._currentEngine[this._currentEngine.options.parseMethod];
        } else {
            parse = this._currentEngine.parse;
        }

        if (typeof parse === "function") {
            this._currentEngine.once('parse', function (fileData) {
                this.trigger('read', fileData);
            }.bind(this));
            this._currentEngine.once('error', function (error) {
                this.trigger('error', error);
            }.bind(this));
            this._currentEngine.once('parseend', function () {
                this.trigger('readend');
            }.bind(this));
            parse.call(this._currentEngine);
        } else {
            this.trigger('error', errors.invalidParseMethods);
        }
    }

    return this;
};