// @namespace jDoc
var jDoc = Object.defineProperties({}, {
    /**
     *
     */
    a4DimensionCssRules: {
        configurable: false,
        enumerable: false,
        value: {
            width: {
                value: 792,
                unit: "pt"
            },
            height: {
                value: 612,
                unit: "pt"
            }
        }
    },

    /**
     * @description This browser support required technologies for jDoc or no.
     * @returns {boolean}
     */
    supported: {
        configurable: false,
        enumerable: false,
        get () {
            return !!(
                typeof File !== 'undefined' &&
                typeof Blob !== 'undefined' &&
                typeof FileReader !== 'undefined' &&
                typeof ArrayBuffer !== 'undefined' &&
                typeof Uint8Array !== 'undefined' &&
                typeof DataView !== 'undefined' &&
                Blob.prototype.slice
            );
        }
    },

    /**
     *
     * @param name
     * @param formats
     * @param engine
     * @returns {jDoc.Engine|null}
     */
    defineEngine: {
        configurable: false,
        value (name, formats, engine) {
            if (
                name &&
                formats &&
                engine &&
                engine.superproto === jDoc.Engine.prototype
            ) {
                if (!Array.isArray(formats)) {
                    formats = [String(formats).toLowerCase()];
                }

                documentFormats.push.apply(documentFormats, formats);
                documentEngines[name] = engine;
                return engine;
            }

            return null;
        }
    },

    /**
     *
     * @returns {Array}
     */
    supportedFormats: {
        configurable: false,
        enumerable: false,
        get () {
            return documentFormats.slice(0);
        }
    }

    // @define properties
});