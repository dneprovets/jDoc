/**
 *
 * @param index
 * @returns {*}
 */
jDoc.FileData.prototype.getPage = {
    get (index) {
        return this._data.pages[index];
    }
};