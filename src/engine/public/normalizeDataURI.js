/**
 *
 * @param dataURI
 * @param filename
 * @return {String}
 * @private
 */
jDoc.Engine.prototype.normalizeDataURI = function (dataURI, filename) {
    return dataURI.replace(/data:[^;]*;/, 'data:' + getMimeTypeByName(filename) + ';');
};