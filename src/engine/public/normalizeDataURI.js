/**
 *
 * @param dataURI
 * @param filename
 * @return {String}
 * @private
 */
jDoc.Engine.prototype.normalizeDataURI = {
    value (dataURI, filename) {
        return dataURI.replace(/data:[^;]*;/, 'data:' + getMimeTypeByName(filename) + ';');
    }
};