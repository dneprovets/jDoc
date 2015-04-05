import props from 'src/props';

/**
 * @param attrs
 */
function FileData (attrs = {}) {
    this._data = copy({
        name: "",
        language: "",
        wordsCount: 0,
        zoom: 100,
        pages: []
    }, attrs);

    this._clonedData = clone(this._data);
    this._htmlOptions = {};
}

Object.defineProperties(jDoc.FileData.prototype, props);

export default FileData;