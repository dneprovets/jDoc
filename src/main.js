var ArrayPrototype = Array.prototype;

/**
 * @description jDoc
 * @type {{engines: {}, currentEngine: null, _errors: {invalidReadFirstArgument: {message: string}, invalidFileType: {message: string}, invalidLoadFile: {message: string}, requiredTechnologies: {message: string}}, _validators: {email: RegExp, url: RegExp}, validateEmail: Function, validateURL: Function, _supportedFormats: Array, read: Function, _selectEngine: Function, getSupportedFormats: Function, testRequiredTechnologies: Function, getFileMimeType: Function}}
 */
var jDoc = {
    engines: {},

    currentEngine: null,

    /**
     * @description error objects
     */
    _errors: {
        invalidReadFirstArgument: {
            message: 'First argument must be type of File'
        },
        invalidFileType: {
            message: 'Invalid file type'
        },
        invalidLoadFile: {
            message: "Can't load the file"
        },
        requiredTechnologies: {
            message: "Not have the required technology"
        }
    },

    /**
     * @private
     * @description validators
     */
    _validators: {
        email: (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i),
        url: (/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i)
    },

    /**
     *
     * @param val
     * @returns {*}
     */
    validateEmail: function (val) {
        return this._validators.email.test(val);
    },

    /**
     *
     * @param val
     * @returns {*}
     */
    validateURL: function (val) {
        return this._validators.url.test(val);
    },

    /**
     * @description Support formats
     */
    _supportedFormats: ["docx", "txt", "fb2", "odt", "csv", "tsv"],

    /**
     * @description Read the file
     * @param file
     * @param options. success, error
     */
    read: function (file, options) {
        if (typeof options !== 'object') {
            options = {};
        }
        if (typeof options.start === 'function') {
            options.start();
        }

        if (!this.testRequiredTechnologies()) {
            if (typeof options.error === 'function') {
                options.error(this._errors.requiredTechnologies);
            }
            return;
        }

        if (!(file instanceof File)) {
            if (typeof options.error === 'function') {
                options.error(this._errors.invalidReadFirstArgument);
            }
            if (typeof options.complete === 'function') {
                options.complete();
            }
        } else {
            this._selectEngine(file, options);
        }
    },

    /**
     *
     * @param file
     * @param options
     * @private
     */
    _selectEngine: function (file, options) {
        var engine,
            parse,
            engineObj;

        // Select engine for file
        this.currentEngine = null;

        for (engine in this.engines) {
            if (this.engines.hasOwnProperty(engine)) {
                engineObj = new this.engines[engine](file);
                if (engineObj.validate()) {
                    this.currentEngine = engineObj;
                    break;
                }
            }
        }
        if (this.currentEngine === null) {
            if (typeof options.error === 'function') {
                options.error(this._errors.invalidFileType);
            }
            if (typeof options.complete === 'function') {
                options.complete();
            }
        } else {
            if (this.currentEngine.options.parseMethod) {
                parse = this.currentEngine[this.currentEngine.options.parseMethod];
            } else {
                parse = this.currentEngine.parse;
            }

            parse.call(this.currentEngine, {
                success: function (parsedFile) {
                    if (typeof options.success === 'function') {
                        options.success(parsedFile);
                    }
                },
                error: function (error) {
                    if (typeof options.error === 'function') {
                        options.error(error);
                    }
                },
                complete: function () {
                    if (typeof options.complete === 'function') {
                        options.complete();
                    }
                }
            });
        }
    },

    /**
     *
     * @return {Array}
     */
    getSupportedFormats: function () {
        return this._supportedFormats;
    },

    /**
     *
     * @returns {boolean}
     */
    testRequiredTechnologies: function () {
        var wnd = window;

        return !!(
            wnd.localStorage &&
            wnd.Blob &&
            wnd.Blob.prototype.slice &&
            wnd.FileReader &&
            wnd.ArrayBuffer &&
            wnd.Uint8Array &&
            wnd.DataView
            //wnd.requestFileSystem
        );
    },

    /**
     *
     * @param filename
     * @returns {string}
     */
    getFileMimeType: function (filename) {
        var extension = (/[A-Za-z]+$/).exec(filename),
            result = "";

        extension = extension ? extension[0].toLowerCase() : null;

        if (extension) {
            switch (extension) {
            case "png":
                result = "image/png";
                break;
            case "jpg":
            case "jpeg":
                result = "image/jpeg";
                break;
            case "gif":
                result = "image/gif";
                break;
            }
        }
        return result;
    }
};