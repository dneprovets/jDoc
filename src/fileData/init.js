/**
 * @namespace jDoc.FileData
 * @param attrs
 */
jDoc.FileData = function (attrs = {}) {
    this._data = copy({
        name: "",
        language: "",
        wordsCount: 0,
        zoom: 100,
        pages: []
    }, attrs);

    this._clonedData = clone(this._data);
    this._htmlOptions = {};
};

Object.defineProperties(jDoc.FileData.prototype, {
    data: {
        get () {
            return this._clonedData;
        }
    },
    language: {
        get () {
            return this._data.language;
        }
    },
    name: {
        get () {
            return this._data.name;
        }
    },
    wordsCount: {
        get () {
            return this._data.wordsCount;
        }
    },
    length: {
        get() {
            return this._data.pages.length;
        }
    },
    zoom: {
        get () {
            return this._data.zoom;
        }
    },
    empty: {
        get () {
            return !(this._data.pages && this._data.pages.length);
        }
    },
    isTextDocument: {
        get () {
            return !!this._data.isTextDocument;
        }
    }

    // @define prototypeProperties
});