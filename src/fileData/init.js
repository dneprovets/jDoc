/**
 * @namespace jDoc.FileData
 * @param attrs
 */
jDoc.FileData = function (attrs) {
    attrs = attrs || {};

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

jDoc.FileData.prototype = {
    // @define prototypeProperties
};