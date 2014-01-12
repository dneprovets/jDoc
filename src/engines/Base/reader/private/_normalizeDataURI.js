/**
 *
 * @param dataURI
 * @param filename
 * @return {String}
 * @private
 */
jDoc.Engine.prototype._normalizeDataURI = function (dataURI, filename) {
    return dataURI.replace(/data:[^;]*;/, 'data:' + this._getFileMimeType(filename) + ';');
};