import html from './html';

export default {
    html,

    getPage: {
        get (index) {
            return this._data.pages[index];
        }
    },

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
};