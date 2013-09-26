jDoc.Engine = function () {
    this.initialize.apply(this, arguments);
};
jDoc.Engine.prototype = {

    /**
     *
     * @private
     */
    _fileTypeParsers: [],

    /**
     *
     * @private
     */
    _effectPatterns: {
        blinkBackground: "blinkBackgroundAnimation",
        lights: "lightsAnimation",
        antsBlack: "blackDashedLineAnimation",
        antsRed: "redDashedLineAnimation",
        shimmer: "shimmerAnimation",
        sparkle: "sparkleAnimation",
        none: "none"
    },

    /**
     *
     * @private
     */
    _shadowPatterns: {
        nil: null,
        clear: null,
        solid: "0 0 5px 0",
        horzStripe: "5px 0 5px 0",
        vertStripe: "0 5px 5px 0",
        reverseDiagStripe: "-5px -5px 5px 0",
        diagStripe: "5px 5px 5px 0",
        thinHorzStripe: "1px 0 1px 0",
        thinVertStripe: "0 1px 1px 0",
        thinReverseDiagStripe: "-1px -1px 1px 0",
        thinDiagStripe: "1px 1px 1px 0"
    },

    _errors: {
        invalidFileType: {
            message: 'Invalid file format'
        },
        invalidReadZIPFile: {
            message: "Can not read file"
        }
    },

    /**
     * @lends jDoc.Engine.prototype
     */
    options: {
        isValid: false,
        fileType: "",
        page: {
            width: 641,
            height: 971,
            fontSize: 14,
            paddingTop: 76,
            paddingRight: 57,
            paddingBottom: 76,
            paddingLeft: 113,
            marginTop: 20
        },
        paragraph: {
            paddingTop: 5,
            paddingRight: 0,
            paddingBottom: 5,
            paddingLeft: 0,
            textIndent: 30
        }
    },

    /**
     * @description Initialize data
     * @return {Object}
     */
    initialize: function (file) {
        var fileType = this._getFileType(file);
        if (fileType) {
            this.file = file;
            this.options.isValid = true;
            this.options.fileType = fileType;
        } else {
            this.options.isValid = false;
        }
        return this;
    },

    /**
     * @description Read the file
     * @param options
     * @returns {*}
     */
    parse: function (options) {
        var self = this;
        if (typeof options.start === 'function') {
            options.start();
        }
        if (!this.validate()) {
            if (typeof options.error === 'function') {
                options.error(this._errors.invalidFileType);
            }
            if (typeof options.complete === 'function') {
                options.complete();
            }
            return false;
        }
        this._readFilesFromZIP({
            success: function (fileEntries) {
                self._createParsedFile(fileEntries, function (parsedFile) {
                    if (typeof options.success === 'function') {
                        options.success(parsedFile);
                    }
                    if (typeof options.complete === 'function') {
                        options.complete();
                    }
                });
            },
            error: function () {
                if (typeof options.error === 'function') {
                    options.error(this._errors.invalidReadZIPFile);
                }
                if (typeof options.complete === 'function') {
                    options.complete();
                }
            }.bind(this)
        });

        return null;
    },

    /**
     * @description Validate the file
     */
    validate: function () {
        return !!this.options.isValid;
    },

    /**
     *
     * @private
     */
    _prepareParsedFile: function () {},

    /**
     *
     * @private
     */
    _parseStyleAttribute: function () {},

    /**
     *
     * @returns {boolean}
     */
    isTextDocument: function () {
        return !!(this.options.fileType && this.options.fileType.isTextDocument);
    },

    /**
     *
     * @returns {boolean}
     */
    isTemplate: function () {
        return !!(this.options.fileType && this.options.fileType.isTemplate);
    },

    /**
     *
     * @returns {boolean}
     */
    isGraphicDocument: function () {
        return !!(this.options.fileType && this.options.fileType.isGraphicDocument);
    },

    /**
     *
     * @returns {boolean}
     */
    isPresentationDocument: function () {
        return !!(this.options.fileType && this.options.fileType.isPresentationDocument);
    },

    /**
     *
     * @returns {boolean}
     */
    isSpreadsheetDocument: function () {
        return !!(this.options.fileType && this.options.fileType.isSpreadsheetDocument);
    },

    /**
     *
     * @returns {boolean}
     */
    isChartDocument: function () {
        return !!(this.options.fileType && this.options.fileType.isChartDocument);
    },

    /**
     *
     * @returns {boolean}
     */
    isImageDocument: function () {
        return !!(this.options.fileType && this.options.fileType.isImageDocument);
    },

    /**
     *
     * @returns {boolean}
     */
    isFormulaDocument: function () {
        return !!(this.options.fileType && this.options.fileType.isFormulaDocument);
    },
    isTextDocumentMaster: function () {
        return (this.options.fileType && !!this.options.fileType.isTextDocumentMaster);
    },
    isTextDocumentMasterWeb: function () {
        return (this.options.fileType && !!this.options.fileType.isTextDocumentMasterWeb);
    },

    /**
     *
     * @param path
     * @return {String}
     * @private
     */
    _getFileNameFromPath: function (path) {
        return (path || "").replace(/^.+\//, '') || path;
    },

    /**
     *
     * @param value - for example, "18px", "10em", "2pt", etc.
     * @return {Number} - for example, 18, 10, 12
     * @private
     */
    _cropUnits: function (value) {
        value = +(String(value).replace(/,/g, '.').replace(/[^0-9.]+/g, ''));
        return !isNaN(value) ? value : 0;
    },

    /**
     *
     * @param str
     * @return {Object}
     * @private
     */
    _getFileTypeByExtension: function (str) {
        return {
            isImage: (/.jpeg|.jpg/i).test(str)
        };
    },

    /**
     * Return the error of file validation
     * @param file
     * @return {null|Object}
     */
    _getFileValidationError: function (file) {
        return this._getFileType(file) ? null : this._errors.invalidFileType;
    },

    /**
     *
     * @param text
     * @return {Number}
     * @private
     */
    _getWordsCountInText: function (text) {
        var words = (text || "").split(/\s+/),
            len = words.length,
            i,
            wordsCount = 0;

        for (i = len - 1; i >= 0; i--) {
            wordsCount += (words[i].length > 1);
        }

        return wordsCount;
    },

    /**
     *
     * @param dataURI
     * @param filename
     * @return {String}
     * @private
     */
    _normalizeDataURI: function (dataURI, filename) {
        return dataURI.replace(/data:[^;]*;/, 'data:' + this._getFileMimeType(filename) + ';');
    },

    /**
     *
     * @param filename
     * @returns {string}
     * @private
     */
    _getFileMimeType: function (filename) {
        var extension = (/[a-z]+$/i).exec(filename),
            result = "";

        if (extension) {
            extension = extension[0].toLowerCase();

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
    },

    /**
     *
     * @param str
     * @return {String} - dd.mm.yyy
     * @private
     */
    _normalizeDate: function (str) {
        var date = "",
            data;

        if (str) {
            /**
             * yyyy-mm-dd
             */
            if ((/^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])$/).test(str)) {
                data = str.split("-");
                date = data[2] + "." + data[1] + "." + data[0];
            }
        }

        return date;
    },

    /**
     *
     * @param value
     * @return {String}
     * @private
     */
    _normalizeVerticalAlign: function (value) {
        var result = "baseline";

        value = String(value).toLowerCase();

        if (value == "superscript") {
            result = "top";
        } else if (value == "subscript") {
            result = "bottom";
        }

        return result;
    },

    /**
     *
     * @param value
     * @return {String}
     * @private
     */
    _normalizeEncodingValue: function (value) {
        var result = "utf-8";

        if (value) {
            value = value.toLowerCase();

            if (value == "windows-1251") {
                result = "cp1251";
            }
        }

        return result;
    },

    /**
     * Parse boxShadow style from property node
     * @param node
     * @return {String}
     * @private
     */
    _parseShadowProperty: function (node) {
        var result = "none";

        if (
            node &&
                node.attributes['w:val'] &&
                node.attributes['w:color'] &&
                this._shadowPatterns[node.attributes['w:val'].value]
        ) {
            result = this._shadowPatterns[node.attributes['w:val'].value] + " " + node.attributes['w:color'];
        }

        return result;
    },

    /**
     * get type of file
     * @param file
     * @return {null|String}
     * @private
     */
    _getFileType: function (file) {
        var result = null,
            fileExtensions,
            mimeTypes,
            extension = String(file.name).split('.'),
            fileTypesCount = this._fileTypeParsers.length,
            e,
            found = false,
            i;

        extension = extension[extension.length - 1];

        for (i = 0; i < fileTypesCount; i++) {
            if (file.type) {
                mimeTypes = this._fileTypeParsers[i].mime;
                if (!(mimeTypes instanceof Array)) {
                    mimeTypes = [mimeTypes];
                }

                for (e = mimeTypes.length - 1; e >= 0; e--) {
                    if (file.type.indexOf(mimeTypes[e]) >= 0) {
                        found = true;
                        break;
                    }
                }
            }

            if (!found && !file.type && extension) {
                fileExtensions = this._fileTypeParsers[i].extension;
                if (!(fileExtensions instanceof Array)) {
                    fileExtensions = [fileExtensions];
                }

                for (e = fileExtensions.length - 1; e >= 0; e--) {
                    if (extension.indexOf(fileExtensions[e]) >= 0) {
                        found = true;
                        break;
                    }
                }
            }

            if (found) {
                result = this._fileTypeParsers[i];
                break;
            }
        }
        return result;
    },

    /**
     *
     * @param node
     * @return {Object}
     * @private
     */
    _parseLanguageNode: function (node) {
        var result = {
            latin: null,
            eastAsia: null,
            complexLanguage: null
        };
        if (node) {
            result.latin = (node.attributes['w:val']) ? node.attributes['w:val'] || result.latin : result.latin;
            result.complexLanguage =
                (node.attributes['w:bidi']) ? (
                    node.attributes['w:bidi'] || result.complexLanguage
                ) : result.complexLanguage;
            result.eastAsia = (node.attributes['w:eastAsia']) ? (
                node.attributes['w:eastAsia'] || result.eastAsia
            ) : result.eastAsia;
        }
        return result;
    },

    /**
     *
     * @param cssList
     * @param rule
     * @param value
     * @return {*}
     * @private
     */
    _addCssRule: function (cssList, rule, value) {
        if (rule === "boxShadow") {
            cssList.webkitBoxShadow = value;
            cssList.mozBoxShadow = value;
            cssList.oBoxShadow = value;
            cssList.msBoxShadow = value;
            cssList.boxShadow = value;
        }

        return cssList;
    },

    /**
     * @param node
     * @return {String}
     * @private
     */
    _parseStyleEffectProperty: function (node) {
        return (node && node.attributes['w:val']) ? this._effectPatterns[node.attributes['w:val']] || "none" : "none";
    },

    /**
     * namespace:attributeName => attributeName
     * @param attributeName
     * @return {String}
     * @private
     */
    _replaceAttributeNamespace: function (attributeName) {
        return attributeName ? attributeName.replace(/^[0-9a-zA-Z-_]+:/, '') : "";
    },

    /**
     *
     * @param options
     * @returns {number}
     * @private
     */
    _spotElementHeight: function (options) {
        options = options || {};

        options.lineHeight = options.lineHeight || 1;
        options.parentFontSize = options.parentFontSize || 1;

        var len = options.el.textContent ? options.el.textContent.length : 0,
            height = (
                (len * options.fontSize) / options.width
            ) * (
                (
                    options.fontSize > options.parentFontSize ? options.fontSize : options.parentFontSize
                ) * options.lineHeight
            );

        return isNaN(height) ? 0 : Math.round(height);
    }
};