/**
 * @namespace jDoc.FileData
 * @param attrs
 */
jDoc.FileData = function (attrs) {
    attrs = attrs || {};

    this._data = {
        name: "",
        language: "",
        isTextDocument: false,
        wordsCount: 0,
        zoom: 100,
        pages: []
    };

    if (Array.isArray(attrs.pages)) {
        this._data.pages = attrs.pages.slice(0);
    }

    this._clonedData = clone(this._data);
    this._htmlOptions = {};
};

jDoc.FileData.prototype = {
    // @define prototypeProperties
};