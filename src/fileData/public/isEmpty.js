jDoc.FileData.prototype.isEmpty = function () {
    return !!(!this._data || !this._data.pages || !this._data.pages.length);
};