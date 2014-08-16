// @namespace jDoc
var jDoc = function () {
    this._currentEngine = null;
};
jDoc.prototype = {
    // @define prototypeProperties
};
copy(jDoc.prototype, Events);
copy(jDoc, {
    _formats: [],

    _engines: {},

    /**
     * @description
     */
    clone: clone,

    /**
     * @description
     */
    copy: copy,

    /**
     * @description
     */
    getA4DimensionCSSRules: getA4DimensionCSSRules,

    /**
     * @description This browser support required technologies for jDoc or no.
     * @returns {boolean}
     */
    isSupported: function () {
        return !!(
            localStorage &&
            window.File &&
            window.Blob &&
            window.Blob.prototype.slice &&
            window.FileReader &&
            window.ArrayBuffer &&
            window.Uint8Array &&
            window.DataView
        );
    },

    /**
     * @description
     * @param name
     * @param formats
     * @param engine
     * @returns {*}
     */
    defineEngine: function (name, formats, engine) {
        if (
            name &&
            formats &&
            engine &&
            typeof engine.prototype.validate === "function"
        ) {
            if (!Array.isArray(formats)) {
                formats = [String(formats).toLowerCase()];
            }

            this._formats = this._formats.concat(formats);
            this._engines[name] = engine;
        }

        return this;
    },

    /**
     * @description
     * @returns {*}
     */
    getSupportedFormats: function () {
        return this._formats.slice(0);
    }

    //@define properties
}, Events);